import { Readable, Transform, Writable, pipeline } from 'node:stream';
import { promisify } from 'node:util';
import { StreamPipelineMetrics } from '../types.js';

const pipelineAsync = promisify(pipeline);

export async function runStreamPipelineDemo(
  totalChunks: number = 50,
  chunkSizeKb: number = 16,
  highWaterMarkKb: number = 32
): Promise<StreamPipelineMetrics> {
  const startTime = performance.now();
  let totalBytes = 0;
  let backpressureCount = 0;
  let chunksProcessed = 0;
  let sampleOutput = '';

  const highWaterMarkBytes = highWaterMarkKb * 1024;
  const chunkData = Buffer.alloc(chunkSizeKb * 1024, 'A');

  // 1. Source Readable Stream
  const source = new Readable({
    highWaterMark: highWaterMarkBytes,
    read() {
      if (chunksProcessed < totalChunks) {
        chunksProcessed++;
        totalBytes += chunkData.length;
        this.push(chunkData);
      } else {
        this.push(null); // End of stream
      }
    }
  });

  // 2. Transform Stream: Computes running summary and decorates payload
  const transformer = new Transform({
    highWaterMark: highWaterMarkBytes,
    transform(chunk: Buffer, _encoding, callback) {
      // Sample first 100 bytes for display
      if (!sampleOutput && chunk.length > 0) {
        sampleOutput = `[Chunk#1 Size: ${chunk.length} bytes, Preview: ${chunk.toString('utf-8', 0, 32)}...]`;
      }
      callback(null, chunk);
    }
  });

  // 3. Destination Writable Stream with artificial consumer delay to trigger backpressure
  const destination = new Writable({
    highWaterMark: highWaterMarkBytes,
    write(_chunk, _encoding, callback) {
      // Simulate asynchronous consumption (I/O or network write)
      setImmediate(() => {
        callback();
      });
    }
  });

  // Track drain events (signals recovery from backpressure)
  destination.on('drain', () => {
    backpressureCount++;
  });

  await pipelineAsync(source, transformer, destination);

  const durationMs = Math.max(performance.now() - startTime, 1);
  const totalMb = totalBytes / (1024 * 1024);
  const throughputMbSec = (totalMb / (durationMs / 1000));

  return {
    totalBytes,
    chunksCount: chunksProcessed,
    backpressureCount,
    highWaterMarkBytes,
    durationMs: parseFloat(durationMs.toFixed(2)),
    throughputMbSec: parseFloat(throughputMbSec.toFixed(2)),
    sampleOutput
  };
}
