export interface MemoryStats {
  rss: number;
  rssFormatted: string;
  heapTotal: number;
  heapTotalFormatted: string;
  heapUsed: number;
  heapUsedFormatted: string;
  external: number;
  externalFormatted: string;
  arrayBuffers: number;
  arrayBuffersFormatted: string;
}

export interface CpuStats {
  user: number;
  system: number;
}

export interface RuntimeDiagnostics {
  nodeVersion: string;
  v8Version: string;
  platform: string;
  arch: string;
  pid: number;
  uptimeSeconds: number;
  memory: MemoryStats;
  cpu: CpuStats;
  activeHandles: number;
  activeRequests: number;
  timestamp: string;
}

export interface EventLoopSimulationStep {
  order: number;
  phase: 'sync' | 'nextTick' | 'microtask' | 'timer' | 'check' | 'io';
  name: string;
  description: string;
  executionTimestamp: number;
}

export interface StreamPipelineMetrics {
  totalBytes: number;
  chunksCount: number;
  backpressureCount: number;
  highWaterMarkBytes: number;
  durationMs: number;
  throughputMbSec: number;
  sampleOutput: string;
}

export interface WorkerOffloadResult {
  threadId: number;
  isMainThread: boolean;
  primesFound: number;
  durationMs: number;
  rangeMax: number;
}
