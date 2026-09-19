export const LIVE_TELEMETRY_FEED = [
  {
    id: 'TEL-8921',
    time: 'Just now',
    domain: 'bescom-bill-update.top',
    brand: 'BESCOM Electricity',
    originState: 'Karnataka',
    reportedBy: 'Citizen via SMS #1930',
    risk: 'CRITICAL',
    vector: 'Trojan APK Dropper',
    action: 'Domain Takedown Sent to Namecheap'
  },
  {
    id: 'TEL-8920',
    time: '2m ago',
    domain: 'sbi-reward-yono-kyc.xyz',
    brand: 'State Bank of India',
    originState: 'Maharashtra',
    reportedBy: 'I4C Mumbai Cyber Cell Sensor',
    risk: 'CRITICAL',
    vector: 'OTP / NetBanking Phish',
    action: 'ISP DNS Blacklist Enforced'
  },
  {
    id: 'TEL-8919',
    time: '5m ago',
    domain: 'indiapost-parcel-reschedule.online',
    brand: 'India Post',
    originState: 'Delhi NCR',
    reportedBy: 'Citizen WhatsApp Forward',
    risk: 'CRITICAL',
    vector: 'CVV Payment Trap',
    action: 'CERT-In Incident #IN-9041 Created'
  },
  {
    id: 'TEL-8918',
    time: '8m ago',
    domain: 'jio-5g-vip-recharge.site',
    brand: 'Reliance Jio',
    originState: 'Uttar Pradesh',
    reportedBy: 'Telegram Threat Scraper',
    risk: 'SUSPICIOUS',
    vector: 'Adware / Viral Flooder',
    action: 'Ad Network Takedown Notice'
  },
  {
    id: 'TEL-8917',
    time: '12m ago',
    domain: 'mahavitaran-power-bill.top',
    brand: 'MSEDCL Maharashtra',
    originState: 'Maharashtra',
    reportedBy: 'Citizen via 1930 Helpline',
    risk: 'CRITICAL',
    vector: 'Fake Payment Form',
    action: 'Registrar Abuse Ticket #99104'
  },
  {
    id: 'TEL-8916',
    time: '17m ago',
    domain: 'icici-rewards-redeem.live',
    brand: 'ICICI Bank',
    originState: 'Tamil Nadu',
    reportedBy: 'Chennai Cyber Crime Police',
    risk: 'CRITICAL',
    vector: 'Credit Card Harvester',
    action: 'Fast-Flux Infrastructure Sinkholed'
  },
  {
    id: 'TEL-8915',
    time: '22m ago',
    domain: 'tneb-bill-cutoff-alert.click',
    brand: 'TANGEDCO Tamil Nadu',
    originState: 'Tamil Nadu',
    reportedBy: 'Citizen Scan via Sfynbox',
    risk: 'CRITICAL',
    vector: 'SMS Phishing Link',
    action: 'Flagged on National SmishWatch'
  },
  {
    id: 'TEL-8914',
    time: '29m ago',
    domain: 'incometax-refund-claim.online',
    brand: 'Income Tax Department',
    originState: 'West Bengal',
    reportedBy: 'Kolkata Cyber Cell',
    risk: 'CRITICAL',
    vector: 'PAN & Bank Details Theft',
    action: 'Section 69A Notice Issued'
  }
];

export const STATE_HEATMAP_DATA = [
  { state: 'Maharashtra', reports: 14210, threatRate: 88, primaryTarget: 'MSEDCL & SBI KYC', status: 'High Alert' },
  { state: 'Karnataka', reports: 12850, threatRate: 84, primaryTarget: 'BESCOM & Work-from-home Scams', status: 'High Alert' },
  { state: 'Uttar Pradesh', reports: 11420, threatRate: 79, primaryTarget: 'UPPCL Bill & Free Recharge', status: 'High Alert' },
  { state: 'Delhi NCR', reports: 10980, threatRate: 86, primaryTarget: 'India Post & NetBanking Phish', status: 'High Alert' },
  { state: 'Tamil Nadu', reports: 9340, threatRate: 72, primaryTarget: 'TANGEDCO & Courier Smishing', status: 'Elevated' },
  { state: 'Telangana', reports: 8640, threatRate: 75, primaryTarget: 'TSSPDCL & Loan App APKs', status: 'Elevated' },
  { state: 'West Bengal', reports: 7890, threatRate: 69, primaryTarget: 'Lottery & Part-time Job Scams', status: 'Elevated' },
  { state: 'Gujarat', reports: 7120, threatRate: 64, primaryTarget: 'Stock Trading & Crypto Traps', status: 'Moderate' },
  { state: 'Rajasthan', reports: 5930, threatRate: 61, primaryTarget: 'Electricity Board & Postal SMS', status: 'Moderate' },
  { state: 'Kerala', reports: 4890, threatRate: 58, primaryTarget: 'KSEB Bill & Overseas Job Scams', status: 'Moderate' }
];

