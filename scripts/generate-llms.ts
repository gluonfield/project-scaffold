import { mkdir, readFile, writeFile } from 'node:fs/promises'
import {
  type AgentMarkupConfig,
  generateLlmsFullTxt,
  generateLlmsTxt,
} from '@agentmarkup/core'
import { loadEnv } from 'vite'

const env = loadEnv(process.argv[2] ?? 'production', process.cwd(), '')
const deploymentHost = env.VERCEL_PROJECT_PRODUCTION_URL || env.VERCEL_URL
const origin =
  env.VITE_SITE_URL ||
  (deploymentHost ? `https://${deploymentHost}` : 'http://localhost:3000')
const pages = [
  {
    title: 'Product overview',
    url: '/',
    description: 'What Relay demonstrates and how to explore it.',
    source: 'overview.md',
  },
  {
    title: 'Interactive demo',
    url: '/demo',
    description:
      'How to use the sample digest, its pricing, and its limitations.',
    source: 'demo.md',
  },
]

const config: AgentMarkupConfig = {
  site: origin,
  name: 'Relay',
  description:
    'A sample team-status experience for sharing progress, blockers, and next steps.',
  llmsTxt: {
    instructions: `This is a public demo with fictional sample updates. Submitted updates stay in the current page session and reset on reload. It does not send email or connect to external services.\n\n[Read the full public content](${new URL('/llms-full.txt', origin).href}).`,
    preferMarkdownMirrors: false,
    sections: [{ title: 'Public pages', entries: pages }],
  },
  llmsFullTxt: { enabled: true },
}

const contentByUrl = Object.fromEntries(
  await Promise.all(
    pages.map(async (page) => [
      new URL(page.url, origin).href,
      await readFile(
        new URL(`../content/llms/${page.source}`, import.meta.url),
        'utf8',
      ),
    ]),
  ),
)

const index = generateLlmsTxt(config)
const full = generateLlmsFullTxt(config, { contentByUrl })
if (!index || !full) throw new Error('LLM-readable content generation failed.')

const publicDir = new URL('../public/', import.meta.url)
await mkdir(publicDir, { recursive: true })
await Promise.all([
  writeFile(new URL('llms.txt', publicDir), index),
  writeFile(
    new URL('llms-full.txt', publicDir),
    full.replace(
      'This optional agentmarkup context file expands the published llms.txt manifest with inline same-site markdown content when those mirrors are available.',
      'This file expands the site overview with the public page content below.',
    ),
  ),
])
console.log('Generated public/llms.txt and public/llms-full.txt')
