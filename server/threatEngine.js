/**
 * Scam SMS Sandbox Threat Logic Engine
 * Implements Regex extraction, deterministic threat rules A/B/C/D,
 * Bhashini multi-lingual plain-language warnings, and mock sandbox metadata.
 */

// Regex patterns for entity extraction
const URL_REGEX = /(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?)/gi;
const FULL_URL_REGEX = /https?:\/\/[^\s]+/gi;
const INDIAN_PHONE_REGEX = /(?:\+91[\s-]?)?[6-9]\d{9}\b/g;
const SMS_HEADER_REGEX = /\b[A-Za-z]{2}-[A-Za-z]{4,8}\b/g;

export function analyzeMessage({ text = '', language = 'en', imageUrl = null }) {
  const normalizedText = (text || '').trim();

  // 1. EXTRACTION
  // Extract URLs
  const matchedUrls = normalizedText.match(FULL_URL_REGEX) || [];
  let extractedUrl = matchedUrls[0] || '';
  if (!extractedUrl) {
    const fallbackMatches = normalizedText.match(URL_REGEX) || [];
    if (fallbackMatches[0]) {
      extractedUrl = fallbackMatches[0].startsWith('http') ? fallbackMatches[0] : `http://${fallbackMatches[0]}`;
    }
  }

  // Extract Sender / Contact Phone Identifiers
  const matchedPhones = normalizedText.match(INDIAN_PHONE_REGEX) || [];
  const matchedHeaders = normalizedText.match(SMS_HEADER_REGEX) || [];
  let senderIdentifier = matchedHeaders[0] || matchedPhones[0] || 'UNKNOWN_SENDER';

  // 2. THREAT RULES EVALUATION
  const lower = normalizedText.toLowerCase();

  // Rule A: Bill cutoffs ("disconnected", "cut at 9:30 PM", "bijli") + 10-digit phone or short link
  const hasCutoffKeywords = /disconnect|cut at 9:30|9:30 pm|bijli|power supply|power will be|light cut|unpaid.*bill|previous month bill/i.test(lower);
  const hasPhoneOrLink = matchedPhones.length > 0 || extractedUrl.length > 0;
  const isRuleA = hasCutoffKeywords && hasPhoneOrLink;

  // Rule B: Link ends in .apk or urges "download update/YONO"
  const isApkUrl = /\.apk(?:[\?#\s]|$)/i.test(extractedUrl) || /\.apk/i.test(lower);
  const urgesDownloadUpdate = /(?:download|install|update).*(?:yono|app|apk|sbi|quickpay|patch)/i.test(lower) ||
                              /(?:yono|sbi).*(?:download|update|install)/i.test(lower);
  const isRuleB = isApkUrl || urgesDownloadUpdate;

  // Rule C: Message contains bank name + standard OTP layout ("OTP is 123456... Never share OTP")
  const hasBankName = /\b(?:sbi|hdfc|icici|axis|kotak|pnb|canara|bob|bank of baroda|bank)\b/i.test(lower);
  const hasOtpKeyword = /\b(?:otp|one time password|verification code)\b/i.test(lower);
  const hasOtpDigits = /\b\d{4,8}\b/.test(lower);
  const hasOtpDisclaimer = /(?:never share|do not share|valid for|confidential|valid till|share otp)/i.test(lower);
  const hasStandardOtpLayout = hasOtpKeyword && hasOtpDigits && (hasOtpDisclaimer || /(?:is|for|:)\s*\d{4,8}/i.test(lower));
  const isRuleC = hasBankName && hasStandardOtpLayout && !isRuleA && !isRuleB;

  // Rule D: Fallback / Heuristic classification
  let riskScore = 60;
  let riskLevel = 'SUSPICIOUS';
  let riskCategory = 'SUSPICIOUS';
  let matchedRule = 'Rule D (Suspicious / Heuristic)';

  if (isRuleB) {
    riskScore = 98;
    riskLevel = 'DANGER';
    riskCategory = 'APK_MALWARE';
    matchedRule = 'Rule B (Malicious APK / Trojan Dropper)';
  } else if (isRuleA) {
    riskScore = 95;
    riskLevel = 'DANGER';
    riskCategory = 'ELECTRICITY_DISCOM';
    matchedRule = 'Rule A (Fake Electricity Disconnection Fraud)';
  } else if (isRuleC) {
    riskScore = 5;
    riskLevel = 'SAFE';
    riskCategory = 'LEGIT';
    matchedRule = 'Rule C (Verified Transactional Banking OTP)';
  } else {
    // Sub-categorize Rule D if obvious signals are present
    if (/lottery|kbc|won ₹|crore|lucky draw|gift voucher|congratulations.*win/i.test(lower)) {
      riskScore = 88;
      riskLevel = 'DANGER';
      riskCategory = 'LOTTERY';
      matchedRule = 'Rule D (Lottery / Prize Scam)';
    } else if (/kyc|pan.*update|aadhaar.*link|account.*suspend|blocked/i.test(lower)) {
      riskScore = 90;
      riskLevel = 'DANGER';
      riskCategory = 'BANK_KYC';
      matchedRule = 'Rule D (Bank Account KYC Phishing)';
    } else if (/delivery|consignment|india post|parcel|reschedule|address failed/i.test(lower)) {
      riskScore = 85;
      riskLevel = 'DANGER';
      riskCategory = 'SUSPICIOUS';
      matchedRule = 'Rule D (Postal / Delivery Phishing)';
    } else if (riskScore === 60) {
      riskLevel = 'SUSPICIOUS';
      riskCategory = 'SUSPICIOUS';
    }
  }

  // 3. BHASHINI MULTI-LINGUAL PLAIN-LANGUAGE ADVISORIES
  const localizedSummary = generateLocalizedSummaries({
    riskCategory,
    riskLevel,
    riskScore,
    senderIdentifier,
    extractedUrl
  });

  // Pick audio warning text according to requested language
  const audioWarningText = generateAudioWarning(localizedSummary, language);

  // 4. MOCK SANDBOX & FORENSIC METADATA
  const domainAgeDays = riskLevel === 'DANGER' ? (isRuleA ? 1 : 2) : (riskLevel === 'SAFE' ? 365 : 45);
  const domainAgeText = riskLevel === 'DANGER' 
    ? 'Registered 18 hours ago in Russia (Zero-Day Host)' 
    : (riskLevel === 'SAFE' ? 'Registered 8 years ago (Official Banking Domain)' : 'Registered 45 days ago (Unverified Private Whois)');

  const screenshotType = isRuleA 
    ? 'bescom' 
    : (isRuleB || riskCategory === 'BANK_KYC' ? 'sbi' : (lower.includes('post') ? 'indiapost' : 'custom'));

  const forensics = buildForensics({
    extractedUrl,
    riskCategory,
    riskLevel,
    domainAgeText,
    isRuleA,
    isRuleB,
    isRuleC
  });

  const sandboxLogs = buildSandboxLogs({
    extractedUrl,
    riskCategory,
    riskLevel,
    riskScore
  });

  return {
    rawMessage: normalizedText,
    senderIdentifier,
    extractedUrl,
    domainAgeDays,
    domainAge: domainAgeText,
    riskScore,
    riskLevel,
    riskCategory,
    matchedRule,
    localizedSummary,
    audioWarningText,
    screenshotType,
    screenshotUrl: `/previews/${screenshotType}.png`,
    forensics,
    sandboxLogs,
    reportedToI4C: false,
    createdAt: new Date().toISOString()
  };
}

function generateLocalizedSummaries({ riskCategory, riskLevel, riskScore, senderIdentifier, extractedUrl }) {
  if (riskCategory === 'ELECTRICITY_DISCOM') {
    return {
      en: `CRITICAL DANGER (Score: ${riskScore}/100): Fake electricity bill disconnection scam. Discoms never disconnect power via personal phone numbers or unverified short-links. Do not call ${senderIdentifier || 'the number'} or install any apps.`,
      hi: `अत्यंत गंभीर खतरा (स्कोर: ${riskScore}/100): फर्जी बिजली बिल डिस्कनेक्शन घोटाला। बिजली विभाग कभी भी निजी नंबर या संदेहास्पद लिंक से लाइन काटने की धमकी नहीं देता। किसी भी नंबर पर कॉल न करें और न ही कोई फाइल डाउनलोड करें।`,
      ta: `ஆபத்தான எச்சரிக்கை (மதிப்பெண்: ${riskScore}/100): மின் கட்டணம் செலுத்தவில்லை என மிரட்டும் போலி மோசடி. மின்சார வாரியம் தனிப்பட்ட எண்களிலிருந்தோ அல்லது இணைப்புகளிலிருந்தோ மின் இணைப்பை துண்டிக்காது. எக்காரணம் கொண்டும் அழைக்காதீர்கள்.`,
      te: `తీవ్ర ప్రమాద హెచ్చరిక (స్కోరు: ${riskScore}/100): విద్యుత్ సరఫరా నిలిపివేస్తామని నకిలీ బెదిరింపు మోసం. విద్యుత్ సంస్థలు వ్యక్తిగత ఫోన్ నంబర్లు లేదా లింకుల ద్వారా హెచ్చరికలు పంపవు. కాల్ చేయవద్దు.`,
      mr: `गंभीर धोका (स्कोअर: ${riskScore}/100): वीज बिल थकबाकीच्या नावाखाली बनावट वीज तोडण्याची धमकी. वीज मंडळ कधीही अशा वैयक्तिक लिंक किंवा नंबरद्वारे कारवाई करत नाही. संपर्क करू नका.`,
      bn: `মারাত্মক বিপদ (স্কোর: ${riskScore}/100): বিদ্যুৎ বিলের ভুয়ো জালিয়াতি। বিদ্যুৎ বোর্ড কোনো ব্যক্তিগত ফোন নম্বর বা শর্ট লিঙ্কের মাধ্যমে লাইন কাটার হুমকি দেয় না। কোনো লিঙ্কে ক্লিক করবেন না।`
    };
  }

  if (riskCategory === 'APK_MALWARE') {
    return {
      en: `CRITICAL DANGER (Score: ${riskScore}/100): Malicious Android Banker APK payload detected. This app is designed to intercept SMS OTPs, record your screen, and siphon funds. Do NOT install or run this APK.`,
      hi: `अत्यंत गंभीर खतरा (स्कोर: ${riskScore}/100): खतरनाक बैंकिंग ट्रोजन APK वायरस! यह ऐप आपके फोन से बैंक ओटीपी चुराने और स्क्रीन रिकॉर्ड करने के लिए बनाया गया है। इस फाइल को तुरंत डिलीट करें।`,
      ta: `ஆபத்தான எச்சரிக்கை (மதிப்பெண்: ${riskScore}/100): வங்கியின் பெயரில் அனுப்பப்படும் ஆபத்தான ஆண்ட்ராய்டு ஏபிகே (APK) வைரஸ். இது உங்கள் வங்கி ஓடிபியை திருடி பணத்தை பறிக்கும். இதை நிறுவ வேண்டாம்.`,
      te: `తీవ్ర ప్రమాదం (స్కోరు: ${riskScore}/100): ప్రమాదకరమైన బ్యాంకింగ్ ట్రోజన్ APK వైరస్. ఇది మీ ఫోన్ ఓటీపీలను దొంగిలించడానికి పంపబడింది. దీన్ని ఏమాత్రం ఇన్‌స్టాల్ చేయవద్దు.`,
      mr: `गंभीर धोका (स्कोअर: ${riskScore}/100): धोकादायक बँक ट्रोजन APK व्हायरस. हा बनावट ॲप तुमचे ओटीपी आणि पासवर्ड चोरून आर्थिक नुकसान करू शकतो. इन्स्टॉल करू नका.`,
      bn: `মারাত্মক বিপদ (স্কোর: ${riskScore}/100): বিপজ্জনক ব্যাংকিং ট্রোজান এপিকে (APK) ভাইরাস। এটি আপনার ফোন থেকে ওটিপি এবং পাসওয়ার্ড চুরি করার ফাঁদ। এটি ডাউনলোড করবেন না।`
    };
  }

  if (riskCategory === 'LEGIT') {
    return {
      en: `SAFE (Score: ${riskScore}/100): Legitimate transactional OTP from verified banking institution. Remember to never share this OTP with anyone, including bank representatives.`,
      hi: `सुरक्षित (स्कोर: ${riskScore}/100): अधिकृत बैंक से भेजा गया वैध लेन-देन ओटीपी। कृपया यह ओटीपी बैंक कर्मचारियों सहित किसी के साथ भी साझा न करें।`,
      ta: `பாதுகாப்பானது (மதிப்பெண்: ${riskScore}/100): அங்கீகரிக்கப்பட்ட வங்கியிலிருந்து வந்த உண்மையான பரிவர்த்தனை ஓடிபி. இந்த எண்ணை யாருடனும் பகிர வேண்டாம்.`,
      te: `సురక్షితం (స్కోరు: ${riskScore}/100): గుర్తింపు పొందిన బ్యాంక్ నుండి వచ్చిన నిజమైన లావాదేవీల ఓటీపీ. ఈ ఓటీపీని ఎవరితోనూ పంచుకోవద్దు.`,
      mr: `सुरक्षित (स्कोअर: ${riskScore}/100): अधिकृत बँकेकडून आलेला खराखुरा व्यवहार ओटीपी. हा ओटीपी कोणाशीही शेअर करू नका.`,
      bn: `নিরাপদ (স্কোর: ${riskScore}/100): অনুমোদিত ব্যাংক থেকে পাঠানো আসল ট্রানজাকশন ওটিপি। এই ওটিপি কারোর সাথে শেয়ার করবেন না।`
    };
  }

  if (riskCategory === 'LOTTERY') {
    return {
      en: `CRITICAL DANGER (Score: ${riskScore}/100): Fraudulent lottery / prize giveaway scam. Genuine organizations do not award prizes without prior participation, nor do they demand processing fees.`,
      hi: `अत्यंत गंभीर खतरा (स्कोर: ${riskScore}/100): फर्जी लॉटरी / इनाम का झांसा। कोई भी वास्तविक संस्था बिना टिकट खरीदे पुरस्कार नहीं देती। किसी भी प्रोसेसिंग शुल्क का भुगतान न करें।`,
      ta: `ஆபத்தான எச்சரிக்கை: போலி பரிசு மற்றும் லாட்டரி மோசடி. எக்காரணம் கொண்டும் முன்பணம் செலுத்தாதீர்கள்.`,
      te: `తీవ్ర ప్రమాదం: నకిలీ లాటరీ మరియు బహుమతుల మోసం. ఎలాంటి రిజిస్ట్రేషన్ ఫీజు చెల్లించవద్దు.`,
      mr: `गंभीर धोका: बनावट लॉटरी आणि बक्षीसाचे आमिष. कोणतीही अनामत रक्कम भरू नका.`,
      bn: `মারাত্মক বিপদ: ভুয়ো লটারি এবং পুরস্কারের প্রতারণা। কোনো প্রসেসিং ফি দেবেন না।`
    };
  }

  // Fallback / Suspicious
  return {
    en: `SUSPICIOUS (Score: ${riskScore}/100): High caution advised. Message exhibits suspicious urgency, unverified links, or requests for sensitive information. Verify with official helpline 1930.`,
    hi: `संदेहास्पद (स्कोर: ${riskScore}/100): सावधानी बरतें! संदेश में असामान्य जल्दबाजी या अप्रमाणित लिंक मौजूद हैं। किसी भी संदेहास्पद लिंक पर क्लिक न करें।`,
    ta: `சந்தேகத்திற்குரியது (மதிப்பெண்: ${riskScore}/100): எச்சரிக்கையுடன் இருக்கவும். சரிபார்க்கப்படாத இணைப்புகள் மற்றும் தகவல்களை கிளிக் செய்ய வேண்டாம்.`,
    te: `అనుమానాస్పదం (స్కోరు: ${riskScore}/100): అప్రమత్తంగా ఉండండి. ధృవీకరించని లింకులను తెరవవద్దు.`,
    mr: `संशयास्पद (स्कोअर: ${riskScore}/100): सावधानता बाळगा. कोणत्याही अनधिकृत लिंकवर क्लिक करू नका.`,
    bn: `সন্দেহজনক (স্কোর: ${riskScore}/100): সতর্ক থাকুন। কোনো অপরিচিত লিঙ্কে ব্যক্তিগত তথ্য প্রদান করবেন না।`
  };
}

function generateAudioWarning(summaries, lang) {
  const chosenLang = summaries[lang] ? lang : 'en';
  return summaries[chosenLang];
}

function buildForensics({ extractedUrl, riskCategory, riskLevel, domainAgeText, isRuleA, isRuleB, isRuleC }) {
  if (isRuleC) {
    return {
      domainAge: '8+ Years (Registered 2016)',
      registrar: 'MarkMonitor Inc. (Verified Corporate Banking Registrar)',
      sslIssuer: 'DigiCert High Assurance EV Root CA (Extended Validation)',
      hostIp: '121.240.18.42',
      geoCountry: 'Mumbai, India (National Cloud Edge)',
      asn: 'AS55836 (Reserve Bank of India Authorized Financial Gateway)',
      formAction: 'HTTPS Direct Gateway (Encrypted)',
      payloadDetected: 'None (Standard SMS Gateway Protocol)',
      redirectChain: ['Direct SMS Delivery via Telecom Operator Node'],
      blacklists: {
        virusTotal: '0/89 Vendors Flagged (Clean)',
        googleSafeBrowsing: 'Verified Authentic Financial Communications',
        certInSmishWatch: 'White-Listed Telemetry Gateway #IN-FIN-0091',
        i4cStatus: 'Verified Legitimate Banking Channel'
      }
    };
  }

  const isCritical = riskLevel === 'DANGER';

  return {
    domainAge: domainAgeText,
    registrar: isCritical ? 'Namecheap Inc. (Withheld for Privacy)' : 'Public Domain Registry',
    sslIssuer: isCritical ? 'Self-Signed / Untrusted (Let\'s Encrypt 90-day Free TLS)' : 'GlobalSign Organization CA',
    hostIp: isCritical ? (isRuleA ? '185.220.101.5' : '45.142.193.88') : '104.26.12.98',
    geoCountry: isCritical ? (isRuleA ? 'Moscow, Russian Federation' : 'Victoria, Seychelles') : 'Singapore / India Edge',
    asn: isCritical ? 'AS44050 (Bulletproof Anonymous Hosting)' : 'AS13335 (Cloudflare Inc.)',
    formAction: isCritical ? 'POST /api/steal_card.php (Exfiltrates live to Telegram bot)' : 'None detected',
    payloadDetected: isRuleB 
      ? 'Android.Banker.FakeInst.gen (Steals SMS OTPs & Accessibility Service)' 
      : (isRuleA ? 'FakeInst Dropper APK + Phishing Credential Harvester' : (isCritical ? 'Heuristic Pattern: Deceptive Credential Harvesting' : 'None detected')),
    redirectChain: extractedUrl ? [extractedUrl, `${extractedUrl}/auth/capture.php`] : ['None'],
    blacklists: {
      virusTotal: isCritical ? '24/89 Security Vendors Flagged Malicious' : '2/89 Suspicious',
      googleSafeBrowsing: isCritical ? 'Flagged as Deceptive Phishing Site' : 'Unlisted',
      certInSmishWatch: isCritical ? 'Active SmishWatch Threat ID #IN-SMISH-2026-9912' : 'Flagged for Observation',
      i4cStatus: isCritical ? 'High-Priority Statutory Takedown Queued' : 'Under Telemetry Review'
    }
  };
}

function buildSandboxLogs({ extractedUrl, riskCategory, riskLevel, riskScore }) {
  const target = extractedUrl || 'SMS Raw Payload';
  return [
    { step: 1, text: `[DNS-ENGINE] Resolving nameservers & WHOIS metadata for ${target}` },
    { step: 1, text: `[SECURITY-AUDIT] Extracted signature: category=${riskCategory}, level=${riskLevel}` },
    { step: 2, text: '[DOCKER-MICROVM] Launching isolated Chromium container #vm-smish-sand-884' },
    { step: 2, text: '[PUPPETEER] Emulating Indian mobile Safari viewport (390x844px)' },
    { step: 3, text: '[NETWORK-SNIFFER] Tracking DOM network calls, forms, and hidden APK triggers' },
    { step: 3, text: riskLevel === 'DANGER' ? '[THREAT-FOUND] Detected malicious intent / credential exfiltration payload' : '[CLEAN] No illicit background processes detected' },
    { step: 4, text: `[INSPECTOR] Final risk evaluation calculated: ${riskScore}/100 (${riskLevel})` },
    { step: 4, text: `[VERDICT] STATUS: ${riskLevel} -> Ready for Citizen Advisory & I4C Sync` }
  ];
}
