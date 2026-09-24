import express from 'express';
import { apiRouter } from './apiRouter.js';

const app = express();
app.use(express.json());
app.use('/api', apiRouter);

const server = app.listen(5099, async () => {
  console.log('Test server running on port 5099...');
  try {
    const baseUrl = 'http://localhost:5099/api';

    // 1. Health check
    const healthRes = await fetch(`${baseUrl}/health`).then(r => r.json());
    console.log('✓ Health check passed:', healthRes.status);

    // 2. Test Rule A: Electricity Discom
    const scanARes = await fetch(`${baseUrl}/scan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: 'Dear customer electricity power will be disconnected tonight at 9:30 PM from power office unpaid bill contact 9821048921 or visit http://bescom-bill.top/pay',
        language: 'hi'
      })
    }).then(r => r.json());
    console.log('✓ Rule A Scan:', {
      riskScore: scanARes.riskScore,
      riskLevel: scanARes.riskLevel,
      riskCategory: scanARes.riskCategory,
      senderIdentifier: scanARes.senderIdentifier,
      hasHindiSummary: !!scanARes.localizedSummary?.hi,
      hasAudioWarning: !!scanARes.audioWarningText
    });
    if (scanARes.riskScore !== 95 || scanARes.riskCategory !== 'ELECTRICITY_DISCOM') {
      throw new Error(`Rule A failed: expected score 95, category ELECTRICITY_DISCOM. Got ${scanARes.riskScore}, ${scanARes.riskCategory}`);
    }

    // 3. Test Rule B: APK Malware
    const scanBRes = await fetch(`${baseUrl}/scan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: 'SBI YONO: urgent update required. Download update app http://sbi-kyc.xyz/app.apk',
        language: 'en'
      })
    }).then(r => r.json());
    console.log('✓ Rule B Scan:', {
      riskScore: scanBRes.riskScore,
      riskLevel: scanBRes.riskLevel,
      riskCategory: scanBRes.riskCategory
    });
    if (scanBRes.riskScore !== 98 || scanBRes.riskCategory !== 'APK_MALWARE') {
      throw new Error(`Rule B failed: expected score 98, category APK_MALWARE. Got ${scanBRes.riskScore}, ${scanBRes.riskCategory}`);
    }

    // 4. Test Rule C: Legit Banking OTP
    const scanCRes = await fetch(`${baseUrl}/scan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: 'State Bank of India: OTP is 492019 for transaction of Rs 2,500. Valid for 5 mins. Never share OTP with anyone.',
        language: 'te'
      })
    }).then(r => r.json());
    console.log('✓ Rule C Scan:', {
      riskScore: scanCRes.riskScore,
      riskLevel: scanCRes.riskLevel,
      riskCategory: scanCRes.riskCategory
    });
    if (scanCRes.riskScore !== 5 || scanCRes.riskCategory !== 'LEGIT') {
      throw new Error(`Rule C failed: expected score 5, category LEGIT. Got ${scanCRes.riskScore}, ${scanCRes.riskCategory}`);
    }

    // 5. Test Rule D: Fallback Suspicious
    const scanDRes = await fetch(`${baseUrl}/scan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: 'Kindly check your application status here: https://custom-link.site/check',
        language: 'en'
      })
    }).then(r => r.json());
    console.log('✓ Rule D Scan:', {
      riskScore: scanDRes.riskScore,
      riskLevel: scanDRes.riskLevel,
      riskCategory: scanDRes.riskCategory
    });
    if (scanDRes.riskScore !== 60 || scanDRes.riskLevel !== 'SUSPICIOUS') {
      throw new Error(`Rule D failed: expected score 60, level SUSPICIOUS. Got ${scanDRes.riskScore}, ${scanDRes.riskLevel}`);
    }

    // 6. Test GET /api/reports
    const reportsRes = await fetch(`${baseUrl}/reports`).then(r => r.json());
    console.log(`✓ GET /api/reports returned ${reportsRes.count} reports.`);
    if (!reportsRes.reports || reportsRes.reports.length === 0) {
      throw new Error('GET /api/reports returned empty list');
    }

    // 7. Test POST /api/reports/:id/report-i4c
    const targetReportId = scanARes.id;
    const reportI4CRes = await fetch(`${baseUrl}/reports/${targetReportId}/report-i4c`, {
      method: 'POST'
    }).then(r => r.json());
    console.log('✓ Escalated to 1930 / I4C:', {
      success: reportI4CRes.success,
      reportedToI4C: reportI4CRes.report?.reportedToI4C
    });
    if (!reportI4CRes.report?.reportedToI4C) {
      throw new Error('POST /api/reports/:id/report-i4c failed to set reportedToI4C to true');
    }

    console.log('\n==========================================');
    console.log('🎉 ALL BACKEND API TESTS PASSED SUCCESSFULLY!');
    console.log('==========================================\n');
  } catch (err) {
    console.error('❌ Test failed:', err);
    process.exitCode = 1;
  } finally {
    server.close();
  }
});
