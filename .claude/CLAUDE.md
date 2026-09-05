# Claude Code Guidelines - learn-nodejs

- Build: `npm run build` (`tsc`)
- Test: `npm test` (`vitest run`)
- Dev: `npm run dev` (`tsx watch src/server.ts`)
- TypeScript target: ES2022 with NodeNext module resolution.
- Node.js version target: 20.x or 22.x LTS.
- Always write pure ESM with explicit `.js` import extensions for local files.
