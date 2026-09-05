import { Worker, isMainThread, parentPort, workerData, threadId } from 'node:worker_threads';
import { WorkerOffloadResult } from '../types.js';

function countPrimes(max: number): number {
  let count = 0;
  for (let i = 2; i <= max; i++) {
    let isPrime = true;
    for (let j = 2; j * j <= i; j++) {
      if (i % j === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) count++;
  }
  return count;
}

export async function runCpuOffloadTask(
  rangeMax: number = 200000,
  useWorkerThread: boolean = true
): Promise<WorkerOffloadResult> {
  const startTime = performance.now();

  if (!useWorkerThread) {
    // Run synchronously on Main Thread (blocks event loop)
    const primes = countPrimes(rangeMax);
    const durationMs = performance.now() - startTime;
    return {
      threadId: 0,
      isMainThread: true,
      primesFound: primes,
      durationMs: parseFloat(durationMs.toFixed(2)),
      rangeMax
    };
  }

  // Run in dedicated Worker Thread (zero main-thread blocking)
  return new Promise((resolve, reject) => {
    const workerScript = `
      const { parentPort, workerData, threadId } = require('node:worker_threads');
      function countPrimes(max) {
        let count = 0;
        for (let i = 2; i <= max; i++) {
          let isPrime = true;
          for (let j = 2; j * j <= i; j++) {
            if (i % j === 0) { isPrime = false; break; }
          }
          if (isPrime) count++;
        }
        return count;
      }
      const count = countPrimes(workerData.max);
      parentPort.postMessage({ primesFound: count, threadId });
    `;

    const worker = new Worker(workerScript, {
      eval: true,
      workerData: { max: rangeMax }
    });

    worker.on('message', (data: { primesFound: number; threadId: number }) => {
      const durationMs = performance.now() - startTime;
      resolve({
        threadId: data.threadId,
        isMainThread: false,
        primesFound: data.primesFound,
        durationMs: parseFloat(durationMs.toFixed(2)),
        rangeMax
      });
    });

    worker.on('error', (err) => {
      reject(err);
    });

    worker.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });
  });
}
