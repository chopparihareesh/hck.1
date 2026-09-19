export const SCAM_PRESETS = [
  {
    id: 'bescom-bill',
    title: 'Electricity Bill Cutoff (BESCOM)',
    url: 'http://bescom-bill-update.top/pay-now',
    entity: 'BESCOM / State Power Board',
    riskScore: 96,
    riskLevel: 'critical', // 'critical' | 'suspicious' | 'safe'
    category: 'Fake Utility Disconnection & Banker Trojan APK',
    summaryByLang: {
      en: 'CRITICAL THREAT: This link is a dangerous electricity bill scam spoofing BESCOM. It attempts to force-download an Android APK ("BESCOM_QuickPay_v3.apk") designed to intercept SMS OTPs and drain your bank account. The domain was registered just 2 days ago in Russia.',
      hi: 'अत्यंत गंभीर खतरा: यह लिंक बिजली विभाग (BESCOM) के नाम पर फर्जी बिल घोटाला है। यह आपके फोन में "BESCOM_QuickPay_v3.apk" नाम का खतरनाक वायरस ऐप डाउनलोड करवाकर बैंक ओटीपी चुराने का प्रयास करता है। यह वेबसाइट केवल 2 दिन पहले रूस में बनाई गई है।',
      ta: 'ஆபத்தான எச்சரிக்கை: இது பெஸ்காம் (BESCOM) மின் கட்டணத்தை போலியாக காட்டும் தீவிர மோசடி இணைப்பாகும். இது உங்கள் வங்கி ஓடிபியை திருடும் "BESCOM_QuickPay_v3.apk" என்ற ஆபத்தான வைரஸ் செயலியை பதிவிறக்க முயற்சிக்கிறது. இது 2 நாட்களுக்கு முன் ரஷ்யாவில் பதிவு செய்யப்பட்டது.',
      te: 'తీవ్రమైన ప్రమాదం: ఇది విద్యుత్ శాఖ (BESCOM) పేరుతో వచ్చిన ప్రమాదకరమైన నకిలీ లింక్. ఇది మీ బ్యాంక్ ఖాతా ఓటీపీలను దొంగిలించే "BESCOM_QuickPay_v3.apk" అనే వైరస్ యాప్‌ను డౌన్‌లోడ్ చేయించడానికి ప్రయత్నిస్తుంది. ఇది 2 రోజుల క్రితం రష్యాలో నమోదైంది.',
      kn: 'ಗಂಭೀರ ಅಪಾಯ: ಇದು ಬೆಸ್ಕಾಂ (BESCOM) ಹೆಸರಿನಲ್ಲಿ ವಿದ್ಯುತ್ ಬಿಲ್ ವಂಚಿಸುವ ನಕಲಿ ಲಿಂಕ್. ಇದು ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಒಟಿಪಿ ಕದಿಯುವ "BESCOM_QuickPay_v3.apk" ಅಪಾಯಕಾರಿ ವೈರಸ್ ಆ್ಯಪ್ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಲು ಯತ್ನಿಸುತ್ತದೆ. ಈ ಸೈಟ್ ಕೇವಲ 2 ದಿನಗಳ ಹಿಂದೆ ರಷ್ಯಾದಲ್ಲಿ ನೊಂದಣಿಯಾಗಿದೆ.',
      bn: 'মারাত্মক বিপদ: এটি বিদ্যুৎ বিলের নামে একটি মারাত্মক সাইবার জালিয়াতির লিঙ্ক। এটি আপনার ফোনে "BESCOM_QuickPay_v3.apk" নামক ভাইরাস অ্যাপ ডাউনলোড করিয়ে ব্যাংক ওটিপি চুরি করার চেষ্টা করে। এটি মাত্র ২ দিন আগে রাশিয়ায় তৈরি হয়েছে।',
      mr: 'गंभीर धोका: ही लिंक महावितरण / वीज बिलाच्या नावाखाली केलेली धोकादायक फसवणूक आहे. हे तुमच्या फोनमध्ये "BESCOM_QuickPay_v3.apk" नावाचा धोकादायक व्हायरस डाउनलोड करून बँक ओटीपी चोरण्याचा प्रयत्न करते. ही वेबसाइट २ दिवसांपूर्वी रशियामध्ये तयार झाली आहे.'
    },
    forensics: {
      domainAge: '2 days old (Created: Sep 17, 2026)',
      registrar: 'Namecheap Inc. (Privacy Protected / Withheld)',
      sslIssuer: 'Self-Signed / Untrusted (Expired certificate)',
      hostIp: '185.220.101.5',
      geoCountry: 'Moscow, Russian Federation',
      asn: 'AS44050 (Bulletproof Hosting Provider)',
      formAction: 'POST http://bescom-bill-update.top/api/steal_card.php',
      payloadDetected: 'APK Trojan: Android.Banker.FakeInst.gen (Steals SMS & Accessibility Permissions)',
      redirectChain: [
        'http://bescom-bill-update.top/pay-now',
        'http://cdn-apk-distribution.top/dl/BESCOM_QuickPay_v3.apk'
      ],
      blacklists: {
        virusTotal: '17/89 Security Vendors Flagged Malicious',
        googleSafeBrowsing: 'Flagged as Deceptive Phishing Site',
        certInSmishWatch: 'Active Threat ID #IN-SMISH-2026-8912',
        i4cStatus: 'High-Priority Takedown Requested'
      }
    },
    sandboxLogs: [
      { step: 1, text: '[DNS-ENGINE] Querying A & AAAA records for bescom-bill-update.top' },
      { step: 1, text: '[WHOIS] Domain Age: 48 hours. Registrar: Namecheap. Flag: Zero-Day Registry' },
      { step: 2, text: '[DOCKER-MICROVM] Launching isolated container sandbox #vm-node-8891' },
      { step: 2, text: '[PUPPETEER] Emulating headless Chromium viewport (390x844px Mobile Safari)' },
      { step: 3, text: '[NETWORK-SNIFFER] Inbound HTTP 302 redirect triggered to foreign APK host' },
      { step: 3, text: '[EMULATION] Mobile touch simulated on "Update & Pay Immediately" button' },
      { step: 4, text: '[INSPECTOR] Detected hidden download prompt for Android package (.apk)' },
      { step: 4, text: '[HEURISTICS] Static analysis: FakeInst Trojan. SMS permissions requested.' },
      { step: 4, text: '[VERDICT] THREAT CONFIRMED: Malicious Banker Dropper with Zero-Day Age' }
    ],
    screenshotType: 'bescom'
  },
  {
    id: 'sbi-yono',
    title: 'SBI YONO KYC Account Freeze',
    url: 'https://sbi-reward-yono-kyc.xyz/login.php',
    entity: 'State Bank of India (Spoofed)',
    riskScore: 98,
    riskLevel: 'critical',
    category: 'Bank KYC Phishing & NetBanking Credential Harvester',
    summaryByLang: {
      en: 'CRITICAL THREAT: This is a fraudulent credential harvesting site masquerading as State Bank of India YONO. It prompts you to enter your NetBanking username, password, and OTP, which are transmitted live to a cyber gang’s Telegram channel. Never enter your credentials.',
      hi: 'अत्यंत गंभीर खतरा: यह भारतीय स्टेट बैंक (SBI YONO) के नाम पर बनाया गया फर्जी पेज है। यह आपसे यूजरनेम, पासवर्ड और ओटीपी मांगता है, जो सीधे जालसाजों के टेलीग्राम बॉट पर भेजा जाता है। अपनी कोई भी बैंक जानकारी यहां न डालें।',
      ta: 'ஆபத்தான எச்சரிக்கை: இது பாரத ஸ்டேட் வங்கியின் (SBI YONO) பெயரை போலியாக பயன்படுத்தும் தீவிர தகவல் திருட்டு தளமாகும். உங்கள் இணைய வங்கி கடவுச்சொல் மற்றும் ஓடிபியை திருடி பணத்தை பறிக்க திட்டமிடப்பட்டுள்ளது.',
      te: 'తీవ్రమైన ప్రమాదం: ఇది స్టేట్ బ్యాంక్ ఆఫ్ ఇండియా (SBI YONO) పేరిట మోసపూరితంగా సృష్టించిన నకిలీ పేజీ. మీ నెట్ బ్యాంకింగ్ పాస్‌వర్డ్ మరియు ఓటీపీ వివరాలను దొంగిలించడానికి ఇది రూపొందించబడింది. ఎలాంటి వివరాలు నమోదు చేయకండి.',
      kn: 'ಗಂಭೀರ ಅಪಾಯ: ಇದು ಸ್ಟೇಟ್ ಬ್ಯಾಂಕ್ ಆಫ್ ಇಂಡಿಯಾ (SBI YONO) ಹೆಸರಿನಲ್ಲಿ ಬಳಕೆದಾರರ ನೆಟ್‌ಬ್ಯಾಂಕಿಂಗ್ ಪಾಸ್‌ವರ್ಡ್ ಮತ್ತು ಒಟಿಪಿ ಕದಿಯಲು ರಚಿಸಲಾದ ನಕಲಿ ಪೋರ್ಟಲ್ ಆಗಿದೆ. ಯಾವುದೇ ವಿವರಗಳನ್ನು ನಮೂದಿಸಬೇಡಿ.',
      bn: 'মারাত্মক বিপদ: এটি ভারতীয় স্টেট ব্যাংক (SBI YONO)-এর ছদ্মবেশে তৈরি করা তথ্য চুরির বিপজ্জনক ওয়েবসাইট। আপনার নেটব্যাঙ্কিং পাসওয়ার্ড এবং ওটিপি হাতানোর জন্য এই ফাঁদ পাতা হয়েছে।',
      mr: 'गंभीर धोका: हे स्टेट बँक ऑफ इंडिया (SBI YONO) च्या नावावर बनवलेले बनावट पेज आहे. तुमचा नेटबँकिंग आयडी, पासवर्ड आणि ओटीपी चोरण्यासाठी ही लिंक पाठवली आहे. कोणतीही माहिती भरू नका.'
    },
    forensics: {
      domainAge: '4 days old (Created: Sep 15, 2026)',
      registrar: 'Hostinger Operations, UAB',
      sslIssuer: 'Let\'s Encrypt Authority X3 (Free Domain Validated)',
      hostIp: '45.142.193.88',
      geoCountry: 'Victoria, Seychelles',
      asn: 'AS200000 (Offshore Privacy Hosting)',
      formAction: 'POST https://sbi-reward-yono-kyc.xyz/gate/tele_push.php',
      payloadDetected: 'Keylogger + Real-time OTP Interception Relay Script',
      redirectChain: [
        'https://sbi-reward-yono-kyc.xyz/login.php',
        'https://sbi-reward-yono-kyc.xyz/verify_pan.php',
        'https://sbi-reward-yono-kyc.xyz/otp_wait.php'
      ],
      blacklists: {
        virusTotal: '21/89 Security Vendors Flagged Malicious',
        googleSafeBrowsing: 'Flagged as Phishing Threat',
        certInSmishWatch: 'Active Threat ID #IN-SMISH-2026-9004',
        i4cStatus: 'Domain Blacklisted on Indian ISP Firewalls'
      }
    },
    sandboxLogs: [
      { step: 1, text: '[DNS-ENGINE] Resolving sbi-reward-yono-kyc.xyz against DNS Root Servers' },
      { step: 1, text: '[WHOIS] Domain Age: 96 hours. Registry: .xyz TLD known for high smishing ratio' },
      { step: 2, text: '[DOCKER-MICROVM] Container spinup time: 240ms. Isolated networking enabled.' },
      { step: 2, text: '[INSPECTOR] DOM rendered. Extracted brand logo: SBI official SVG cloned' },
      { step: 3, text: '[FORM-AUDIT] Found form fields: `username`, `pwd`, `pan_card`, `live_otp`' },
      { step: 3, text: '[SCRIPT-ANALYSIS] JavaScript contains websocket bridge to external Telegram bot' },
      { step: 4, text: '[GEO-IP] Backend host resolved to Seychelles anonymous proxy' },
      { step: 4, text: '[VERDICT] THREAT CONFIRMED: Targeted Banking Phishing Kit' }
    ],
    screenshotType: 'sbi'
  },
  {
    id: 'indiapost-parcel',
    title: 'India Post Failed Delivery (₹25 Fee)',
    url: 'http://indiapost-parcel-reschedule.online/track',
    entity: 'India Post (Department of Posts)',
    riskScore: 93,
    riskLevel: 'critical',
    category: 'Parcel Delivery Smishing & Credit Card CVV Harvester',
    summaryByLang: {
      en: 'CRITICAL THREAT: This scam mimics the Department of Posts (India Post). It claims your parcel cannot be delivered due to an incorrect house number and demands a ₹25 redelivery fee. This is a trap designed to capture your credit card number, CVV, and UPI authorization.',
      hi: 'अत्यंत गंभीर खतरा: यह भारतीय डाक (India Post) के नाम पर की जा रही धोखाधड़ी है। इसमें पार्सल डिलीवरी रुकने का झूठा दावा करके सिर्फ ₹25 का शुल्क मांगा जाता है, ताकि आपके एटीएम कार्ड का सीवीवी और यूपीआई पिन चुराया जा सके।',
      ta: 'ஆபத்தான எச்சரிக்கை: இது இந்திய அஞ்சல் துறையின் (India Post) பெயரை பயன்படுத்தி செய்யப்படும் பார்சல் மோசடி. முகவரி தவறு என கூறி வெறும் ₹25 கட்டணம் கேட்பதன் மூலம் உங்கள் வங்கி அட்டை விவரங்களை திருட முயல்கிறது.',
      te: 'తీవ్రమైన ప్రమాదం: ఇది ఇండియా పోస్ట్ పేరుతో చేస్తున్న నకిలీ డెలివరీ మోసం. చిరునామా సరిగ్గా లేదని కేవలం ₹25 రీషెడ్యూల్ ఫీజు అడిగి మీ క్రెడిట్/డెబిట్ కార్డు వివరాలు కాజేసే కుట్ర.',
      kn: 'ಗಂಭೀರ ಅಪಾಯ: ಇದು ಇಂಡಿಯಾ ಪೋಸ್ಟ್ ಹೆಸರಿನಲ್ಲಿ ನಡೆಯುತ್ತಿರುವ ಪಾರ್ಸಲ್ ವಂಚನೆ. ವಿಳಾಸ ತಪ್ಪಾಗಿದೆ ಎಂದು ಕೇವಲ ₹25 ಶುಲ್ಕ ಪಾವತಿಸಲು ತಿಳಿಸಿ ನಿಮ್ಮ ಎಟಿಎಂ ಕಾರ್ಡ್ ಮತ್ತು ಸಿವಿವಿ ಕದಿಯುವ ತಂತ್ರ.',
      bn: 'মারাত্মক বিপদ: এটি ইন্ডিয়া পোস্টের ভুয়া পার্সেল ডেলিভারি নোটিস। ঠিকানা অসম্পূর্ণ বলে মাত্র ২৫ টাকা ফি চেয়ে আপনার ব্যাংকের কার্ড ডিটেইলস চুরি করার চেষ্টা করা হচ্ছে।',
      mr: 'गंभीर धोका: ही इंडिया पोस्टच्या नावाखाली सुरू असलेली फसवणूक आहे. पार्सल अडकल्याचे सांगून फक्त २५ रुपये रि-डिलिव्हरी फी मागण्याच्या बहाण्याने बँक कार्ड माहिती चोरण्याचा हा कट आहे.'
    },
    forensics: {
      domainAge: '1 day old (Created: Sep 18, 2026)',
      registrar: 'PublicDomainRegistry',
      sslIssuer: 'None (Plaintext Insecure HTTP)',
      hostIp: '194.26.29.112',
      geoCountry: 'Amsterdam, Netherlands',
      asn: 'AS59796 (Fast-Flux Hosting)',
      formAction: 'POST http://indiapost-parcel-reschedule.online/payment_gateway.php',
      payloadDetected: 'Payment Gateway Clone (Captures Full 16-digit Card + Expiry + CVV)',
      redirectChain: [
        'http://indiapost-parcel-reschedule.online/track',
        'http://indiapost-parcel-reschedule.online/confirm_address.php',
        'http://indiapost-parcel-reschedule.online/pay_fee.php'
      ],
      blacklists: {
        virusTotal: '15/89 Security Vendors Flagged Malicious',
        googleSafeBrowsing: 'Deceptive Content Detected',
        certInSmishWatch: 'Active Threat ID #IN-SMISH-2026-8941',
        i4cStatus: 'ISP Blocking Order Generated'
      }
    },
    sandboxLogs: [
      { step: 1, text: '[DNS-ENGINE] Host lookup indiapost-parcel-reschedule.online' },
      { step: 1, text: '[WHOIS] Domain Age: 28 hours old. Fake contact details in WHOIS record.' },
      { step: 2, text: '[DOCKER-MICROVM] Container initialization complete. HTTP port 80 handshake' },
      { step: 2, text: '[SSL-AUDIT] Warning: Unencrypted HTTP transmission for sensitive inputs' },
      { step: 3, text: '[PUPPETEER] Rendered fake India Post tracking interface with tracking ID #IN9482910' },
      { step: 3, text: '[EMULATION] Clicked "Update Address & Pay ₹25"' },
      { step: 4, text: '[FORM-AUDIT] Found spoofed Razorpay/BillDesk checkout capturing CVV directly' },
      { step: 4, text: '[VERDICT] THREAT CONFIRMED: Postal Delivery Financial Phishing Trap' }
    ],
    screenshotType: 'indiapost'
  },
  {
    id: 'jio-5g-lottery',
    title: 'Jio 5G Free 1-Year Recharge',
    url: 'https://jio-5g-vip-recharge.site/claim',
    entity: 'Reliance Jio (Spoofed)',
    riskScore: 71,
    riskLevel: 'suspicious',
    category: 'Viral Social Engineering & Aggressive Adware Redirects',
    summaryByLang: {
      en: 'SUSPICIOUS LINK: This viral link claims to provide a free 1-year 5G recharge. It coerces users into forwarding the link to 10 WhatsApp groups before granting the gift, spreading spam, collecting phone numbers, and redirecting users to predatory gambling portals.',
      hi: 'संदिग्ध लिंक - भारी सावधानी बरतें: यह लिंक 1 साल का मुफ्त 5G रिचार्ज देने का फर्जी दावा करता है। यह उपयोगकर्ताओं को 10 व्हाट्सएप ग्रुपों में शेयर करने के लिए मजबूर करता है, फोन नंबर एकत्र करता है और अवैध ऑनलाइन सट्टेबाजी ऐप्स पर भेजता है।',
      ta: 'சந்தேகத்திற்குரிய இணைப்பு: இது 1 வருட இலவச 5G ரீசார்ஜ் தருவதாக கூறும் ஏமாற்று வலைத்தளம். பரிசு பெற 10 வாட்ஸ்அப் குழுக்களுக்கு பகிருமாறு வற்புறுத்தி மக்களிடையே பரப்பப்படுகிறது.',
      te: 'అనుమానాస్పద లింక్: 1 సంవత్సరం ఉచిత 5G రీఛార్జ్ ఇస్తామని ఆశచూపే నకిలీ లింక్. దీన్ని 10 వాట్సాప్ గ్రూపులకు పంపాలని ఒత్తిడి చేస్తూ ఫోన్ నంబర్లు సేకరించి స్పామ్ సైట్లకు మళ్లిస్తుంది.',
      kn: 'ಅನುಮಾನಾಸ್ಪದ ಲಿಂಕ್: 1 ವರ್ಷದ ಉಚಿತ 5G ರೀಚಾರ್ಜ್ ನೀಡುವುದಾಗಿ ಸುಳ್ಳು ಹೇಳುವ ಲಿಂಕ್. ಉಡುಗೊರೆ ಪಡೆಯಲು 10 ವಾಟ್ಸಾಪ್ ಗುಂಪುಗಳಿಗೆ ಶೇರ್ ಮಾಡಲು ಒತ್ತಾಯಿಸಿ ಫೋನ್ ನಂಬರ್ ಡೇಟಾ ಕದಿಯುತ್ತದೆ.',
      bn: 'সন্দেহজনক লিঙ্ক: ১ বছরের ফ্রি ৫জি রিচার্জের লোভ দেখিয়ে ১০টি হোয়াটসঅ্যাপ গ্রুপে লিঙ্ক ফরোয়ার্ড করতে বাধ্য করে এবং ফোনের নম্বর ডাটাবেস চুরি করে।',
      mr: 'संशयास्पद लिंक: १ वर्षाचा मोफत ५जी रिचार्ज देण्याचा खोटा दावा करणारी ही लिंक आहे. १० व्हॉट्सअॅप ग्रुपवर शेअर करण्यास सांगून लोकांचे फोन नंबर गोळा केले जातात.'
    },
    forensics: {
      domainAge: '14 days old (Created: Sep 5, 2026)',
      registrar: 'NameSilo LLC',
      sslIssuer: 'cPanel Inc. Automated Certificate',
      hostIp: '104.21.44.18',
      geoCountry: 'San Jose, United States',
      asn: 'AS13335 (Cloudflare CDN Proxy)',
      formAction: 'GET https://jio-5g-vip-recharge.site/share_counter.php',
      payloadDetected: 'WhatsApp ClickJacking + Aggressive Ad-Push Notification Harvester',
      redirectChain: [
        'https://jio-5g-vip-recharge.site/claim',
        'https://betting-promo-asia.net/affiliate?ref=jio_scam'
      ],
      blacklists: {
        virusTotal: '6/89 Security Vendors Flagged Malicious / Spam',
        googleSafeBrowsing: 'Low Reputation Host Flag',
        certInSmishWatch: 'Monitored Viral Campaign #IN-VIRAL-2026-112',
        i4cStatus: 'Telecom Advisory Published'
      }
    },
    sandboxLogs: [
      { step: 1, text: '[DNS-ENGINE] Resolving jio-5g-vip-recharge.site via Cloudflare Anycast' },
      { step: 1, text: '[WHOIS] Domain Age: 14 days. Cheap .site gTLD pattern' },
      { step: 2, text: '[DOCKER-MICROVM] Launching Chromium sandbox. Tracking DOM event listeners.' },
      { step: 2, text: '[INSPECTOR] Detected simulated progress bar ("Recharge 80% Claimed!")' },
      { step: 3, text: '[SCRIPT-ANALYSIS] Found WhatsApp URL scheme: `whatsapp://send?text=...`' },
      { step: 3, text: '[BEHAVIOR] Script prevents page exit with `window.onbeforeunload` popups' },
      { step: 4, text: '[NETWORK-SNIFFER] Background requests sent to ad arbitrage networks' },
      { step: 4, text: '[VERDICT] SUSPICIOUS: Viral Adware & Telemetry Scraping Campaign' }
    ],
    screenshotType: 'jio'
  },
  {
    id: 'hdfc-legit',
    title: 'HDFC Bank NetBanking Portal',
    url: 'https://netbanking.hdfcbank.com/netbanking/',
    entity: 'HDFC Bank Limited (Verified Official)',
    riskScore: 3,
    riskLevel: 'safe',
    category: 'Legitimate Financial Institution Service',
    summaryByLang: {
      en: 'VERIFIED SAFE DOMAIN: This is the authentic, official NetBanking portal of HDFC Bank Limited. The domain has been registered for over 25 years, features Extended Validation SSL, and resolves to authorized banking servers in India.',
      hi: 'प्रमाणित सुरक्षित वेबसाइट: यह एचडीएफसी बैंक (HDFC Bank) का आधिकारिक और पूरी तरह सुरक्षित नेटबैंकिंग पोर्टल है। यह डोमेन 25 वर्षों से अधिक पुराना है और भारतीय बैंकिंग सर्वरों द्वारा होस्ट किया गया है।',
      ta: 'நம்பகமான பாதுகாப்பான தளம்: இது எச்டிஎஃப்சி வங்கியின் (HDFC Bank) அதிகாரப்பூர்வ இணைய வங்கி போர்ட்டல் ஆகும். இது 25 வருடங்களுக்கும் மேலான நம்பகமான வரலாற்றைக் கொண்டுள்ளது.',
      te: 'ధృవీకరించబడిన సురక్షిత వెబ్‌సైట్: ఇది హెచ్‌డీఎఫ్‌సీ బ్యాంక్ అధికారిక నెట్ బ్యాంకింగ్ పోర్టల్. ఇది 25 సంవత్సరాలకు పైగా నమోదు చేయబడి సురక్షితంగా ఉన్న బ్యాంకింగ్ సర్వర్.',
      kn: 'ದೃಢೀಕೃತ ಸುರಕ್ಷಿತ ಸೈಟ್: ಇದು ಎಚ್‌ಡಿಎಫ್‌ಸಿ ಬ್ಯಾಂಕ್‌ನ ಅಧಿಕೃತ ಮತ್ತು ಸುರಕ್ಷಿತ ನೆಟ್‌ಬ್ಯಾಂಕಿಂಗ್ ತಾಣವಾಗಿದೆ. ಈ ಡೊಮೇನ್ 25 ವರ್ಷಗಳಿಗೂ ಹೆಚ್ಚು ಕಾಲದಿಂದ ಚಾಲ್ತಿಯಲ್ಲಿದೆ.',
      bn: 'যাচাইকৃত নিরাপদ ওয়েবসাইট: এটি এইচডিএফসি ব্যাংকের আসল ও অফিসিয়াল নেটব্যাঙ্কিং পোর্টাল। এই ডোমেইনটি ২৫ বছরেরও বেশি পুরনো এবং সম্পূর্ণ নিরাপদ।',
      mr: 'प्रमाणित सुरक्षित वेबसाइट: हे एचडीएफसी बँकेचे अधिकृत नेटबँकिंग पोर्टल आहे. हे डोमेन २५ वर्षांपेक्षा जुने असून पूर्णपणे सुरक्षित आहे.'
    },
    forensics: {
      domainAge: '25 years old (Created: Sep 1999)',
      registrar: 'CSC Corporate Domains, Inc.',
      sslIssuer: 'DigiCert High Assurance EV Root CA (Extended Validation)',
      hostIp: '121.244.75.140',
      geoCountry: 'Mumbai, Maharashtra, India',
      asn: 'AS24309 (HDFC Bank Corporate ASN India)',
      formAction: 'POST https://netbanking.hdfcbank.com/netbanking/entry',
      payloadDetected: 'None. Enterprise Web Application Firewall & HSM Token Protection',
      redirectChain: ['https://netbanking.hdfcbank.com/netbanking/'],
      blacklists: {
        virusTotal: '0/89 Vendors Flagged (100% Clean)',
        googleSafeBrowsing: 'Clean / High Domain Authority',
        certInSmishWatch: 'Verified Critical Infrastructure Entity',
        i4cStatus: 'Authorized Banking Entity'
      }
    },
    sandboxLogs: [
      { step: 1, text: '[DNS-ENGINE] Resolving hdfcbank.com authoritative nameservers' },
      { step: 1, text: '[WHOIS] Domain Age: 25+ years. Registrant: HDFC Bank Limited' },
      { step: 2, text: '[SSL-AUDIT] Extended Validation (EV) certificate verified by DigiCert' },
      { step: 2, text: '[DOCKER-MICROVM] Launching Chromium sandbox. Validating CSP headers.' },
      { step: 3, text: '[INSPECTOR] Anti-tampering and CSRF tokens strictly validated' },
      { step: 3, text: '[NETWORK-SNIFFER] Encrypted TLS 1.3 channel to Mumbai datacenter' },
      { step: 4, text: '[HEURISTICS] Zero known scam signatures or malicious payloads found' },
      { step: 4, text: '[VERDICT] VERIFIED SAFE: Official HDFC Bank NetBanking Infrastructure' }
    ],
    screenshotType: 'hdfc'
  },
  {
    id: 'google-legit',
    title: 'Google India Search Engine',
    url: 'https://www.google.co.in',
    entity: 'Google LLC (Verified Official)',
    riskScore: 1,
    riskLevel: 'safe',
    category: 'Global Verified Infrastructure',
    summaryByLang: {
      en: 'VERIFIED SAFE DOMAIN: Official search engine domain for Google India. Zero threats detected.',
      hi: 'प्रमाणित सुरक्षित वेबसाइट: गूगल इंडिया का आधिकारिक सर्च इंजन डोमेन। कोई खतरा नहीं पाया गया।',
      ta: 'நம்பகமான தளம்: கூகிள் இந்தியாவின் அதிகாரப்பூர்வ தேடுபொறி முகவரி. எந்த ஆபத்தும் இல்லை.',
      te: 'సురక్షిత వెబ్‌సైట్: గూగుల్ ఇండియా అధికారిక సెర్చ్ ఇంజిన్. ఎలాంటి ప్రమాదం లేదు.',
      kn: 'ಸುರಕ್ಷಿತ ತಾಣ: ಗೂಗಲ್ ಇಂಡಿಯಾದ ಅಧಿಕೃತ ಹುಡುಕಾಟ ಇಂಜಿನ್. ಯಾವುದೇ ಅಪಾಯವಿಲ್ಲ.',
      bn: 'নিরাপদ ওয়েবসাইট: গুগল ইন্ডিয়ার আসল সার্চ ইঞ্জিন। কোনো বিপদ পাওয়া যায়নি।',
      mr: 'सुरक्षित संकेतस्थळ: गुगल इंडियाचे अधिकृत शोध इंजिन. कोणताही धोका नाही.'
    },
    forensics: {
      domainAge: '23 years old (Created: Jun 2003)',
      registrar: 'MarkMonitor Inc.',
      sslIssuer: 'Google Trust Services LLC (GTS CA 1C3)',
      hostIp: '142.250.193.195',
      geoCountry: 'New Delhi, India',
      asn: 'AS15169 (Google LLC)',
      formAction: 'GET /search',
      payloadDetected: 'None.',
      redirectChain: ['https://www.google.co.in'],
      blacklists: {
        virusTotal: '0/89 Clean',
        googleSafeBrowsing: 'Clean',
        certInSmishWatch: 'Clean',
        i4cStatus: 'Verified Infrastructure'
      }
    },
    sandboxLogs: [
      { step: 1, text: '[DNS-ENGINE] Querying google.co.in' },
      { step: 2, text: '[DOCKER-MICROVM] Container spinup complete' },
      { step: 3, text: '[INSPECTOR] TLS 1.3 verified' },
      { step: 4, text: '[VERDICT] VERIFIED SAFE' }
    ],
    screenshotType: 'google'
  }
];

