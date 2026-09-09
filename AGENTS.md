# Project guidelines

- Use TanStack Start, React, and TypeScript.
- Use Bun for dependencies and scripts. Commit `bun.lock`.
- Keep pages server-rendered and fast.
- Deploy to Vercel with the Nitro adapter and Node.js 24.
- When starting a new project, create a **private GitHub repository** using GitHub CLI.
- Use **Vercel CLI** to create/link the corresponding Vercel project and connect it to the GitHub repository for deployments.
- Optimize for [Google PageSpeed Insights](https://pagespeed.web.dev/). Check the deployed URL; do not assume scores.
- Use a beautiful, minimalistic, responsive, and accessible design.
- Keep the codebase simple. Do not overengineer or add unnecessary dependencies.
- Before finishing, run `bun run check`, `bun run build`, `bun run typecheck`, and `bun run test`.
