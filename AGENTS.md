# Agent Guidelines - learn-nodejs

## Repository Overview
`learn-nodejs` is a production-grade enterprise educational repository and interactive runtime sandbox showcasing Node.js 20/22 LTS, V8 engine internals, Libuv asynchronous I/O, event loop mechanics, streams with backpressure, and worker threads.

## Architecture
- **Language**: TypeScript 5.7+ with strict mode and NodeNext ESM module resolution.
- **Server**: Express 5.0+ with RESTful endpoints and static asset serving.
- **Testing**: Vitest with `supertest`. All tests must execute 100% offline and in-memory without external infrastructure dependencies.
- **UI**: Interactive dark-mode dashboard in `public/index.html` communicating with backend diagnostic and sandbox APIs.

## Commands
- `npm run dev`: Start development server with live reload (`tsx watch src/server.ts`).
- `npm test`: Run complete Vitest test suite.
- `npm run build`: Compile TypeScript into `dist/`.
- `npm start`: Run compiled production application.

## Engineering Standards
- Keep functions modular, strongly typed, and decoupled from framework controllers.
- Guarantee proper resource cleanup on streams, timers, and worker threads.
- Never block the main event loop with long-running synchronous code in request handlers.
