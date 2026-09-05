import { Request, Response } from 'express';
import { simulateEventLoopExecution } from '../services/eventLoopService.js';
import { runStreamPipelineDemo } from '../services/streamService.js';
import { runCpuOffloadTask } from '../services/workerPoolService.js';

export async function runEventLoopSimulation(_req: Request, res: Response): Promise<void> {
  try {
    const sequence = await simulateEventLoopExecution();
    res.json({
      success: true,
      data: {
        totalSteps: sequence.length,
        sequence,
        explanation: 'Microtasks (process.nextTick, Promise.then) execute before any subsequent Libuv phase timers or check callbacks.'
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function runStreamSimulation(req: Request, res: Response): Promise<void> {
  try {
    const { totalChunks = 50, chunkSizeKb = 16, highWaterMarkKb = 32 } = req.body || {};
    const metrics = await runStreamPipelineDemo(
      Number(totalChunks) || 50,
      Number(chunkSizeKb) || 16,
      Number(highWaterMarkKb) || 32
    );
    res.json({
      success: true,
      data: metrics
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function runWorkerSimulation(req: Request, res: Response): Promise<void> {
  try {
    const { rangeMax = 150000, useWorkerThread = true } = req.body || {};
    const result = await runCpuOffloadTask(
      Number(rangeMax) || 150000,
      Boolean(useWorkerThread)
    );
    res.json({
      success: true,
      data: result
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}
