import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from './server.js';
import { simulateEventLoopExecution } from './services/eventLoopService.js';
import { runStreamPipelineDemo } from './services/streamService.js';
import { runCpuOffloadTask } from './services/workerPoolService.js';

describe('Node.js 20/22 Enterprise API & Runtime Diagnostics Suite', () => {
  describe('GET /api/health', () => {
    it('should return 200 with service health metadata', async () => {
      const res = await request(app).get('/api/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('healthy');
      expect(res.body.version).toBe('2.0.0');
      expect(res.body.nodeVersion).toBeDefined();
    });
  });

  describe('GET /api/diagnostics', () => {
    it('should return live V8 and Node.js process telemetry', async () => {
      const res = await request(app).get('/api/diagnostics');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);

      const data = res.body.data;
      expect(data.nodeVersion).toBeDefined();
      expect(data.v8Version).toBeDefined();
      expect(data.pid).toBeGreaterThan(0);
      expect(data.uptimeSeconds).toBeGreaterThanOrEqual(0);

      // Memory inspection
      expect(data.memory.rss).toBeGreaterThan(0);
      expect(data.memory.heapTotal).toBeGreaterThan(0);
      expect(data.memory.heapUsed).toBeGreaterThan(0);
      expect(data.memory.heapUsedFormatted).toContain('MB');

      // CPU inspection
      expect(data.cpu.user).toBeGreaterThanOrEqual(0);
      expect(data.cpu.system).toBeGreaterThanOrEqual(0);
    });
  });

  describe('POST /api/sandbox/event-loop', () => {
    it('should simulate and sequence microtasks and macrotasks', async () => {
      const res = await request(app).post('/api/sandbox/event-loop');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);

      const { sequence, totalSteps, explanation } = res.body.data;
      expect(totalSteps).toBeGreaterThanOrEqual(4);
      expect(explanation).toContain('Microtasks');

      // Verify that Synchronous executed first
      const syncStep = sequence.find((s: any) => s.phase === 'sync');
      expect(syncStep).toBeDefined();
      expect(syncStep.order).toBe(1);

      // Verify nextTick and microtask existence
      const nextTickStep = sequence.find((s: any) => s.phase === 'nextTick');
      const microtaskStep = sequence.find((s: any) => s.phase === 'microtask');
      expect(nextTickStep).toBeDefined();
      expect(microtaskStep).toBeDefined();

      // Timers or check phase
      const timerOrCheck = sequence.filter((s: any) => s.phase === 'timer' || s.phase === 'check');
      expect(timerOrCheck.length).toBeGreaterThan(0);
    });
  });

  describe('POST /api/sandbox/stream-pipeline', () => {
    it('should execute stream pipeline and calculate throughput and backpressure metrics', async () => {
      const res = await request(app)
        .post('/api/sandbox/stream-pipeline')
        .send({ totalChunks: 30, chunkSizeKb: 8, highWaterMarkKb: 16 });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);

      const metrics = res.body.data;
      expect(metrics.chunksCount).toBe(30);
      expect(metrics.totalBytes).toBe(30 * 8 * 1024);
      expect(metrics.durationMs).toBeGreaterThan(0);
      expect(metrics.throughputMbSec).toBeGreaterThanOrEqual(0);
      expect(metrics.sampleOutput).toContain('Chunk#1');
    });

    it('should fallback to safe default parameters when input is empty', async () => {
      const res = await request(app)
        .post('/api/sandbox/stream-pipeline')
        .send({});

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.chunksCount).toBe(50);
    });
  });

  describe('POST /api/sandbox/worker-thread', () => {
    it('should calculate primes in a worker thread and report thread ID', async () => {
      const res = await request(app)
        .post('/api/sandbox/worker-thread')
        .send({ rangeMax: 5000, useWorkerThread: true });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);

      const result = res.body.data;
      expect(result.primesFound).toBeGreaterThan(0);
      expect(result.isMainThread).toBe(false);
      expect(result.threadId).toBeGreaterThanOrEqual(0);
      expect(result.durationMs).toBeGreaterThanOrEqual(0);
    });

    it('should compute primes on main thread when worker thread is disabled', async () => {
      const res = await request(app)
        .post('/api/sandbox/worker-thread')
        .send({ rangeMax: 5000, useWorkerThread: false });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);

      const result = res.body.data;
      expect(result.primesFound).toBeGreaterThan(0);
      expect(result.isMainThread).toBe(true);
      expect(result.threadId).toBe(0);
    });
  });

  describe('Direct Service Unit Tests', () => {
    it('simulateEventLoopExecution should guarantee sync code order is 1', async () => {
      const steps = await simulateEventLoopExecution();
      expect(steps[0].phase).toBe('sync');
      expect(steps[0].order).toBe(1);
      expect(steps.length).toBeGreaterThanOrEqual(4);
    });

    it('runStreamPipelineDemo should stream custom chunk buffers cleanly', async () => {
      const res = await runStreamPipelineDemo(10, 4, 16);
      expect(res.chunksCount).toBe(10);
      expect(res.totalBytes).toBe(40960);
      expect(res.sampleOutput).toBeDefined();
    });

    it('runCpuOffloadTask should compute prime counts up to 1000 accurately', async () => {
      // Primes under 1000 = 168
      const workerRes = await runCpuOffloadTask(1000, true);
      expect(workerRes.primesFound).toBe(168);
      expect(workerRes.isMainThread).toBe(false);

      const mainRes = await runCpuOffloadTask(1000, false);
      expect(mainRes.primesFound).toBe(168);
      expect(mainRes.isMainThread).toBe(true);
    });
  });
});
