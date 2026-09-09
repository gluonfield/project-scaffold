# Project guidelines

- Scaffold reference: [gluonfield/project-scaffold](https://github.com/gluonfield/project-scaffold).
- Use TanStack Start, React, and TypeScript.
- Use Bun for dependencies and scripts. Commit `bun.lock`.
- Keep pages server-rendered and fast.
- Deploy to Vercel through Nitro. Bun manages packages and scripts; the current server runtime is Node.js 24.
- When starting a new project, create a **private GitHub repository** using GitHub CLI.
- Use **Vercel CLI** to create/link the corresponding Vercel project and connect it to the GitHub repository for deployments.
- If a database is needed, use PostgreSQL through Neon in the Vercel Marketplace.
- Use Vercel Blob only for files over 100 MB. Smaller static assets can stay in the project; user uploads and private data must not be committed.
- Optimize for [Google PageSpeed Insights](https://pagespeed.web.dev/). Check the deployed URL; do not assume scores.
- Maximize SEO when building: semantic HTML, useful content, unique metadata, canonical URLs, crawlable links, sitemaps, appropriate structured data, and correct indexing rules.
- Use a beautiful, minimalistic, responsive, and accessible design.
- Always follow the global design language. Use shared styles, tokens, and components; do not make ad hoc changes in individual places.
- Use shadcn/ui for all UI components, styled through the shared global theme.
- Keep the interface focused on the product. No framework/hosting promotions, tech badges, or developer setup instructions in the UI.
- Keep the codebase simple. Do not overengineer or add unnecessary dependencies.
- Before finishing, run `bun run check`, `bun run build`, `bun run typecheck`, and `bun run test`.
