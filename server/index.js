import express from 'express';
import cors from 'cors';
import { apiRouter } from './apiRouter.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mount API router
app.use('/api', apiRouter);

// Root greeting
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    service: 'Sfynbox Scam SMS Sandbox Backend',
    endpoints: [
      'POST /api/scan',
      'GET /api/reports',
      'POST /api/reports/:id/report-i4c',
      'GET /api/health'
    ]
  });
});

app.listen(PORT, () => {
  console.log(`[Sfynbox Backend] Server running on http://localhost:${PORT}`);
  console.log(`[Sfynbox Backend] API Base: http://localhost:${PORT}/api`);
});

export default app;
