# Project scaffold

[Reusable scaffold](https://github.com/gluonfield/project-scaffold) built with
TanStack Start, React, TypeScript, and Bun. The sample is Relay, a minimal product
landing page based on the supplied `Relay Landing.html` design.

## Start

Install Bun 1.3.5 and Node.js 24, then run:

```sh
bun install --frozen-lockfile
bun run dev
```

Open [localhost:3000](http://localhost:3000). `/` is the server-rendered landing
page. `/demo` is an interactive sample using local React state; it does not create
accounts or save data to a server. Unknown URLs return HTTP 404.

Bun is the package manager and script launcher. The current production server
and HTTP tests run on Node.js; Vercel uses the Nitro adapter with Node.js 24.
[Vercel also supports a separate Bun runtime](https://vercel.com/docs/functions/runtimes/bun),
but using Bun to install dependencies does not enable it automatically.

## Customize

- `src/routes/index.tsx` and `src/routes/demo.tsx`: sample pages and interactions.
- `src/lib/site.ts`: product name, description, and metadata.
- `src/styles.css`: shared design tokens, typography, components, and layout.
- `src/shadcn.css`: Tailwind and shadcn/ui theme mapped to those shared tokens.
- `src/components/ui/`: shadcn/ui component source; `components.json` configures the CLI.
- `src/assets/`: bundled Sora font and its `OFL.txt` license; keep the license.
- `public/favicon.svg`: product mark.
- `content/llms/`: public page content; keep it aligned with the app when adapting the scaffold.
- `scripts/generate-llms.ts`: site details and page map for `@agentmarkup/core`, which generates `public/llms.txt` (overview/link index) and `public/llms-full.txt` (expanded content).
- `AGENTS.md`: concise development rules.

Use shadcn/ui for standard components. Button, Badge, Card, Dropdown Menu, and
Sheet are included, built around shared theme tokens. Mobile navigation uses a
full-screen Sheet with large touch targets, keyboard focus management, and Escape
to close. Dropdown Menu remains available for contextual menus.

The official `shadcn` CLI is a development dependency resolved in `bun.lock`.
Add components with `bunx --bun shadcn add <component>` and commit the generated
source and lockfile changes. Keep appearance in the global theme instead of
adding one-off page styles. Retain `SHADCN-LICENSE.md`. See the
[shadcn/ui CLI documentation](https://ui.shadcn.com/docs/cli).

Copy `.env.example` to `.env` and set `VITE_SITE_URL` to your production origin.
This public build-time variable controls canonical and `og:url` tags, which are
omitted when it is unset. Set it in Vercel before building and redeploy after
changes. Never put secrets in `VITE_` variables.

The LLM-readable files are served at `/llms.txt` and `/llms-full.txt`; generated
outputs are gitignored. They refresh at each dev startup and production build.
After editing their content during development, run `bun run generate:llms development`
or restart dev. `bun run generate:llms` regenerates them with production settings.
Their links use `VITE_SITE_URL`, then Vercel's production/deployment hostname when
available, with `localhost:3000` as the local fallback. Set `VITE_SITE_URL` for
your canonical production origin.

The sample has no database, authentication, analytics, or external font requests.
Add services only when needed. Use PostgreSQL through Neon in the Vercel
Marketplace for databases. Use Vercel Blob only for files over 100 MB; smaller
static assets can stay in the project. Do not commit uploads or private data.

## Verify

```sh
bun run check       # Lint and formatting
bun run build       # Production build and generated route types
bun run typecheck   # Strict TypeScript check
bun run test        # HTTP checks against the production build
bun run start       # Production server at localhost:3000
```

Use `bun run format` for formatting and safe lint fixes. Commit the generated
`src/routeTree.gen.ts`; do not edit it manually.

## New project and deployment

Copy this repository's contents, including dotfiles, into a fresh project folder.
Authenticate GitHub CLI and Vercel CLI, then create a private repository and a
matching Vercel project. Replace `my-project` with the chosen name:

```sh
git init -b main
git add .
git commit -m "Initial scaffold"
gh repo create my-project --private --source=. --remote=origin --push
bunx vercel link
bunx vercel git connect
```

In `vercel link`, create a new project with the matching name. Use the **TanStack
Start** framework, **Node.js 24**, and the repository root as the root directory.
`vercel.json` supplies the Bun install and build commands. Leave the output
directory at its framework default, set `VITE_SITE_URL`, and deploy with
`bunx vercel --prod` when ready. Test direct requests to `/` and `/demo` afterward.

Nitro detects Vercel and creates its Build Output API structure. Check that target
locally with:

```sh
NITRO_PRESET=vercel bun run build
```

This produces `.vercel/output/`. Rebuild normally before running the local server
or HTTP tests. GitHub CI checks the code and both build targets. Framework and
adapter versions are pinned; rerun both builds when updating them.

If keeping the scaffold in a subdirectory, set that directory as Vercel's root
and move the GitHub workflow to the repository root with its working directory
and Bun setup package path adjusted accordingly.

## PageSpeed

The baseline uses SSR, route splitting, compressed static assets, local Sora font
files, small shared CSS, and page metadata. Audit the production build locally:

```sh
bunx lighthouse http://localhost:3000 --output=html --output-path=lighthouse-report.html --view
```

Lighthouse needs Chrome and a running production server. Check the deployed URL
with [PageSpeed Insights](https://pagespeed.web.dev/) after content or dependency
changes. Aim for 90+ mobile performance and 100 accessibility, best practices, and
SEO. Local scores do not guarantee real-user Core Web Vitals.

Before launching a real product, replace sample claims and content, configure the
production origin, and add a social image and sitemap when needed.

Deployment references: [TanStack Start on Vercel](https://vercel.com/docs/frameworks/full-stack/tanstack-start),
[Nitro's Vercel integration](https://nitro.build/deploy/providers/vercel).
