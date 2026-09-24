import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Store database file in server/data directory
const dbDir = path.resolve(__dirname, 'data');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, 'scam_sandbox.db');
const db = new DatabaseSync(dbPath);

// Initialize schema
db.exec(`
  CREATE TABLE IF NOT EXISTS scam_reports (
    id TEXT PRIMARY KEY,
    rawMessage TEXT NOT NULL,
    senderIdentifier TEXT,
    extractedUrl TEXT,
    domainAgeDays INTEGER,
    riskScore INTEGER NOT NULL,
    riskLevel TEXT NOT NULL,
    riskCategory TEXT NOT NULL,
    localizedSummary TEXT NOT NULL,
    screenshotUrl TEXT,
    reportedToI4C INTEGER DEFAULT 0,
    createdAt TEXT NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_scam_reports_created ON scam_reports(createdAt DESC);
`);

// Pre-seed sample reports if table is empty
const countStmt = db.prepare('SELECT COUNT(*) as count FROM scam_reports');
const result = countStmt.get();
if (result && result.count === 0) {
  const seedReports = [
    {
      id: 'rpt-seed-bescom-01',
      rawMessage: 'Dear customer electricity power will be disconnected tonight at 9:30 PM from power office because your previous month bill was not update. Please contact immediately 9821048921 or visit http://bescom-bill-update.top/pay-now',
      senderIdentifier: 'VK-BESCOM',
      extractedUrl: 'http://bescom-bill-update.top/pay-now',
      domainAgeDays: 2,
      riskScore: 95,
      riskLevel: 'DANGER',
      riskCategory: 'ELECTRICITY_DISCOM',
      localizedSummary: JSON.stringify({
        en: 'CRITICAL THREAT: Disconnection fraud spoofing BESCOM. Urgent threat coercing immediate payment via an unverified zero-day domain.',
        hi: 'गंभीर चेतावनी: BESCOM बिजली बिल के नाम पर फर्जी डिस्कनेक्शन नोटिस। यह एक खतरनाक ठगी है।',
        ta: 'ஆபத்தான எச்சரிக்கை: பெஸ்காம் மின் இணைப்பு துண்டிக்கப்படும் என போலியான அச்சுறுத்தல்.',
        te: 'తీవ్ర హెచ్చరిక: విద్యుత్ సరఫరా నిలిపివేస్తామని మోసపూరిత బెదిరింపు.',
        mr: 'धोका इशारा: वीज पुरवठा खंडित करण्याची बनावट नोटीस देऊन फसवणूक.',
        bn: 'মারাত্মক বিপদ: বিদ্যুৎ সংযোগ বিচ্ছিন্ন করার ভুয়ো হুমকি দিয়ে সাইবার জালিয়াতি।'
      }),
      screenshotUrl: '/preview-bescom.png',
      reportedToI4C: 1,
      createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString()
    },
    {
      id: 'rpt-seed-sbi-02',
      rawMessage: 'Dear SBI user, your YONO NetBanking account has been blocked today due to pending KYC update. Download the urgent security update immediately: https://sbi-reward-yono-kyc.xyz/app.apk to avoid permanent suspension.',
      senderIdentifier: '+91 97182 34910',
      extractedUrl: 'https://sbi-reward-yono-kyc.xyz/app.apk',
      domainAgeDays: 4,
      riskScore: 98,
      riskLevel: 'DANGER',
      riskCategory: 'APK_MALWARE',
      localizedSummary: JSON.stringify({
        en: 'CRITICAL THREAT: Banking Trojan alert. Demands APK installation masquerading as SBI YONO to harvest SMS OTPs and credentials.',
        hi: 'अत्यंत गंभीर खतरा: बैंक ट्रोजन वायरस! SBI YONO के नाम पर फर्जी APK डाउनलोड करवाकर ओटीपी चुराने का प्रयास।',
        ta: 'தீவிர எச்சரிக்கை: எஸ்பிஐ யோனோ பெயரில் போலி ஏபிகே (APK) பதிவிறக்க தூண்டும் வங்கி வைரஸ்.',
        te: 'తీవ్ర ప్రమాదం: ఎస్‌బీఐ యోనో పేరుతో ఏపీకే యాప్ డౌన్‌లోడ్ చేయించి ఓటీపీలను దొంగిలించే వైరస్.',
        mr: 'धोकादायक: एसबीआय योनोच्या नावाखाली बँक ट्रोजन एपीके डाउनलोड करण्याचा प्रयत्न.',
        bn: 'মারাত্মক প্রতারণা: এসবিআই নাম করে ব্যাঙ্কিং ট্রোজান এপিকে ফাইল ডাউনলোড করানোর চক্রান্ত।'
      }),
      screenshotUrl: '/preview-sbi.png',
      reportedToI4C: 0,
      createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString()
    },
    {
      id: 'rpt-seed-hdfc-03',
      rawMessage: 'OTP for transaction of INR 3,450.00 at AMAZON PAY is 591024. Valid for 10 mins. Never share OTP with anyone including bank staff - HDFC Bank.',
      senderIdentifier: 'VM-HDFCBK',
      extractedUrl: '',
      domainAgeDays: 365,
      riskScore: 5,
      riskLevel: 'SAFE',
      riskCategory: 'LEGIT',
      localizedSummary: JSON.stringify({
        en: 'SAFE: Standard transactional OTP format from authorized banking sender. Never share this code with anyone.',
        hi: 'सुरक्षित: अधिकृत बैंक से वैध लेनदेन ओटीपी। यह कोड किसी के साथ साझा न करें।',
        ta: 'பாதுகாப்பானது: அங்கீகரிக்கப்பட்ட வங்கியின் நிலையான பரிவர்த்தனை ஓடிபி.',
        te: 'సురక్షితం: ధృవీకరించబడిన బ్యాంక్ నుండి సాధారణ లావాదేవీల ఓటీపీ.',
        mr: 'सुरक्षित: बँकेकडून आलेला अधिकृत व्यवहाराचा वैध ओटीपी.',
        bn: 'নিরাপদ: ব্যাংক থেকে আসা বৈধ লেনদেনের সাধারণ ওটিপি বার্তা।'
      }),
      screenshotUrl: null,
      reportedToI4C: 0,
      createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString()
    }
  ];

  const insertStmt = db.prepare(`
    INSERT INTO scam_reports (
      id, rawMessage, senderIdentifier, extractedUrl, domainAgeDays,
      riskScore, riskLevel, riskCategory, localizedSummary,
      screenshotUrl, reportedToI4C, createdAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const r of seedReports) {
    insertStmt.run(
      r.id,
      r.rawMessage,
      r.senderIdentifier,
      r.extractedUrl,
      r.domainAgeDays,
      r.riskScore,
      r.riskLevel,
      r.riskCategory,
      r.localizedSummary,
      r.screenshotUrl,
      r.reportedToI4C,
      r.createdAt
    );
  }
}

export function createReport(data) {
  const insertStmt = db.prepare(`
    INSERT INTO scam_reports (
      id, rawMessage, senderIdentifier, extractedUrl, domainAgeDays,
      riskScore, riskLevel, riskCategory, localizedSummary,
      screenshotUrl, reportedToI4C, createdAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const id = data.id || `rpt-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const createdAt = data.createdAt || new Date().toISOString();
  const reportedToI4C = data.reportedToI4C ? 1 : 0;
  const localizedSummary = typeof data.localizedSummary === 'string'
    ? data.localizedSummary
    : JSON.stringify(data.localizedSummary || {});

  insertStmt.run(
    id,
    data.rawMessage || '',
    data.senderIdentifier || null,
    data.extractedUrl || null,
    data.domainAgeDays !== undefined ? data.domainAgeDays : null,
    data.riskScore,
    data.riskLevel,
    data.riskCategory,
    localizedSummary,
    data.screenshotUrl || null,
    reportedToI4C,
    createdAt
  );

  return getReportById(id);
}

export function getReports(limit = 100) {
  const query = db.prepare(`
    SELECT * FROM scam_reports 
    ORDER BY createdAt DESC 
    LIMIT ?
  `);
  const rows = query.all(limit);
  return rows.map(formatReport);
}

export function getReportById(id) {
  const query = db.prepare('SELECT * FROM scam_reports WHERE id = ?');
  const row = query.get(id);
  return row ? formatReport(row) : null;
}

export function markReportedToI4C(id) {
  const updateStmt = db.prepare(`
    UPDATE scam_reports 
    SET reportedToI4C = 1 
    WHERE id = ?
  `);
  updateStmt.run(id);
  return getReportById(id);
}

function formatReport(row) {
  let summary = {};
  try {
    summary = JSON.parse(row.localizedSummary);
  } catch {
    summary = { en: row.localizedSummary };
  }

  return {
    ...row,
    reportedToI4C: Boolean(row.reportedToI4C),
    localizedSummary: summary
  };
}

export default {
  createReport,
  getReports,
  getReportById,
  markReportedToI4C
};
