import { EventLoopSimulationStep } from '../types.js';

export async function simulateEventLoopExecution(): Promise<EventLoopSimulationStep[]> {
  const steps: EventLoopSimulationStep[] = [];
  let counter = 1;

  const start = performance.now();

  // 1. Synchronous execution
  steps.push({
    order: counter++,
    phase: 'sync',
    name: 'Call Stack Synchronous Code',
    description: 'Executes immediately on the V8 call stack before any async queues.',
    executionTimestamp: performance.now() - start
  });

  return new Promise((resolve) => {
    // Macrotask: Timers Phase
    setTimeout(() => {
      steps.push({
        order: counter++,
        phase: 'timer',
        name: 'setTimeout(0) (Timers Phase)',
        description: 'Libuv Timers Phase processes expired min-heap timers.',
        executionTimestamp: performance.now() - start
      });

      // Once setImmediate fires, we resolve
    }, 0);

    // Macrotask: Check Phase
    setImmediate(() => {
      steps.push({
        order: counter++,
        phase: 'check',
        name: 'setImmediate (Check Phase)',
        description: 'Libuv Check Phase executes callbacks immediately after Poll I/O cycle.',
        executionTimestamp: performance.now() - start
      });

      // Small delay to ensure all async callbacks have flushed
      setTimeout(() => {
        resolve(steps);
      }, 5);
    });

    // Microtask: process.nextTick Queue
    process.nextTick(() => {
      steps.push({
        order: counter++,
        phase: 'nextTick',
        name: 'process.nextTick Queue',
        description: 'Highest priority microtask queue: processed immediately after current call stack, before other microtasks.',
        executionTimestamp: performance.now() - start
      });
    });

    // Microtask: Promise Microtask Queue
    Promise.resolve().then(() => {
      steps.push({
        order: counter++,
        phase: 'microtask',
        name: 'Promise.then / queueMicrotask',
        description: 'Standard V8 microtask queue: drained after nextTick queue before yielding to Libuv phases.',
        executionTimestamp: performance.now() - start
      });
    });
  });
}
