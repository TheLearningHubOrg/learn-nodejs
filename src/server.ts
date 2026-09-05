import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getRuntimeDiagnostics } from './controllers/diagnosticsController.js';
import {
  runEventLoopSimulation,
  runStreamSimulation,
  runWorkerSimulation
} from './controllers/sandboxController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static frontend assets
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

// Health Check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'healthy',
    service: 'learn-nodejs-masterclass',
    version: '2.0.0',
    nodeVersion: process.version,
    timestamp: new Date().toISOString()
  });
});

// Runtime Diagnostics
app.get('/api/diagnostics', getRuntimeDiagnostics);

// Interactive Sandboxes
app.post('/api/sandbox/event-loop', runEventLoopSimulation);
app.post('/api/sandbox/stream-pipeline', runStreamSimulation);
app.post('/api/sandbox/worker-thread', runWorkerSimulation);

// Root fallback to index.html
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api')) {
    return res.sendFile(path.join(publicPath, 'index.html'));
  }
  next();
});

// Server Bootstrap
if (process.env.NODE_ENV !== 'test') {
  const server = app.listen(PORT, () => {
    console.log(`🚀 Node.js Masterclass Server running on http://localhost:${PORT}`);
  });

  const shutdown = (signal: string) => {
    console.log(`\n🛑 Received ${signal}, initiating graceful shutdown...`);
    server.close(() => {
      console.log('✅ HTTP server closed cleanly. Process exiting.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}
