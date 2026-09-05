import { Request, Response } from 'express';
import { RuntimeDiagnostics, MemoryStats } from '../types.js';

function formatBytes(bytes: number): string {
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(2)} MB`;
}

export function getRuntimeDiagnostics(_req: Request, res: Response): void {
  const mem = process.memoryUsage();
  const cpu = process.cpuUsage();

  const memoryFormatted: MemoryStats = {
    rss: mem.rss,
    rssFormatted: formatBytes(mem.rss),
    heapTotal: mem.heapTotal,
    heapTotalFormatted: formatBytes(mem.heapTotal),
    heapUsed: mem.heapUsed,
    heapUsedFormatted: formatBytes(mem.heapUsed),
    external: mem.external,
    externalFormatted: formatBytes(mem.external),
    arrayBuffers: mem.arrayBuffers || 0,
    arrayBuffersFormatted: formatBytes(mem.arrayBuffers || 0)
  };

  // Safe fallback for process._getActiveHandles / _getActiveRequests
  const activeHandles = typeof (process as any)._getActiveHandles === 'function'
    ? (process as any)._getActiveHandles().length
    : 0;

  const activeRequests = typeof (process as any)._getActiveRequests === 'function'
    ? (process as any)._getActiveRequests().length
    : 0;

  const diagnostics: RuntimeDiagnostics = {
    nodeVersion: process.version,
    v8Version: process.versions.v8,
    platform: process.platform,
    arch: process.arch,
    pid: process.pid,
    uptimeSeconds: parseFloat(process.uptime().toFixed(2)),
    memory: memoryFormatted,
    cpu: {
      user: cpu.user,
      system: cpu.system
    },
    activeHandles,
    activeRequests,
    timestamp: new Date().toISOString()
  };

  res.json({
    success: true,
    data: diagnostics
  });
}
