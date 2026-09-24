import express from 'express';
import { analyzeMessage } from './threatEngine.js';
import db from './db.js';

export const apiRouter = express.Router();

// Middleware to parse JSON
apiRouter.use(express.json());

// Health Check
apiRouter.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Sfynbox Scam SMS Sandbox API',
    database: 'SQLite (node:sqlite)',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

/**
 * POST /api/scan
 * Body: { text: string, language?: string, imageUrl?: string }
 */
apiRouter.post('/scan', (req, res) => {
  try {
    const { text, language = 'en', imageUrl } = req.body || {};

    if (!text && !imageUrl) {
      return res.status(400).json({
        error: 'Missing input payload: provide `text` (SMS message or URL) or `imageUrl`.'
      });
    }

    // 1. Analyze threat using heuristic logic engine
    const analysis = analyzeMessage({
      text: text || '',
      language,
      imageUrl
    });

    // 2. Persist incident in database
    const savedReport = db.createReport({
      rawMessage: analysis.rawMessage,
      senderIdentifier: analysis.senderIdentifier,
      extractedUrl: analysis.extractedUrl,
      domainAgeDays: analysis.domainAgeDays,
      riskScore: analysis.riskScore,
      riskLevel: analysis.riskLevel,
      riskCategory: analysis.riskCategory,
      localizedSummary: analysis.localizedSummary,
      screenshotUrl: analysis.screenshotUrl,
      reportedToI4C: false,
      createdAt: analysis.createdAt
    });

    // 3. Return full dossier for Sandbox UI consumption
    return res.status(200).json({
      ...analysis,
      id: savedReport.id,
      reportedToI4C: savedReport.reportedToI4C
    });
  } catch (error) {
    console.error('[API /api/scan] Error:', error);
    return res.status(500).json({
      error: 'Threat analysis failed',
      details: error.message
    });
  }
});

/**
 * GET /api/reports
 * Query: ?limit=50
 */
apiRouter.get('/reports', (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 50;
    const reports = db.getReports(limit);
    return res.status(200).json({
      count: reports.length,
      reports
    });
  } catch (error) {
    console.error('[API /api/reports] Error:', error);
    return res.status(500).json({
      error: 'Failed to retrieve reports',
      details: error.message
    });
  }
});

/**
 * POST or PATCH /api/reports/:id/report-i4c
 * Updates reportedToI4C flag to true
 */
const handleReportToI4C = (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Report ID is required' });
    }

    const updated = db.markReportedToI4C(id);
    if (!updated) {
      return res.status(404).json({ error: `Report with ID "${id}" not found` });
    }

    return res.status(200).json({
      success: true,
      message: 'Threat escalated to 1930 / I4C Incident DB',
      report: updated
    });
  } catch (error) {
    console.error('[API report-i4c] Error:', error);
    return res.status(500).json({
      error: 'Failed to update report',
      details: error.message
    });
  }
};

apiRouter.post('/reports/:id/report-i4c', handleReportToI4C);
apiRouter.patch('/reports/:id/report-i4c', handleReportToI4C);

// Allow POST /api/reports with { id, reportedToI4C: true } as an alternative format
apiRouter.post('/reports', (req, res) => {
  const { id } = req.body || {};
  if (id) {
    req.params.id = id;
    return handleReportToI4C(req, res);
  }
  return res.status(400).json({ error: 'Missing report id' });
});

export default apiRouter;