export const TOP_IMPERSONATED_ENTITIES = [
  { name: 'State Electricity Boards (BESCOM, MSEDCL, UPPCL, TANGEDCO)', percentage: 36, color: '#EF4444', icon: 'zap' },
  { name: 'Nationalized & Private Banks (SBI, HDFC, ICICI, PNB)', percentage: 29, color: '#F59E0B', icon: 'landmark' },
  { name: 'India Post & Express Parcel Couriers', percentage: 18, color: '#3B82F6', icon: 'package' },
  { name: 'Telecom Providers (Jio 5G, Airtel VIP Recharge)', percentage: 11, color: '#8B5CF6', icon: 'radio' },
  { name: 'Government Utilities (Income Tax, EPFO, Challan)', percentage: 6, color: '#10B981', icon: 'shield' }
];

export const CITIZEN_SCAN_HISTORY = [
  {
    id: 'CS-1094',
    url: 'http://bescom-bill-update.top/pay-now',
    date: 'Sep 19, 2026, 08:42 PM',
    riskLevel: 'critical',
    verdict: 'Dangerous BESCOM APK Dropper',
    device: 'Android Phone (via SMS)',
    status: 'Reported to 1930'
  },
  {
    id: 'CS-1093',
    url: 'https://netbanking.hdfcbank.com/netbanking/',
    date: 'Sep 18, 2026, 04:15 PM',
    riskLevel: 'safe',
    verdict: 'Verified Official HDFC NetBanking',
    device: 'Windows Desktop (Chrome)',
    status: 'Safe to Browse'
  },
  {
    id: 'CS-1092',
    url: 'http://indiapost-parcel-reschedule.online/track',
    date: 'Sep 17, 2026, 11:30 AM',
    riskLevel: 'critical',
    verdict: 'Fake India Post CVV Harvester',
    device: 'iOS Safari (via SMS)',
    status: 'Reported to 1930'
  },
  {
    id: 'CS-1091',
    url: 'https://jio-5g-vip-recharge.site/claim',
    date: 'Sep 15, 2026, 07:12 PM',
    riskLevel: 'suspicious',
    verdict: 'Aggressive Adware & WhatsApp Share Trap',
    device: 'Android Phone (WhatsApp)',
    status: 'Advised Caution'
  }
];

// Generate formatted CERT-In Section 69A IT Act Emergency Takedown Notice
export function generateCertInNotice(threatData) {
  const dateStr = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
  
  return `OFFICIAL NOTICE UNDER SECTION 69A OF THE INFORMATION TECHNOLOGY ACT, 2000
GOVERNMENT OF INDIA / INDIAN CYBER CRIME COORDINATION CENTRE (I4C) & CERT-IN
NATIONAL CYBER CRIME REPORTING PORTAL (NCRP) TELEMETRY DIVISION

Date: ${dateStr}
Incident Reference: CERT-IN/EMERGENCY/SMISH/${Date.now().toString().slice(-6)}
Priority: IMMEDIATE TAKEDOWN / EMERGENCY FAST-TRACK DIRECTIVE

TO:
1. Designated Registrar Abuse Desk (Namecheap / Hostinger / Cloudflare)
2. All Unified Access Service Providers (DoT / Indian Telcos & ISPs)
3. National Internet Exchange of India (NIXI)

SUBJECT: IMMEDIATE BLOCKING & SINKHOLING OF MALICIOUS SMISHING DOMAIN UNDER SECTION 69A

Sir / Madam,

Forensic telemetry captured by the Sfynbox Multi-Device Sandbox Platform and verified by I4C indicates active cyber fraud and credential harvesting operations targeting Indian citizens.

FORENSIC EVIDENCE DOSSIER:
1. Target URL: ${threatData.url}
2. Impersonated Entity: ${threatData.entity}
3. Malicious Classification: ${threatData.category}
4. Host Server IP: ${threatData.forensics?.hostIp || '185.220.101.5'} (${threatData.forensics?.geoCountry || 'Russian Federation'})
5. Zero-Day Domain Age: ${threatData.forensics?.domainAge || '48 hours'}
6. Credential Interception Endpoint: ${threatData.forensics?.formAction || 'POST /api/steal.php'}
7. Payload Signature: ${threatData.forensics?.payloadDetected || 'Trojan.Banker.FakeInst APK'}

LEGAL DIRECTIVE:
You are hereby directed under Section 69A of the Information Technology Act, 2000 read with the Information Technology (Procedure and Safeguards for Blocking for Access of Information by Public) Rules, 2009 to:
(a) Suspend domain DNS resolution within 2 hours of receipt of this notice.
(b) Preserve all WHOIS, payment gateway, and registrant IP server logs for criminal investigation by State Cyber Police.
(c) Confirm compliance to cert-in@nic.in and i4c-telemetry@mha.gov.in.

Sd/-
Superintendent of Police / Technical Director
Indian Cyber Crime Coordination Centre (I4C), Ministry of Home Affairs, New Delhi.`;
}
