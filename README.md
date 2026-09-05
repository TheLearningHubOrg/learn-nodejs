# Learn Node.js: The Complete Beginner-to-Expert Masterclass

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-20.x%20%7C%2022.x%20LTS-339933?logo=nodedotjs)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7+-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![V8](https://img.shields.io/badge/V8-JIT%20Engine-4285F4?logo=googlechrome)](https://v8.dev/)
[![Libuv](https://img.shields.io/badge/Libuv-Event%20Loop-FF6F00)](https://libuv.org/)
[![Express](https://img.shields.io/badge/Express-5.0+-000000?logo=express)](https://expressjs.com/)
[![Vitest](https://img.shields.io/badge/Vitest-3.x-6E9F18?logo=vitest)](https://vitest.dev/)
[![Docker](https://img.shields.io/badge/Docker-Multi--Stage-2496ED?logo=docker)](https://www.docker.com/)

A definitive, production-grade **beginner-to-expert technical guide** and interactive runtime sandbox for **Node.js 20 & 22 LTS**. This curriculum starts with zero-prerequisite JavaScript runtime fundamentals, core modules, and npm management, advances through asynchronous event-driven architecture, dives deep into V8 JIT compilation and Libuv event loop phases, explores zero-copy streaming and backpressure, and culminates in multi-core clustering, worker threads, and memory profiling.

---

## Pedagogical Roadmap: Beginner to Expert

```text
+-----------------------------------------------------------------------------------------------+
|                                 THE NODE.JS LEARNING JOURNEY                                  |
+-------------------+-------------------+-----------------------+-------------------------------+
| STAGE 1           | STAGE 2 & 3       | STAGE 4 & 5           | STAGE 6 & 7                   |
| Absolute Beginner | Intermediate Core | Advanced Internals    | Expert Scaling & Staff Arch   |
+-------------------+-------------------+-----------------------+-------------------------------+
| • What is Node?   | • Runtime Layer   | • Streams & Buffers   | • Cluster & Multi-Core        |
| • CommonJS vs ESM | • V8 JIT Pipeline | • Backpressure Drain  | • Worker Threads & Atomics    |
| • Core (fs, http) | • Ignition/Turbo  | • Off-Heap Allocation | • Heap Profiling & Leaks      |
| • npm & SemVer    | • Libuv 6 Phases  | • Prototype Pollution | • 40 Staff Interview Q&A      |
| • async / await   | • Micro/Macrotask | • ReDoS & Hardening   | • Interactive Sandbox & API   |
+-------------------+-------------------+-----------------------+-------------------------------+
```

---

## Table of Contents

1. [Stage 1: Absolute Beginner Foundations](#1-stage-1-absolute-beginner-foundations)
   - [What is Node.js? JavaScript Beyond the Browser](#what-is-nodejs-javascript-beyond-the-browser)
   - [Installing Node.js & Running Your First Program](#installing-nodejs--running-your-first-program)
   - [Module Systems: CommonJS (`require`) vs ES Modules (`import`)](#module-systems-commonjs-require-vs-es-modules-import)
   - [Core Built-in Modules: `fs`, `path`, and `os`](#core-built-in-modules-fs-path-and-os)
   - [Creating a Native HTTP Web Server (`node:http`)](#creating-a-native-http-web-server-nodehttp)
   - [The Node Package Manager (npm) & `package.json`](#the-node-package-manager-npm--packagejson)
   - [Asynchronous JavaScript: Callbacks, Promises & `async/await`](#asynchronous-javascript-callbacks-promises--asyncawait)
2. [Stage 2: Intermediate Runtime Architecture & Topology](#2-stage-2-intermediate-runtime-architecture--topology)
   - [The Node.js System Architecture Layer](#the-nodejs-system-architecture-layer)
   - [Node-API & C++ Addon Bindings Interface](#node-api--c-addon-bindings-interface)
   - [Thread Model: Single Threaded vs OS Multi-threading](#thread-model-single-threaded-vs-os-multi-threading)
3. [Stage 3: V8 Engine & Libuv Event Loop Internals](#3-stage-3-v8-engine--libuv-event-loop-internals)
   - [V8 Pipeline: Ignition, Sparkplug, Maglev & TurboFan](#v8-pipeline-ignition-sparkplug-maglev--turbofan)
   - [Hidden Classes (Shapes) & Inline Caching (IC)](#hidden-classes-shapes--inline-caching-ic)
   - [The 6 Phases of the Event Loop](#the-6-phases-of-the-event-loop)
   - [Libuv Thread Pool Mechanics (`UV_THREADPOOL_SIZE`)](#libuv-thread-pool-mechanics-uv_threadpool_size)
   - [Microtask Queues: `process.nextTick` vs `Promise.then`](#microtask-queues-processnexttick-vs-promisethen)
4. [Stage 4: Advanced Streams, Buffers & Memory Mechanics](#4-stage-4-advanced-streams-buffers--memory-mechanics)
   - [Buffer Allocation: `Buffer.alloc` vs `Buffer.allocUnsafe`](#buffer-allocation-bufferalloc-vs-bufferallocunsafe)
   - [The 4 Stream Paradigms: Readable, Writable, Duplex & Transform](#the-4-stream-paradigms-readable-writable-duplex--transform)
   - [Backpressure Protocol: `highWaterMark` & Drain Semantics](#backpressure-protocol-highwatermark--drain-semantics)
   - [Zero-Copy Streaming & `pipeline` Composition](#zero-copy-streaming--pipeline-composition)
5. [Stage 5: Multi-Core Scaling & Enterprise Security](#5-stage-5-multi-core-scaling--enterprise-security)
   - [Cluster Module & Process-Level Scalability](#cluster-module--process-level-scalability)
   - [Worker Threads: Isolates, `MessagePort` & `SharedArrayBuffer`](#worker-threads-isolates-messageport--sharedarraybuffer)
   - [Child Processes: `spawn` vs `fork` vs `exec`](#child-processes-spawn-vs-fork-vs-exec)
   - [Enterprise Security: Prototype Pollution, ReDoS & Timing Attacks](#enterprise-security-prototype-pollution-redos--timing-attacks)
6. [Stage 6: Diagnostics, Profiling & 40 Staff Interview Questions](#6-stage-6-diagnostics-profiling--40-staff-interview-questions)
7. [Stage 7: Interactive Sandbox & Platform Reference](#7-stage-7-interactive-sandbox--platform-reference)

---

## 1. Stage 1: Absolute Beginner Foundations

### What is Node.js? JavaScript Beyond the Browser

Historically, JavaScript ran exclusively inside client web browsers (Google Chrome, Mozilla Firefox, Apple Safari) to manipulate DOM elements. In 2009, Ryan Dahl created **Node.js** by taking Google Chrome's open-source **V8 JavaScript engine**, combining it with a C-based asynchronous event-driven system library called **Libuv**, and enabling JavaScript to run directly on server operating systems.

```text
+-------------------------------------------------------------------------------+
| TRADITIONAL MULTITHREADED SERVER (Apache/Tomcat)                              |
| Request 1 ──▶ Thread 1 (Allocates 2-8 MB RAM stack) ──▶ Blocks on DB Query    |
| Request 2 ──▶ Thread 2 (Allocates 2-8 MB RAM stack) ──▶ Blocks on File Read   |
| Request N ──▶ Out of Memory / Thread Pool Starvation                          |
+-------------------------------------------------------------------------------+
| NODE.JS EVENT-DRIVEN ARCHITECTURE (Single Execution Thread + Event Loop)      |
| Request 1 ──┐                                                                 |
| Request 2 ──┼─▶ Event Queue ──▶ Main Thread ──▶ Delegates slow I/O to OS Kernel |
| Request N ──┘                                      (Handles 100,000+ requests)|
+-------------------------------------------------------------------------------+
```

Node.js provides three revolutionary advantages:
1. **Event-Driven & Non-Blocking I/O**: Instead of blocking execution while reading a file from disk or querying a database, Node.js offloads the operation to the operating system kernel and processes subsequent user requests immediately. When the I/O operation completes, an event callback is pushed to the event loop.
2. **Extreme JIT Compilation Speed**: V8 compiles high-level JavaScript source directly into native machine CPU instructions at runtime.
3. **Full-Stack JavaScript/TypeScript**: Eliminates the cognitive burden of switching languages between frontend (React/Vue/Angular) and backend (Python/Java/PHP).

---

### Installing Node.js & Running Your First Program

Verify that Node.js and its package manager (`npm`) are installed on your machine:

```bash
node -v   # Output: v22.14.0 (Recommended LTS version)
npm -v    # Output: 10.9.2
```

Create a file named `app.js`:

```javascript
// app.js
const appTitle = "Node.js Enterprise Server";
const serverStartTime = new Date();

console.log(`Starting ${appTitle}...`);
console.log("Current working directory:", process.cwd());
console.log("Host OS platform:", process.platform, "| Architecture:", process.arch);
console.log("V8 Engine version:", process.versions.v8);
```

Execute your script in the terminal:

```bash
node app.js
```

#### Deep-Dive Line-by-Line Explanation:
1. `const appTitle = "Node.js Enterprise Server"`:
   - Declares an immutable identifier bound to a string primitive in memory.
2. `process.cwd()`:
   - The global `process` object provides programmatic access to the current Node.js execution environment. `.cwd()` returns the absolute path from which the process was launched.
3. `process.platform`, `process.arch`:
   - Returns operating system identifiers (e.g. `'win32'`, `'linux'`, `'darwin'`) and CPU architectures (`'x64'`, `'arm64'`), essential for cross-platform utility scripts.

---

### Module Systems: CommonJS (`require`) vs ES Modules (`import`)

Node.js supports two distinct module architectures:

#### 1. CommonJS (CJS) - The Historic Standard
CommonJS modules are evaluated **synchronously** at runtime using `require()`:

```javascript
// math.js
function add(a, b) {
  return a + b;
}
// Exporting an object containing the function
module.exports = { add };

// main.js
const { add } = require("./math.js");
console.log("Sum:", add(10, 25)); // Sum: 35
```

#### 2. ES Modules (ESM) - The Modern ECMAScript Standard
Activated by adding `"type": "module"` inside your `package.json` or naming files with `.mjs`. Modules are parsed and evaluated asynchronously in three phases:

```javascript
// math.mjs
export function multiply(a, b) {
  return a * b;
}

// main.mjs
import { multiply } from "./math.mjs";
console.log("Product:", multiply(4, 5)); // Product: 20
```

#### Architectural Differences:
- **`require()` is dynamic**: You can place `require()` inside `if` statements or loops. `import` statements are static and hoisted to the top of the file, allowing V8 to optimize dependencies and tree-shake unused code during build bundling.
- **Top-Level `await`**: Supported natively in ES Modules without wrapping code inside an `async function main() { ... }`.

---

### Core Built-in Modules: `fs`, `path`, and `os`

Node.js includes powerful standard modules without requiring any third-party npm packages:

#### 1. File System Operations (`node:fs/promises`)
```javascript
import fs from "node:fs/promises";
import path from "node:path";

async function executeFileOps() {
  const filePath = path.join(process.cwd(), "audit.log");
  
  // 1. Write data asynchronously (offloaded to Libuv thread pool)
  await fs.writeFile(filePath, "System boot: " + new Date().toISOString() + "\n", "utf-8");
  
  // 2. Append additional records
  await fs.appendFile(filePath, "Healthcheck status: OK\n", "utf-8");
  
  // 3. Read data back into memory
  const logContent = await fs.readFile(filePath, "utf-8");
  console.log("Audit log contents:\n" + logContent);
}

executeFileOps();
```

#### Deep-Dive Explanation:
- Using `node:fs/promises` guarantees that disk reads and writes never block the JavaScript main thread. Under the hood, Libuv schedules file read/write system calls on its background C thread pool (`UV_THREADPOOL_SIZE`), resolving a JavaScript Promise once the OS disk controller completes the transfer.

#### 2. Cross-Platform Path Normalization (`node:path`)
Never concatenate file paths using raw strings like `"folder/" + filename`. Windows uses backslashes (`\`), whereas Linux and macOS use forward slashes (`/`). `path.join()` detects the host OS and formats separators automatically:

```javascript
import path from "node:path";

const configPath = path.join(process.cwd(), "config", "database.json");
console.log("Normalized Path:", configPath);
console.log("File Extension:", path.extname(configPath)); // Output: .json
console.log("Base File Name:", path.basename(configPath)); // Output: database.json
```

---

### Creating a Native HTTP Web Server (`node:http`)

You can launch a high-throughput HTTP server with zero external libraries:

```javascript
import http from "node:http";

// 1. Instantiate HTTP server instance with request listener callback
const server = http.createServer((req, res) => {
  const { method, url } = req;
  
  // Handle Healthcheck Endpoint
  if (url === "/health" && method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ 
      status: "healthy", 
      uptime_seconds: process.uptime(),
      memory_usage_mb: Math.round(process.memoryUsage().heapUsed / 1024 / 1024)
    }));
  }

  // Handle Root Landing Page
  if (url === "/" && method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });
    return res.end("<h1>Node.js Enterprise Web Platform</h1><p>Running natively.</p>");
  }

  // 404 Fallback
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Endpoint Not Found" }));
});

// 2. Bind TCP listener to port 3000
const PORT = 3000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server actively accepting connections at http://localhost:${PORT}`);
});
```

#### Exhaustive Line-by-Line Explanation:
1. `http.createServer((req, res) => { ... })`:
   - Instructs Libuv to create a TCP socket and register an OS event listener (`epoll`/`kqueue`/`IOCP`).
   - `req` (`http.IncomingMessage`): A readable stream containing HTTP request method, URL, headers, and incoming payload chunks.
   - `res` (`http.ServerResponse`): A writable stream used to send HTTP status codes, response headers, and serialized body bytes back to the client.
2. `res.writeHead(200, { "Content-Type": "application/json" })`:
   - Writes the HTTP status code (200 OK) and sends the HTTP response headers over the TCP socket immediately.
3. `res.end(JSON.stringify(...))`:
   - Flushes the final data payload and signals to the client that the HTTP message has finished transmitting (closing the connection or keeping it alive for HTTP/1.1 pipelining).

---

### The Node Package Manager (npm) & `package.json`

Every production Node.js project is structured around a `package.json` manifest:

```json
{
  "name": "enterprise-node-service",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node src/index.js",
    "dev": "node --watch src/index.js",
    "test": "vitest run"
  },
  "dependencies": {
    "express": "^5.0.1"
  },
  "devDependencies": {
    "vitest": "^3.0.0",
    "typescript": "^5.7.0"
  }
}
```

#### Essential Commands & SemVer Cheatsheet:
- **`npm init -y`**: Generates a default `package.json` non-interactively.
- **`npm install <package>`**: Downloads the library into `node_modules` and records it under `dependencies`.
- **`npm install -D <package>`**: Records the library under `devDependencies` (testing, compilers).
- **`node --watch <file>`**: Modern built-in hot-reloader (Node 18+) that restarts your server automatically whenever you save code edits.
- **Semantic Versioning (SemVer: `MAJOR.MINOR.PATCH`)**:
  - `^5.0.1` (Caret): Automatically upgrades minor and patch versions (`>= 5.0.1 < 6.0.0`).
  - `~5.0.1` (Tilde): Only upgrades patch bug fixes (`>= 5.0.1 < 5.1.0`).

---

### Asynchronous JavaScript: Callbacks, Promises & `async/await`

Because Node.js runs JavaScript on a single thread, **you must never use synchronous blocking operations** (e.g. `fs.readFileSync`) in request handlers:

```javascript
// 1. Simulating an asynchronous database query returning a Promise
function queryUserFromDatabase(userId) {
  return new Promise((resolve, reject) => {
    // Non-blocking timer simulated via Libuv timers phase
    setTimeout(() => {
      if (userId <= 0) {
        return reject(new Error("Invalid User ID"));
      }
      resolve({ id: userId, name: "Alice Smith", role: "DevOps Architect" });
    }, 100);
  });
}

// 2. Consuming with modern async / await and structured try/catch
async function handleUserRequest(userId) {
  try {
    console.log("Querying database in background...");
    const user = await queryUserFromDatabase(userId);
    console.log("Successfully fetched user:", user.name);
    return user;
  } catch (error) {
    console.error("Database query failed:", error.message);
    throw error;
  }
}

handleUserRequest(101);
```

---

## 2. Stage 2: Intermediate Runtime Architecture & Topology

---

### The Node.js System Architecture Layer

Node.js is not a programming language or an isolated framework; it is a cross-platform runtime environment built upon **Google's V8 JavaScript Engine** and **Libuv**:

```
+-------------------------------------------------------------------------+
|                         APPLICATION LAYER (JAVASCRIPT / TS)             |
|                  Your Business Code, Express, Fastify, NestJS           |
+-------------------------------------------------------------------------+
                                     |
                                     v
+-------------------------------------------------------------------------+
|                         NODE.JS STANDARD LIBRARY (CORE API)             |
|              fs, http, net, stream, crypto, path, worker_threads        |
+-------------------------------------------------------------------------+
                                     |
                                     v
+-------------------------------------------------------------------------+
|                         NODE.JS BINDINGS & NODE-API (C++)               |
|      Glue code wrapping V8 and native C/C++ libraries into JS objects    |
+-------------------------------------------------------------------------+
                    |                                  |
                    v                                  v
+-----------------------------------+  +----------------------------------+
|          V8 JIT ENGINE            |  |             LIBUV                |
|  - ECMAScript Parser & AST        |  |  - Non-Blocking Event Loop       |
|  - Ignition (Bytecode Interpreter)|  |  - OS Event Demultiplexer        |
|  - Sparkplug & Maglev Compilers   |  |    (epoll, kqueue, IOCP)         |
|  - TurboFan (Optimizing JIT)      |  |  - Thread Pool (Async File I/O,  |
|  - Orinoco Garbage Collector      |  |    DNS, Crypto, Zlib)            |
+-----------------------------------+  +----------------------------------+
                    |                                  |
                    +----------------+-----------------+
                                     |
                                     v
+-------------------------------------------------------------------------+
|                       SUPPORTING NATIVE LIBRARIES                       |
|   - OpenSSL: TLS/SSL & Cryptography  - zlib: Deflate / Compression      |
|   - llhttp: Ultra-fast HTTP Parser   - c-ares: Asynchronous DNS Queries |
+-------------------------------------------------------------------------+
                                     |
                                     v
+-------------------------------------------------------------------------+
|                       OPERATING SYSTEM KERNEL                           |
|       (Sockets, File Descriptors, Epoll, Kqueue, IOCP, System Threads)  |
+-------------------------------------------------------------------------+
```

---

## 3. Stage 3: V8 Engine & Libuv Event Loop Internals

### V8 Engine Deep Dive

### V8 Pipeline: Ignition, Sparkplug, Maglev & TurboFan

V8 executes JavaScript through a multi-tier compilation pipeline designed to balance instantaneous startup latency with long-term execution throughput:

```
                          JavaScript Source Code
                                    |
                                    v
                           [ Parser / Lexer ]
                                    |
                                    v
                        [ Abstract Syntax Tree (AST) ]
                                    |
                                    v
                    [ Ignition (Bytecode Interpreter) ]
                                    |
            +-----------------------+-----------------------+
            | (Fast startup, gathers type feedback)          |
            v                                               v
  [ Sparkplug Compiler ]                          [ Type Feedback Vector ]
  (Fast non-optimizing 1:1 bytecode compilation)             |
                                                            v
                                                  [ Maglev Compiler ]
                                                  (Mid-tier optimizing JIT)
                                                            |
                                                            v
                                                  [ TurboFan Compiler ]
                                                  (Aggressive speculative JIT)
                                                            |
                                              Deoptimization Bailout?
                                              (Type feedback violated)
                                                            |
                                                            v
                                                  Revert to Ignition
```

1. **Ignition (Bytecode Interpreter)**:
   - Rapidly translates AST into concise bytecode.
   - Lowers memory footprint significantly compared to compiling directly to native machine code.
   - Gathers execution profile data and runtime type feedback (e.g. types passed to functions).
2. **Sparkplug (Baseline Compiler)**:
   - Compiles bytecode directly to native machine code in a single linear pass without optimization.
   - Accelerates execution speed by 2x–3x without paying the compilation latency cost of TurboFan.
3. **Maglev (Mid-Tier Compiler - Node.js 20+)**:
   - Balances fast compilation with good code generation speed, bridging the performance gap between Sparkplug and TurboFan.
4. **TurboFan (Optimizing Compiler)**:
   - Uses the type feedback vector collected by Ignition to make aggressive speculative optimizations (function inlining, loop unrolling, dead code elimination, escape analysis).
   - If a function is called with unexpected argument types (e.g. string passed to an integer addition function), TurboFan triggers a **Deoptimization Bailout**, ejecting the optimized machine code and reverting to Ignition bytecode execution.

---

### Hidden Classes (Shapes) & Inline Caching (IC)

Because JavaScript is dynamically typed, object properties are not at fixed memory offsets. To achieve C++-like struct access speeds, V8 creates internal **Hidden Classes (Shapes)**:

```
Object A: { x: 1, y: 2 }              Object B: { x: 5, y: 10 }
        |                                     |
        v                                     v
   [ Map C0 ] (Empty Object)             [ Map C0 ] (Empty Object)
        | Add property 'x'                    | Add property 'x'
        v                                     v
   [ Map C1 ] (offset 0: 'x')            [ Map C1 ] (offset 0: 'x')
        | Add property 'y'                    | Add property 'y'
        v                                     v
   [ Map C2 ] (offset 0: 'x', offset 1: 'y')  [ Map C2 ] (Same Shape Shared!)
```

#### Inline Caching Call Sites
V8 tracks call sites accessing properties:
- **Monomorphic**: Accesses objects sharing the exact same Hidden Class (`obj.x`). V8 compiles property access down to a single pointer dereference with zero hash table lookup.
- **Polymorphic**: Handles 2 to 4 different shapes. Implements a fast switch-case branch.
- **Megamorphic**: Handles 5+ distinct shapes. Falls back to slow dictionary hash-table lookups.

> [!TIP]
> **Performance Rule**: Always initialize object properties in the exact same order in constructor functions to prevent shape transitions and avoid megamorphic deoptimizations!

---

### V8 Memory Heap Architecture

```
+-------------------------------------------------------------------------+
|                             TOTAL RESIDENT SET (RSS)                    |
|                                                                         |
|  +-------------------------------------------------------------------+  |
|  |                            V8 HEAP MEMORY                         |  |
|  |                                                                   |  |
|  |  +---------------------------+  +-------------------------------+ |  |
|  |  |         NEW SPACE         |  |           OLD SPACE           | |  |
|  |  |  (1MB - 64MB, Semi-Spaces)|  |  - Old Pointer Space          | |  |
|  |  |  [From-Space] [To-Space]  |  |  - Old Data Space             | |  |
|  |  +---------------------------+  +-------------------------------+ |  |
|  |                                                                   |  |
|  |  +---------------------------+  +-------------------------------+ |  |
|  |  |    Large Object Space     |  |          Code Space           | |  |
|  |  |  (Objects exceeding page) |  |   (Compiled JIT machine code) | |  |
|  |  +---------------------------+  +-------------------------------+ |  |
|  +-------------------------------------------------------------------+  |
|                                                                         |
|  +------------------------------------+  +---------------------------+  |
|  |          Node.js Buffers           |  |     C++ Native Memory     |  |
|  |   (Off-heap raw memory slices)     |  | (Libuv handles, OpenSSL)  |  |
|  +------------------------------------+  +---------------------------+  |
+-------------------------------------------------------------------------+
```

1. **New Space (Young Generation)**:
   - Sized between 1MB and 64MB (`--min-semi-space-size`, `--max-semi-space-size`).
   - Divided into two contiguous buffers: **From-Space** and **To-Space**.
   - Most allocated objects die young (Generational Hypothesis).
2. **Old Space (Old Generation)**:
   - Contains long-lived objects promoted (tenured) after surviving two Scavenge GC cycles.
   - Sized up to `--max-old-space-size` (default ~2GB on 64-bit systems).
3. **Large Object Space**:
   - Objects that exceed the allocation page threshold are allocated directly here and never moved by garbage collection.

---

### Garbage Collection: Orinoco, Scavenger & Major Mark-Sweep-Compact

V8 employs two distinct garbage collectors:
1. **Minor GC (Scavenger - Cheney's Copying Algorithm)**:
   - Operates strictly on New Space.
   - Halts execution briefly; copies all surviving live objects from **From-Space** into **To-Space** contiguously (compacting them automatically).
   - Swaps From-Space and To-Space roles.
   - Objects surviving two scavenge passes are promoted to **Old Space**.
2. **Major GC (Mark-Sweep-Compact - Orinoco Engine)**:
   - Operates on Old Space when memory approaches threshold.
   - **Marking**: Identifies reachable objects via root set traversal (Concurrent & Incremental marking to eliminate large stop-the-world pauses).
   - **Sweeping**: Frees memory slots occupied by dead objects and adds them to free lists.
   - **Compacting**: Slides surviving objects together to eliminate external heap fragmentation.

---

### Libuv & The Event Loop Internals

### OS Demultiplexing: epoll, kqueue & IOCP

Node.js delegates non-blocking network socket and file descriptor monitoring to the operating system's native event demultiplexer:
- **Linux**: `epoll` (edge-triggered / level-triggered event notification).
- **macOS / BSD**: `kqueue` (scalable event notification).
- **Windows**: `IOCP` (Input/Output Completion Ports).

Instead of spawning a dedicated thread per connection (like Apache HTTP Server or traditional multi-threaded servers), Node.js registers interest in file descriptors with Libuv. When network packets arrive or sockets become writable, the OS wakes up Libuv's event loop with zero polling CPU burn.

---

### The 6 Phases of the Event Loop

The Libuv event loop progresses through six distinct phases in each iteration ("tick"):

```
   +-----------------------+
+->|        timers         |  setTimeout(), setInterval()
|  +-----------------------+
|              |
|  +-----------------------+
|  |   pending callbacks   |  Deferred system I/O callbacks (TCP errors, etc.)
|  +-----------------------+
|              |
|  +-----------------------+
|  |     idle, prepare     |  Internal Libuv housekeeping
|  +-----------------------+
|              |
|  +-----------------------+
|  |         poll          |  Retrieves new I/O events; executes I/O callbacks;
|  +-----------------------+  blocks here if no other work is scheduled
|              |
|  +-----------------------+
|  |        check          |  setImmediate() callbacks execute here
|  +-----------------------+
|              |
|  +-----------------------+
+--|    close callbacks    |  socket.on('close', ...), handle destruction
   +-----------------------+
```

1. **Timers Phase**:
   - Executes callbacks scheduled by `setTimeout()` and `setInterval()`.
   - Timers are stored in a min-heap priority queue sorted by expiration timestamp. The event loop checks the head of the heap; if expired, it executes the callback; otherwise it moves to the next phase.
2. **Pending Callbacks Phase**:
   - Executes I/O callbacks deferred from the previous loop iteration (e.g. certain system errors like `ECONNREFUSED` reported by operating systems).
3. **Idle, Prepare Phase**:
   - Used strictly for internal Libuv engine preparation before polling for I/O.
4. **Poll Phase**:
   - Calculates how long it should block and poll for I/O events.
   - Executes callbacks for all I/O events that have completed (network packets, incoming HTTP requests, database socket responses).
   - If the poll queue is empty:
     - If `setImmediate()` callbacks are waiting, the poll phase ends immediately to advance to the **Check** phase.
     - If no `setImmediate()` is waiting, the loop blocks waiting for I/O until the nearest timer expires.
5. **Check Phase**:
   - Dedicated phase exclusively for callbacks scheduled via `setImmediate()`.
   - Allows scripts to execute logic immediately after the poll phase finishes processing I/O.
6. **Close Callbacks Phase**:
   - Handles sudden socket or handle terminations (e.g. `socket.destroy()` or `socket.on('close')`), releasing underlying file descriptors.

---

### Libuv Thread Pool Mechanics (UV_THREADPOOL_SIZE)

Not all operations in modern operating systems are non-blocking! Specifically:
- **File System Operations**: Most OS filesystems (POSIX `read`, `write`, `stat`) do not support true asynchronous non-blocking I/O across all scenarios.
- **DNS Resolution**: `dns.lookup()` invokes the synchronous C-library `getaddrinfo(3)`.
- **CPU-Intensive Crypto**: `crypto.pbkdf2()`, `crypto.scrypt()`, password hashing, RSA key generation.
- **Compression**: `zlib` deflate/inflate algorithms.

To prevent these blocking operations from freezing the single JavaScript event loop thread, Libuv offloads them to an internal worker **Thread Pool**:

```
+-------------------------------------------------------------------------+
|                        JAVASCRIPT MAIN THREAD                           |
|       (Executes V8 code, triggers fs.readFile / crypto.pbkdf2)          |
+-------------------------------------------------------------------------+
                                     |
                                     v
+-------------------------------------------------------------------------+
|                        LIBUV THREAD POOL QUEUE                          |
|                                                                         |
|      [ Worker 1 ]       [ Worker 2 ]       [ Worker 3 ]       [ Worker 4 ]
|    (fs.readFile)      (crypto.pbkdf2)     (Idle / Free)      (dns.lookup)
+-------------------------------------------------------------------------+
                                     |
               Worker completes operation -> notifies Event Loop
                                     v
+-------------------------------------------------------------------------+
|                        POLL / PENDING CALLBACK                          |
|             (JavaScript callback invoked on Main Thread)                |
+-------------------------------------------------------------------------+
```

- **Default Size**: 4 worker threads.
- **Configuring Sizing**: Configured via the environment variable `UV_THREADPOOL_SIZE` (must be set before Node starts, up to 1024):
  ```bash
  UV_THREADPOOL_SIZE=16 node dist/server.js
  ```
- **Thread Starvation**: If 4 simultaneous heavy crypto hashing calls run concurrently, all 4 threads are occupied. Any subsequent `fs.readFile()` or `dns.lookup()` will be blocked in queue until a thread frees up!

---

### Asynchronous Execution Model: Microtasks vs Macrotasks

### Microtask Queues: process.nextTick vs Promise.then

In Node.js, asynchronous operations are categorized into **Macrotasks** (managed by Libuv phases) and **Microtasks** (managed in JavaScript engine queues):

```
                        Current Execution Context
                                    |
                                    v
                  +----------------------------------+
                  |    process.nextTick Queue        |  Highest Priority Microtask
                  +----------------------------------+
                                    | (Drain completely)
                                    v
                  +----------------------------------+
                  |  Promise Microtask Queue         |  Standard Microtasks
                  |  (Promise.then, queueMicrotask)  |
                  +----------------------------------+
                                    | (Drain completely)
                                    v
                  +----------------------------------+
                  |       Libuv Event Loop Phase     |  Macrotask Phase
                  |  (Timers, Poll, Check, etc.)     |
                  +----------------------------------+
```

1. **`process.nextTick` Queue**:
   - Not technically part of the Libuv event loop.
   - Drained immediately after the currently running operation finishes, before any other microtasks or macrotasks.
   - **Recursion Danger**: Recursive `process.nextTick` calls will completely starve the event loop, preventing all I/O and timers from ever firing!
2. **Promise Microtask Queue**:
   - Stores resolved Promise `.then()`, `.catch()`, `.finally()`, and `queueMicrotask()` callbacks.
   - Evaluated immediately after the `process.nextTick` queue is exhausted.

---

### Modern Tick Interleaving & Event Loop Draining

In Node.js 11+, the execution model was aligned with the browser HTML5 microtask specification:
- **Legacy Node (<= 10)**: Microtasks were drained only between Libuv phase transitions.
- **Modern Node (>= 11, including Node 20/22)**: **Microtask queues are drained immediately after every individual callback**, regardless of which phase is running!

```typescript
setTimeout(() => {
  console.log('Timer 1');
  Promise.resolve().then(() => console.log('Promise in Timer 1'));
}, 0);

setTimeout(() => {
  console.log('Timer 2');
}, 0);

// Output in modern Node:
// Timer 1
// Promise in Timer 1   <-- Microtask drains IMMEDIATELY before Timer 2 runs!
// Timer 2
```

---

### setTimeout(fn, 0) vs setImmediate(fn) Determinism

A classic Node.js architectural question: which executes first?

#### Scenario A: Top-Level Module Scope (Non-Deterministic)
```javascript
setTimeout(() => console.log('timeout'), 0);
setImmediate(() => console.log('immediate'));
```
- **Behavior**: Non-deterministic (either may fire first).
- **Reason**: `setTimeout(..., 0)` internally normalizes to `setTimeout(..., 1)` (1ms minimum). When the event loop starts, if the process entry and loop initialization took less than 1ms, the timer is not yet expired, and the loop advances past Timers to the Check phase (`setImmediate` runs first). If it took > 1ms, the timer is expired and runs first.

#### Scenario B: Inside an I/O Cycle (Fully Deterministic)
```javascript
import fs from 'node:fs';

fs.readFile(__filename, () => {
  setTimeout(() => console.log('timeout'), 0);
  setImmediate(() => console.log('immediate'));
});
```
- **Behavior**: **`setImmediate` ALWAYS executes first!**
- **Reason**: The `fs.readFile` callback runs in the **Poll Phase**. Once it returns, the event loop must check for `setImmediate` before looping back to Timers. Since a `setImmediate` is queued, the loop immediately transitions to the **Check Phase** and executes it before wrapping around to the **Timers Phase**.

---

## 4. Stage 4: Advanced Streams, Buffers & Memory Mechanics

### Buffer Allocation: Buffer.alloc vs Buffer.allocUnsafe & Off-Heap Memory

Node.js `Buffer` instances represent fixed-length sequences of raw binary bytes allocated **outside the V8 JavaScript heap** in C++ memory:

```typescript
// Safe allocation: Clears and zeroes out all allocated memory
const safeBuf = Buffer.alloc(1024); // 1KB initialized to 0x00

// High-speed allocation: Does NOT zero out memory!
const fastBuf = Buffer.allocUnsafe(1024); // Contains uninitialized residual memory!
```

> [!CAUTION]
> **Security Vulnerability**: `Buffer.allocUnsafe` allocates uninitialized memory that may contain sensitive data (TLS private keys, passwords, database records) previously discarded by the process. Never stream `Buffer.allocUnsafe` slices directly to clients without overwriting them completely via `.fill()`!

#### Buffer Pool Slicing
To minimize OS `malloc` overhead for small buffers, Node.js pre-allocates an internal 8KB memory pool (`Buffer.poolSize = 8192`). Allocations of size `<= Buffer.poolSize / 2` (4096 bytes) are sliced directly from this shared array buffer.

---

### The 4 Stream Paradigms: Readable, Writable, Duplex & Transform

Streams are instances of `EventEmitter` designed to handle data chunks incrementally without holding the entire dataset in RAM:

```
1. Readable: Data source (e.g. fs.createReadStream, req in HTTP server)
   Events: 'data', 'end', 'error', 'close'

2. Writable: Data sink (e.g. fs.createWriteStream, res in HTTP server)
   Methods: write(chunk), end()
   Events: 'drain', 'finish', 'error'

3. Duplex: Bidirectional (both Readable & Writable, e.g. net.Socket)
   Has separate read and write internal buffers.

4. Transform: Duplex stream where output is dynamically computed from input
   (e.g. zlib.createGzip, crypto.createCipheriv).
```

---

### Backpressure Protocol: highWaterMark & Drain Semantics

When a fast data producer sends data to a slow data consumer (e.g. reading a 10Gbps NVMe file to stream over a 1Mbps cellular network connection), memory will explode unless regulated by **Backpressure**:

```
[ Fast Producer ] ------ Chunks ------> [ Internal Buffer (highWaterMark) ] ---- Slow Consumer ---->
                                                        |
                                            Threshold Exceeded?
                                                        |
                                          write() returns FALSE!
                                                        |
                                          Producer Pauses Reads
                                                        |
                                        Buffer Drains to Consumer
                                                        |
                                          Consumer Emits 'drain'
                                                        |
                                          Producer Resumes Reads
```

#### Manual Backpressure Implementation
```typescript
import fs from 'node:fs';

function copyWithBackpressure(sourcePath: string, destPath: string) {
  const readable = fs.createReadStream(sourcePath, { highWaterMark: 64 * 1024 });
  const writable = fs.createWriteStream(destPath, { highWaterMark: 64 * 1024 });

  readable.on('data', (chunk) => {
    // If internal write buffer is full, pause the readable stream
    const canContinue = writable.write(chunk);
    if (!canContinue) {
      readable.pause();
    }
  });

  // When buffer has emptied, resume reading
  writable.on('drain', () => {
    readable.resume();
  });

  readable.on('end', () => {
    writable.end();
  });
}
```

---

### Zero-Copy Streaming & pipeline Composition

Never use legacy `.pipe()` in production! `.pipe()` does NOT forward errors automatically; an error on the readable stream leaves the writable stream dangling and unclosed, leaking file descriptors.

Always use **`node:stream/promises`** with **`pipeline`**:
```typescript
import { pipeline } from 'node:stream/promises';
import fs from 'node:fs';
import zlib from 'node:zlib';

async function compressLogFile(input: string, output: string) {
  const ac = new AbortController();

  try {
    await pipeline(
      fs.createReadStream(input),
      zlib.createGzip({ level: 6 }),
      fs.createWriteStream(output),
      { signal: ac.signal } // Supports graceful cancellation
    );
    console.log('Stream completed successfully with zero file descriptor leaks.');
  } catch (err) {
    console.error('Pipeline failed and all file descriptors closed cleanly:', err);
  }
}
```

---

## 5. Stage 5: Multi-Core Scaling & Enterprise Security

### Multi-Core Scaling, Concurrency & Parallelism

### Cluster Module & Process-Level Scalability

Because a single Node.js instance runs on a single CPU core, multi-core hardware requires process-level scaling using the built-in **`node:cluster`** module:

```
+-------------------------------------------------------------------------+
|                        PRIMARY (MASTER) PROCESS                         |
|     (Listens on Port 3000, distributes incoming TCP socket descriptors)  |
+-------------------------------------------------------------------------+
             |                           |                           |
             | IPC (Round-Robin)         | IPC (Round-Robin)         | IPC
             v                           v                           v
+------------------------+  +------------------------+  +------------------------+
|    Worker 1 (PID 101)  |  |    Worker 2 (PID 102)  |  |    Worker 3 (PID 103)  |
|  Separate V8 Instance  |  |  Separate V8 Instance  |  |  Separate V8 Instance  |
|  Independent Memory    |  |  Independent Memory    |  |  Independent Memory    |
+------------------------+  +------------------------+  +------------------------+
```

```typescript
import cluster from 'node:cluster';
import http from 'node:http';
import os from 'node:os';

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running. Forking ${numCPUs} workers...`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.warn(`Worker ${worker.process.pid} died. Forking replacement...`);
    cluster.fork();
  });
} else {
  // Workers share the same underlying server port
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end(`Handled by worker PID ${process.pid}\n`);
  }).listen(3000);
}
```

- **Load Balancing**: On Linux/macOS, the primary uses a Round-Robin algorithm to distribute incoming socket connections evenly.
- **Port Sharing**: The OS socket is opened in the primary process; file descriptors are passed to worker processes via Unix domain sockets / named pipes.

---

### Worker Threads: Isolates, MessagePort & SharedArrayBuffer

Introduced in Node.js 12+, **`node:worker_threads`** provides true multi-threading inside a single operating system process:

```
+-------------------------------------------------------------------------+
|                        NODE.JS OPERATING SYSTEM PROCESS                 |
|                                                                         |
|  +---------------------------------+   +-----------------------------+  |
|  |           MAIN THREAD           |   |        WORKER THREAD        |  |
|  | - V8 Isolate 1 (Event Loop)     |   | - V8 Isolate 2 (Event Loop) |  |
|  | - Express HTTP Server           |   | - CPU Number Crunching      |  |
|  +---------------------------------+   +-----------------------------+  |
|                  |                                    |                 |
|                  +---------- MessagePort IPC ---------+                 |
|                  |     (Structured Clone Algorithm)   |                 |
|                  |                                    |                 |
|                  +------ SharedArrayBuffer + Atomics -+                 |
|                         (Zero-Copy Shared Memory)                       |
+-------------------------------------------------------------------------+
```

#### Message Passing with Structured Clone Algorithm
Data passed between threads via `postMessage()` is serialized and deserialized using the HTML5 structured clone algorithm by default.

#### Zero-Copy Memory Sharing with Atomics
For ultra-high-throughput applications (audio/image processing, high-frequency finance), threads can share raw memory using `SharedArrayBuffer` with synchronization via `Atomics`:

```typescript
import { Worker, isMainThread, parentPort, workerData } from 'node:worker_threads';

if (isMainThread) {
  // Allocate 4 bytes of shared memory (1 Int32)
  const sharedBuffer = new SharedArrayBuffer(4);
  const sharedArray = new Int32Array(sharedBuffer);

  const worker = new Worker(new URL(import.meta.url), {
    workerData: { sharedBuffer }
  });

  worker.on('online', () => {
    console.log('Worker is online. Waiting for atomic notification...');
    // Block until worker changes value and wakes main thread
    Atomics.wait(sharedArray, 0, 0);
    console.log(`Woken up! Value changed to: ${Atomics.load(sharedArray, 0)}`);
  });
} else {
  const { sharedBuffer } = workerData;
  const sharedArray = new Int32Array(sharedBuffer);

  setTimeout(() => {
    // Atomically store value 42 and wake 1 waiting thread
    Atomics.store(sharedArray, 0, 42);
    Atomics.notify(sharedArray, 0, 1);
  }, 1000);
}
```

---

### Child Processes: spawn vs fork vs exec vs execFile

| Method | Spawns Shell? | Buffering | Best Use Case |
| :--- | :---: | :---: | :--- |
| **`spawn()`** | No (by default) | Streams (`stdout`, `stderr`) | Large data volume, long-running processes, streaming CLI utilities. |
| **`exec()`** | Yes (`/bin/sh`) | Buffers into memory (`maxBuffer`) | Quick shell commands with pipes (`ls -la \| grep txt`). Dangerous with unsanitized input! |
| **`execFile()`** | No | Buffers into memory | Executing a known binary executable directly without shell overhead. |
| **`fork()`** | No | Streams + IPC channel | Spawning separate Node.js processes with built-in `send()` / `message` IPC. |

---

## 6. Stage 6: Diagnostics, Profiling & 40 Staff Interview Questions

### Diagnostics, Memory Leaks & Performance Profiling

### Diagnosing Memory Leaks: Retained Object Trees & Closures

A memory leak occurs when an object is no longer needed by business logic, but remains reachable through the **GC Root Set** (global variables, active closures, DOM/DOM-like trees, long-lived EventEmitter subscriptions).

#### Common Leak Patterns
1. **Accidental Global Variables**:
   ```typescript
   function leak() {
     // Missing 'const' or 'let' binds to global/globalThis in non-strict mode
     leakedCache = []; 
   }
   ```
2. **Dangling EventEmitter Listeners**:
   Adding listeners to shared event emitters without invoking `.removeListener()` or using `AbortSignal`:
   ```typescript
   // Leaks memory on every request:
   eventEmitter.on('update', handleUpdate);

   // Safe pattern using AbortSignal:
   eventEmitter.on('update', handleUpdate, { signal: req.abortSignal });
   ```
3. **Unbounded In-Memory Caches**:
   Storing items in a plain `Map` or object without LRU eviction or TTL pruning. Always use an LRU cache (e.g. `lru-cache`) with strict entry limits.

---

### Heap Snapshots & DevTools Analysis

To capture and inspect V8 memory heap allocations at runtime:

```typescript
import v8 from 'node:v8';
import fs from 'node:fs';

export function takeHeapSnapshot(filepath: string) {
  const snapshotStream = v8.getHeapSnapshot();
  const fileStream = fs.createWriteStream(filepath);
  snapshotStream.pipe(fileStream);
}
```

1. Generate two snapshots: **Snapshot 1 (Baseline)** and **Snapshot 2 (After Load/Requests)**.
2. Load both `.heapsnapshot` files into **Chrome DevTools -> Memory Tab**.
3. Select **Comparison View** and sort by **# Delta** or **Size Delta**.
4. Inspect the **Retaining Tree** to identify the root reference pinning the leaked objects in RAM.

---

### CPU Profiling & Flame Graph Analysis

To identify synchronous CPU bottlenecks blocking the event loop:

```bash
# Run Node with V8 CPU profiler
node --prof dist/server.js

# Benchmark application with load testing
autocannon -c 100 -d 30 http://localhost:3000

# Process the generated isolate tick log
node --prof-process isolate-0x*.log > processed-cpu-profile.txt
```

---

### Event Loop Lag Tracking & AsyncLocalStorage

#### 1. Event Loop Lag Monitoring (`perf_hooks`)
Measure how many milliseconds the event loop is blocked from processing callbacks:
```typescript
import { monitorEventLoopDelay } from 'node:perf_hooks';

const histogram = monitorEventLoopDelay({ resolution: 20 });
histogram.enable();

setInterval(() => {
  console.log(`Event Loop Lag p50: ${(histogram.percentile(50) / 1e6).toFixed(2)} ms`);
  console.log(`Event Loop Lag p99: ${(histogram.percentile(99) / 1e6).toFixed(2)} ms`);
  histogram.reset();
}, 5000);
```

#### 2. Distributed Tracing via `AsyncLocalStorage`
Maintains execution context across asynchronous boundaries (promises, timers, callbacks) without manual parameter drilling:
```typescript
import { AsyncLocalStorage } from 'node:async_hooks';

export const requestContext = new AsyncLocalStorage<{ requestId: string; userId: string }>();

// Express middleware
app.use((req, res, next) => {
  const store = {
    requestId: req.headers['x-request-id'] as string || crypto.randomUUID(),
    userId: 'user-123'
  };
  requestContext.run(store, () => {
    next();
  });
});

// Deep within a repository or service layer:
export function logAudit(action: string) {
  const ctx = requestContext.getStore();
  console.log(`[Request: ${ctx?.requestId}] Audit action: ${action}`);
}
```

---

### Enterprise Security & Hardening

### Prototype Pollution Prevention
Attacker injects properties into `Object.prototype`, altering the behavior of all objects across the application:

```typescript
// Vulnerable recursive merge:
function unsafeMerge(target: any, source: any) {
  for (const key in source) {
    if (typeof source[key] === 'object') {
      if (!target[key]) target[key] = {};
      unsafeMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
}

// Defense 1: Reject __proto__, constructor, prototype keys
const BANNED_KEYS = new Set(['__proto__', 'constructor', 'prototype']);
function safeMerge(target: any, source: any) {
  for (const key of Object.keys(source)) {
    if (BANNED_KEYS.has(key)) continue;
    // Safe assignment
  }
}

// Defense 2: Freeze the prototype at application boot
Object.freeze(Object.prototype);
```

---

### ReDoS (Regular Expression Denial of Service)
Vulnerable regular expressions with overlapping nested quantifiers (e.g. `/(a+)+$/`) cause **catastrophic backtracking**, turning execution time from O(N) into O(2^N):

```typescript
// VULNERABLE: Catastrophic backtracking on "aaaaaaaaaaaaaaaaaaaaaaaaaaaa!"
const evilRegex = /^([a-zA-Z0-9]+)*$/;

// SECURE: Strict atomic groups or simple linear string searches
const safeRegex = /^[a-zA-Z0-9]+$/;
```

---

### Timing-Safe Cryptographic Comparisons

Standard equality checks (`===`) leak information through variable execution time: string comparisons abort at the very first mismatched character, allowing attackers to reconstruct authentication tokens byte-by-byte:

```typescript
import crypto from 'node:crypto';

export function verifyApiToken(providedToken: string, expectedToken: string): boolean {
  const bufA = Buffer.from(providedToken);
  const bufB = Buffer.from(expectedToken);

  if (bufA.length !== bufB.length) {
    return false;
  }

  // Constant-time comparison: executes same CPU cycles regardless of match position
  return crypto.timingSafeEqual(bufA, bufB);
}
```

---

### 40 Senior & Staff Node.js Interview Questions

<details>
<summary><strong>1. Explain the difference between process.nextTick and setImmediate in terms of scheduling and priority.</strong></summary>
<code>process.nextTick()</code> is a microtask processed immediately after the current operation finishes on the call stack, before yielding control back to Libuv or draining standard Promise microtasks. Recursive <code>process.nextTick()</code> calls will starve the event loop. In contrast, <code>setImmediate()</code> is a macrotask executed in Libuv's dedicated <strong>Check Phase</strong>, running after I/O events in the Poll Phase are processed.
</details>

<details>
<summary><strong>2. How did Node.js 11 change the microtask execution model compared to Node.js 10 and earlier?</strong></summary>
Prior to Node.js 11, microtasks (Promises, <code>nextTick</code>) were drained only at phase boundaries of the Libuv event loop. Since Node.js 11 (including Node 20/22), Node.js complies with the HTML5 browser standard: microtask queues are drained immediately after every individual callback runs, even between two consecutive timers or two consecutive I/O callbacks.
</details>

<details>
<summary><strong>3. What is the Libuv thread pool, what tasks execute on it, and how is it sized?</strong></summary>
Libuv provides an internal worker thread pool to handle operations for which the host OS has no true non-blocking asynchronous system call. It handles: (1) all <code>fs</code> filesystem operations, (2) <code>dns.lookup()</code> (which uses synchronous <code>getaddrinfo</code>), (3) CPU-heavy crypto operations (<code>pbkdf2</code>, <code>scrypt</code>), and (4) <code>zlib</code> compression. Sized by the environment variable <code>UV_THREADPOOL_SIZE</code> (default 4, maximum 1024).
</details>

<details>
<summary><strong>4. How does V8's Hidden Class (Shape) transition mechanism impact object property access performance?</strong></summary>
Because JavaScript is dynamically typed, V8 assigns an internal Hidden Class (Map/Shape) to each object that stores the memory offset of its properties. When a new property is added, V8 creates a new shape and transitions the object to it. If objects initialize properties in differing orders, they end up with divergent shapes, degrading call sites from fast monomorphic inline caches (O(1) direct offset access) to slow megamorphic dictionary lookups.
</details>

<details>
<summary><strong>5. Explain the Cheney's Copying Algorithm used in V8's New Space Scavenger GC.</strong></summary>
New Space is divided into two equally sized semi-spaces: From-Space and To-Space. When From-Space fills, a minor GC pause occurs. The scavenger copies all surviving live objects contiguously into To-Space, compacting them automatically. Objects that have survived two scavenge cycles are tenured (promoted) to Old Space. Finally, the roles of From-Space and To-Space are swapped.
</details>

<details>
<summary><strong>6. What is Backpressure in Node.js streams and what happens if you ignore it?</strong></summary>
Backpressure is the flow-control protocol used when a data producer generates chunks faster than a consumer can process or write them. When the consumer's internal buffer exceeds <code>highWaterMark</code>, <code>writable.write(chunk)</code> returns <code>false</code>. If the producer ignores this and continues pushing data, unbounded memory buffering occurs in RAM, leading to out-of-memory process crashes.
</details>

<details>
<summary><strong>7. Why is <code>stream.pipe()</code> considered dangerous in production compared to <code>stream.pipeline()</code>?</strong></summary>
<code>stream.pipe()</code> does not properly handle error forwarding across the pipeline. If the source or intermediate stream emits an error, the destination stream is left open, causing serious file descriptor and memory socket leaks. <code>stream.pipeline()</code> automatically closes, destroys, and cleans up all streams if any stream in the chain emits an error or aborts.
</details>

<details>
<summary><strong>8. What is the difference between Buffer.alloc and Buffer.allocUnsafe?</strong></summary>
<code>Buffer.alloc(size)</code> allocates memory and zeroes it out (initializes all bytes to 0x00). <code>Buffer.allocUnsafe(size)</code> allocates raw memory without zeroing it out; it is faster, but the buffer may contain uninitialized memory containing sensitive historical data from prior process allocations.
</details>

<details>
<summary><strong>9. How does <code>worker_threads</code> differ from the <code>cluster</code> module?</strong></summary>
<code>cluster</code> forks separate operating system processes, each with its own full V8 instance, memory space, and Libuv loop. <code>worker_threads</code> creates separate OS threads within the same process, running isolated V8 execution contexts that can share memory via <code>SharedArrayBuffer</code> with zero IPC serialization overhead.
</details>

<details>
<summary><strong>10. What is <code>AsyncLocalStorage</code> and how does it replace request-scoped context passing?</strong></summary>
<code>AsyncLocalStorage</code> (built on <code>async_hooks</code>) allows storing state that persists across asynchronous execution chains (callbacks, promises, timer hops). It eliminates the need to pass context objects (like correlation IDs, user IDs, tracing spans) through every function signature in an application.
</details>

<details>
<summary><strong>11. Why does <code>setTimeout(fn, 0)</code> sometimes execute after <code>setImmediate(fn)</code> in top-level code?</strong></summary>
Node.js normalizes <code>setTimeout(..., 0)</code> to 1ms. When the Node process initializes, if entering the event loop takes less than 1ms, the timer is not yet expired, so the Timers phase is skipped and the loop advances to the Check phase where <code>setImmediate</code> executes first. If startup took more than 1ms, the timer expires and runs first.
</details>

<details>
<summary><strong>12. Why does <code>setImmediate(fn)</code> ALWAYS execute before <code>setTimeout(fn, 0)</code> inside an I/O callback?</strong></summary>
An I/O callback executes in the <strong>Poll Phase</strong>. When it schedules both timers, the next phase in the loop cycle is the <strong>Check Phase</strong>, which immediately executes <code>setImmediate()</code> before the loop can cycle around to the <strong>Timers Phase</strong>.
</details>

<details>
<summary><strong>13. How do you detect and fix memory leaks caused by EventEmitters?</strong></summary>
By default, an EventEmitter warns when more than 10 listeners are attached to a single event (<code>MaxListenersExceededWarning</code>). Leaks occur when listeners are added per request without being removed. Fixes: (1) use <code>emitter.once()</code> for single events, (2) explicitly remove listeners in cleanup blocks, or (3) pass an <code>AbortSignal</code> option: <code>emitter.on('event', fn, { signal: req.signal })</code>.
</details>

<details>
<summary><strong>14. Explain what a Deoptimization Bailout is in V8's TurboFan.</strong></summary>
TurboFan generates optimized machine code based on speculative assumptions derived from Ignition's runtime type feedback. If a function that was previously called only with integers is suddenly called with a string, TurboFan's assumptions are violated. It performs a deoptimization bailout: it halts execution of the machine code, reconstructs the interpreted stack frame, and falls back to the Ignition bytecode interpreter.
</details>

<details>
<summary><strong>15. How does Node.js handle uncaught exceptions and unhandled promise rejections?</strong></summary>
Uncaught exceptions trigger <code>process.on('uncaughtException')</code>. The process is now in an undefined, corrupt state and must log the error and terminate (<code>process.exit(1)</code>). Unhandled rejections trigger <code>process.on('unhandledRejection')</code>; in modern Node.js, unhandled rejections terminate the process by default (<code>--unhandled-rejections=strict</code>).
</details>

<details>
<summary><strong>16. What is the purpose of <code>crypto.timingSafeEqual()</code> and what vulnerability does it prevent?</strong></summary>
Standard string equality (<code>a === b</code>) returns <code>false</code> at the first mismatched byte, causing execution time to vary based on how many leading characters match. Attackers exploit this via timing attacks to deduce secrets byte-by-byte. <code>crypto.timingSafeEqual()</code> compares byte buffers in constant time, executing the exact same number of CPU cycles regardless of match position.
</details>

<details>
<summary><strong>17. What is Prototype Pollution and how do you protect a Node.js application from it?</strong></summary>
Prototype pollution occurs when user-controlled input can modify <code>Object.prototype</code> (often via recursive deep merges that accept keys like <code>__proto__</code> or <code>constructor.prototype</code>). Defenses: (1) validate/strip sensitive keys before merging, (2) use <code>Object.create(null)</code> for dictionary maps, and (3) freeze the prototype using <code>Object.freeze(Object.prototype)</code>.
</details>

<details>
<summary><strong>18. How does <code>spawn</code> differ from <code>exec</code> in the <code>child_process</code> module?</strong></summary>
<code>spawn()</code> streams data via <code>stdout</code> and <code>stderr</code> streams without buffering, making it suitable for large data volumes and long-running processes. <code>exec()</code> spawns a shell and buffers the entire output into memory up to a <code>maxBuffer</code> limit (default 1MB), risking buffer overflow errors if large output is produced.
</details>

<details>
<summary><strong>19. What is Event Loop Lag and how do you measure it in production?</strong></summary>
Event loop lag is the delay between when an asynchronous callback is scheduled to run and when it actually gets executed on the main thread, caused by long-running synchronous JavaScript blocking the call stack. It is measured via <code>perf_hooks.monitorEventLoopDelay()</code>.
</details>

<details>
<summary><strong>20. Explain the difference between RSS, Heap Total, and Heap Used in process.memoryUsage().</strong></summary>
- <strong>RSS (Resident Set Size)</strong>: Total physical RAM allocated to the process by the OS, including V8 heap, C++ native memory, code space, and off-heap Buffers.
- <strong>Heap Total</strong>: Total memory allocated by V8 for the JavaScript heap.
- <strong>Heap Used</strong>: Memory currently occupied by active JavaScript objects, strings, and closures.
</details>

<details>
<summary><strong>21. What is the purpose of Node-API (formerly N-API)?</strong></summary>
Node-API is an ABI-stable C API for building native Node.js C/C++ addons. Because it is Application Binary Interface (ABI) stable, compiled native addons do not need to be recompiled when upgrading between major Node.js versions.
</details>

<details>
<summary><strong>22. What is the difference between <code>dns.lookup()</code> and <code>dns.resolve()</code>?</strong></summary>
<code>dns.lookup()</code> calls the OS C-library function <code>getaddrinfo()</code> synchronously on the Libuv thread pool; it reads <code>/etc/hosts</code> and OS DNS configurations. <code>dns.resolve()</code> uses the <code>c-ares</code> library to make true asynchronous network queries directly over the network, completely bypassing the thread pool.
</details>

<details>
<summary><strong>23. How does V8 optimize strings via ConsString and SlicedString?</strong></summary>
Instead of copying bytes when concatenating strings, V8 creates a <strong>ConsString</strong>: a tree node referencing the two parent string pointers. When taking a substring, V8 creates a <strong>SlicedString</strong> pointing to the original string with an offset and length, avoiding memory allocation.
</details>

<details>
<summary><strong>24. What is a Retaining Path in a V8 Heap Snapshot?</strong></summary>
The chain of object references that connects an object in memory back to a Garbage Collection Root (e.g. global window/globalThis, current stack frame, or native context). An object cannot be collected by GC as long as at least one retaining path exists.
</details>

<details>
<summary><strong>25. What causes ReDoS (Regular Expression Denial of Service) in Node.js?</strong></summary>
Regular expressions with nested quantifiers (e.g. <code>(a+)+$</code>) applied to non-matching inputs trigger catastrophic backtracking in non-linear NFA engines. The engine tests every permutation of group boundaries, consuming 100% CPU on the main thread and freezing the entire event loop.
</details>

<details>
<summary><strong>26. How do you implement graceful shutdown in a Node.js web server?</strong></summary>
1. Intercept process termination signals (<code>SIGTERM</code>, <code>SIGINT</code>).
2. Stop accepting new incoming connections: <code>server.close()</code>.
3. Keep track of active in-flight requests and wait for them to finish.
4. Set a timeout threshold (e.g. 10s) after which to force-kill: <code>process.exit(1)</code>.
5. Close database connection pools, message broker consumers, and open file handles.
6. Exit with code 0: <code>process.exit(0)</code>.
</details>

<details>
<summary><strong>27. What is the difference between CommonJS (CJS) and ECMAScript Modules (ESM) in Node.js?</strong></summary>
CJS uses synchronous <code>require()</code>, dynamic exports at runtime, and exposes <code>__dirname</code> and <code>__filename</code>. ESM uses asynchronous static <code>import</code>, evaluates top-level <code>await</code>, has strict static tree-shaking capabilities, and uses <code>import.meta.url</code> instead of <code>__dirname</code>.
</details>

<details>
<summary><strong>28. What is Maglev in V8?</strong></summary>
Maglev is V8's mid-tier optimizing compiler introduced to bridge Sparkplug (fast baseline) and TurboFan (high optimization). It generates machine code significantly faster than TurboFan while executing close to TurboFan performance, smoothing out compilation spikes.
</details>

<details>
<summary><strong>29. How does <code>Atomics.wait()</code> and <code>Atomics.notify()</code> work in worker threads?</strong></summary>
<code>Atomics.wait(int32Array, index, expectedValue)</code> puts the calling worker thread to sleep if the value at the index matches expectedValue. <code>Atomics.notify(int32Array, index, count)</code> wakes up the specified number of waiting threads. Note that <code>Atomics.wait()</code> cannot be called on the main thread.
</details>

<details>
<summary><strong>30. Why should you avoid synchronous JSON.parse and JSON.stringify on large payloads?</strong></summary>
JSON parsing and serialization run synchronously on V8's main thread. Parsing a 50MB JSON string blocks the event loop for hundreds of milliseconds, dropping requests and stalling timers. Use streaming JSON parsers (e.g. <code>JSONStream</code>) for high-volume data.
</details>

<details>
<summary><strong>31. What is the difference between <code>Buffer.from()</code> and <code>Buffer.alloc()</code>?</strong></summary>
<code>Buffer.alloc(size)</code> creates a zero-initialized buffer of the specified length. <code>Buffer.from()</code> creates a new buffer containing a copy of the provided array, string, ArrayBuffer, or buffer data.
</details>

<details>
<summary><strong>32. What is the purpose of the <code>--max-old-space-size</code> flag?</strong></summary>
Specifies the maximum memory limit in megabytes for V8's Old Space before an out-of-memory error occurs. By default in 64-bit systems it is ~2GB; on production servers with abundant RAM, it is commonly set to 4096 or 8192 MB.
</details>

<details>
<summary><strong>33. What is the role of the Close Callbacks phase in Libuv?</strong></summary>
It handles the destruction of socket handles and process resources when handles are closed abruptly (e.g. <code>socket.destroy()</code>). Callbacks registered via <code>socket.on('close')</code> are executed in this phase.
</details>

<details>
<summary><strong>34. How does Node.js share a port across multiple processes in cluster mode?</strong></summary>
In cluster mode, the primary process binds to the TCP port. When worker processes invoke <code>server.listen()</code>, the cluster module intercepts the call and passes the underlying OS socket handle/file descriptor from the primary to the workers via IPC.
</details>

<details>
<summary><strong>35. What is the difference between <code>fs.promises</code> and traditional callback <code>fs</code>?</strong></summary>
<code>fs.promises</code> returns native JavaScript Promises that resolve when Libuv thread pool operations finish, allowing clean <code>async/await</code> syntax. Both still execute asynchronously on the underlying Libuv worker thread pool.
</details>

<details>
<summary><strong>36. Why is <code>fs.readFileSync()</code> generally banned in HTTP request handlers?</strong></summary>
It blocks the entire JavaScript thread synchronously for the duration of the disk read, preventing the event loop from handling any incoming network packets, HTTP requests, or timer callbacks for all users.
</details>

<details>
<summary><strong>37. What is the structured clone algorithm?</strong></summary>
A serialization algorithm used by Node.js <code>worker_threads</code> (and browser Web Workers) to clone complex JavaScript objects (including circular references, Maps, Sets, Dates, ArrayBuffers) across thread boundaries.
</details>

<details>
<summary><strong>38. What is the Idle / Prepare phase in Libuv?</strong></summary>
An internal Libuv phase that runs before the Poll phase on every tick to perform engine housekeeping, updating internal timestamps and preparing file descriptor sets for the upcoming OS poll.
</details>

<details>
<summary><strong>39. How do you profile an active production Node.js process without restarting it?</strong></summary>
By sending the <code>SIGUSR1</code> signal to the process: <code>kill -USR1 <pid></code>. This activates the Node.js V8 inspector on port 9229 without interrupting execution, allowing a developer to attach Chrome DevTools remotely.
</details>

<details>
<summary><strong>40. What is the Generational Hypothesis in garbage collection?</strong></summary>
The empirical observation that the vast majority of allocated objects have very short lifespans (they die shortly after allocation). V8 exploits this by placing new objects in a small New Space (Scavenger) that collects garbage rapidly without having to scan the entire heap.
</details>

---

## 7. Stage 7: Interactive Sandbox & Platform Reference

### Production Cheat Sheet & Operational Runbook

### Key Node.js CLI Flags
```bash
# Memory configuration
node --max-old-space-size=4096 dist/server.js

# V8 Garbage collection trace logging
node --trace-gc dist/server.js

# Remote debugging inspector
node --inspect=0.0.0.0:9229 dist/server.js

# Source maps support
node --enable-source-maps dist/server.js
```

### Essential Process Lifecycle Signals
```typescript
// Graceful shutdown listener
process.on('SIGTERM', () => {
  console.log('Received SIGTERM. Closing server...');
  server.close(() => process.exit(0));
});

// Guard against unhandled asynchronous promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});
```

---

## Quickstart & Interactive Testing

### Prerequisites
- Node.js 20.x or 22.x LTS
- npm 9+ or 10+

### Installation & Execution
```bash
# Clone the repository
git clone https://github.com/manthanank/learn-nodejs.git
cd learn-nodejs

# Install dependencies
npm install

# Run Vitest test suite (10 comprehensive tests)
npm test

# Build TypeScript output
npm run build

# Start production server
npm start
# Server listening on http://localhost:3000
```

---

## Contributing & Community

Contributions are welcomed! Please review [CONTRIBUTING.md](CONTRIBUTING.md) and adhere to our [Code of Conduct](CODE_OF_CONDUCT.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.