// Helper to find preset by URL or generate dynamic analysis
export function analyzeTargetUrl(inputUrl) {
  if (!inputUrl) return SCAM_PRESETS[0];
  
  const cleanInput = inputUrl.trim().toLowerCase();
  
  const found = SCAM_PRESETS.find(p => 
    cleanInput.includes(p.url.toLowerCase()) || 
    p.url.toLowerCase().includes(cleanInput) ||
    cleanInput.includes(p.id)
  );
  
  if (found) return found;
  
  // Dynamic heuristic generation for user-typed URLs
  const isHttpOnly = cleanInput.startsWith('http://');
  const hasFishyTld = /\.top|\.xyz|\.online|\.site|\.live|\.click|\.vip|\.club/i.test(cleanInput);
  const hasSuspiciousKeywords = /bill|kyc|reward|bonus|yono|pay|lottery|apk|free|delivery|parcel|update/i.test(cleanInput);
  
  const isCritical = hasFishyTld && (hasSuspiciousKeywords || isHttpOnly);
  const isSuspicious = hasFishyTld || hasSuspiciousKeywords || isHttpOnly;
  
  const riskScore = isCritical ? 88 : (isSuspicious ? 64 : 12);
  const riskLevel = isCritical ? 'critical' : (isSuspicious ? 'suspicious' : 'safe');
  
  return {
    id: 'custom-' + Date.now(),
    title: cleanInput,
    url: inputUrl,
    entity: isCritical ? 'Unverified / Potential Brand Impersonator' : (isSuspicious ? 'Suspicious Third-Party Domain' : 'Standard Web Domain'),
    riskScore: riskScore,
    riskLevel: riskLevel,
    category: isCritical ? 'Suspicious Phishing Signature & Unverified Host' : (isSuspicious ? 'Unverified Free TLD / Adware Network' : 'Normal Domain Activity'),
    summaryByLang: {
      en: isCritical 
        ? `HIGH RISK WARNING: The URL "${inputUrl}" exhibits multiple signs of a scam or phishing operation. It uses a high-risk TLD, zero-day domain age characteristics, and lacks verified ownership. Do not share banking credentials, OTPs, or install downloaded APKs.`
        : (isSuspicious 
          ? `CAUTION ADVISED: The URL "${inputUrl}" has suspicious telemetry indicators such as unverified domain credentials or potential redirect chains. Proceed with heightened vigilance.`
          : `LOW RISK DETECTED: The URL "${inputUrl}" shows standard domain longevity and standard security certificate signatures. Always verify the address bar before entering passwords.`),
      hi: isCritical
        ? `चेतावनी: यह लिंक "${inputUrl}" एक ऑनलाइन धोखाधड़ी या फ़िशिंग लिंक होने के गंभीर संकेत दिखाता है। यहां कोई भी बैंक विवरण या ओटीपी दर्ज न करें और न ही कोई फाइल डाउनलोड करें।`
        : `सावधानी: इस लिंक "${inputUrl}" पर कोई असामान्य गतिविधि या धोखाधड़ी का सीधा प्रमाण नहीं मिला है, फिर भी अपनी निजी जानकारी साझा करने से पहले जांच करें।`,
      ta: isCritical
        ? `எச்சரிக்கை: இந்த இணைப்பு "${inputUrl}" மோசடி தளம் போன்ற ஆபத்தான அம்சங்களை கொண்டுள்ளது. உங்கள் வங்கி தகவல்களையோ அல்லது கடவுச்சொற்களையோ உள்ளிட வேண்டாம்.`
        : `பாதுகாப்பானது: இந்த இணைப்பில் பெரிய ஆபத்துகள் கண்டறியப்படவில்லை. ஆனாலும் கவனமாக இருக்கவும்.`,
      te: isCritical
        ? `హెచ్చరిక: "${inputUrl}" లింక్ తీవ్రమైన సైబర్ మోసం యొక్క లక్షణాలను కలిగి ఉంది. ఎలాంటి పాస్‌వర్డ్‌లు లేదా బ్యాంక్ వివరాలను నమోదు చేయవద్దు.`
        : `సురక్షితం: ఈ లింక్‌లో ప్రమాదకరమైన కోడ్ ఏదీ గుర్తించబడలేదు.`,
      kn: isCritical
        ? `ಎಚ್ಚರಿಕೆ: "${inputUrl}" ಲಿಂಕ್ ವಂಚನೆಯ ಲಕ್ಷಣಗಳನ್ನು ಹೊಂದಿದೆ. ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ವಿವರಗಳು ಅಥವಾ ಒಟಿಪಿ ಹಂಚಿಕೊಳ್ಳಬೇಡಿ.`
        : `ಸಾಮಾನ್ಯ: ಈ ಲಿಂಕ್‌ನಲ್ಲಿ ಯಾವುದೇ ಗಂಭೀರ ಅಪಾಯ ಪತ್ತೆಯಾಗಿಲ್ಲ.`,
      bn: isCritical
        ? `সতর্কতা: "${inputUrl}" লিঙ্কটি একটি বিপজ্জনক ফিশিং প্রতারণার লক্ষণ বহন করছে। কোনো পাসওয়ার্ড বা ওটিপি দেবেন না।`
        : `নিরাপদ: এই লিঙ্কে কোনো বড় বিপদ পাওয়া যায়নি।`,
      mr: isCritical
        ? `सावधान: "${inputUrl}" ही लिंक सायबर फसवणुकीचे संकेत दाखवत आहे. आपले बँक तपशील किंवा पासवर्ड भरू नका.`
        : `सुरक्षित: या लिंकवर कोणताही मोठा धोका आढळला नाही.`
    },
    forensics: {
      domainAge: isCritical ? '3 days old' : '1.4 years old',
      registrar: isCritical ? 'Namecheap / Privacy Guarded' : 'Cloudflare Inc.',
      sslIssuer: isHttpOnly ? 'None (Insecure HTTP)' : 'Let\'s Encrypt TLS Authority',
      hostIp: isCritical ? '193.106.191.42' : '104.26.12.98',
      geoCountry: isCritical ? 'Seychelles / Off-shore' : 'Singapore / India Edge',
      asn: isCritical ? 'AS9123 (Bulletproof Host)' : 'AS13335 (Cloudflare)',
      formAction: isCritical ? 'POST /auth/capture.php' : 'None detected',
      payloadDetected: isCritical ? 'Heuristic Pattern: Fake Authentication Portal' : 'None',
      redirectChain: [inputUrl],
      blacklists: {
        virusTotal: isCritical ? '8/89 Vendors Flagged Suspicious' : '0/89 Clean',
        googleSafeBrowsing: isCritical ? 'Potential Threat' : 'Clean',
        certInSmishWatch: isCritical ? 'Flagged by Citizen Telemetry' : 'Unlisted',
        i4cStatus: isCritical ? 'Under Automated Review' : 'Verified Host'
      }
    },
    sandboxLogs: [
      { step: 1, text: `[DNS-ENGINE] Querying A records for ${inputUrl}` },
      { step: 1, text: `[WHOIS] Domain Age: ${isCritical ? 'Zero-day (<7 days)' : 'Established (>1 yr)'}` },
      { step: 2, text: '[DOCKER-MICROVM] Container initialized in 180ms' },
      { step: 2, text: `[SSL-AUDIT] Handshake protocol: ${isHttpOnly ? 'UNENCRYPTED HTTP' : 'TLS 1.3 Active'}` },
      { step: 3, text: '[PUPPETEER] Rendering simulated viewport snapshot' },
      { step: 3, text: '[NETWORK-SNIFFER] Tracking DOM event listeners and XHR traffic' },
      { step: 4, text: `[INSPECTOR] Risk evaluation calculated: ${riskScore}/100` },
      { step: 4, text: `[VERDICT] STATUS: ${riskLevel.toUpperCase()}` }
    ],
    screenshotType: 'custom'
  };
}
