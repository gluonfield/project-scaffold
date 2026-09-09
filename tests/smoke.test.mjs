import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { once } from 'node:events'
import { createServer } from 'node:net'
import { after, before, test } from 'node:test'
import { setTimeout as delay } from 'node:timers/promises'

let server
let origin
let logs = ''

before(async () => {
  const socket = createServer().listen(0, '127.0.0.1')
  await once(socket, 'listening')
  const port = socket.address().port
  await new Promise((resolve) => socket.close(resolve))
  origin = `http://127.0.0.1:${port}`
  server = spawn(process.execPath, ['.output/server/index.mjs'], {
    env: { ...process.env, HOST: '127.0.0.1', PORT: String(port) },
    stdio: ['ignore', 'pipe', 'pipe'],
  })
  server.stdout.on('data', (chunk) => {
    logs += chunk
  })
  server.stderr.on('data', (chunk) => {
    logs += chunk
  })

  for (let attempt = 0; attempt < 100; attempt++) {
    if (server.exitCode !== null)
      throw new Error(`Server exited. Run bun run build first.\n${logs}`)
    try {
      const response = await fetch(origin, {
        signal: AbortSignal.timeout(1000),
      })
      if (response.ok) return
    } catch {
      /* The production server is still starting. */
    }
    await delay(100)
  }
  throw new Error(`Production server did not start.\n${logs}`)
})

after(async () => {
  if (server && server.exitCode === null) {
    const exited = once(server, 'exit')
    server.kill('SIGTERM')
    await exited
  }
})

test('home content and metadata are in the initial HTML, without JavaScript', async () => {
  const response = await fetch(origin)
  assert.equal(response.status, 200)
  assert.match(response.headers.get('content-type'), /text\/html/)
  const html = await response.text()
  const main = html.match(/<main[\s\S]*?<\/main>/)?.[0]
  assert.ok(main, 'Server must render a main landmark')
  assert.match(main, /Good things/)
  assert.match(main, /Fast from the first visit/)
  assert.match(main, /href="\/about"/)
  assert.match(html, /<html lang="en"/)
  assert.match(html, /<title>Scaffolding \| A place to begin<\/title>/)
  assert.match(
    html,
    /name="description" content="A small, considered foundation/,
  )
  assert.match(html, /property="og:title"/)

  const cssPath = html.match(
    /<link[^>]*rel="stylesheet"[^>]*href="([^"]+)"/,
  )?.[1]
  assert.ok(cssPath, 'Stylesheet must be discoverable in server-rendered HTML')
  const css = await fetch(new URL(cssPath, origin))
  assert.equal(css.status, 200)
  assert.match(css.headers.get('content-type'), /text\/css/)
})

test('the second page supports direct requests with its own title and content', async () => {
  const response = await fetch(`${origin}/about`)
  assert.equal(response.status, 200)
  const html = await response.text()
  assert.match(html, /<title>The guide \| Scaffolding<\/title>/)
  assert.match(html.match(/<main[\s\S]*?<\/main>/)?.[0] ?? '', /Start locally/)
  assert.match(html, /bun install/)
})

test('unknown URLs return a real 404 with a recovery link', async () => {
  const response = await fetch(`${origin}/this-page-does-not-exist`)
  assert.equal(response.status, 404)
  const html = await response.text()
  assert.match(html, /Nothing here/)
  assert.match(html, /Return to overview/)
  assert.match(html, /name="robots" content="noindex"/)
})

test('robots and the local favicon are served', async () => {
  const robots = await fetch(`${origin}/robots.txt`)
  assert.equal(robots.status, 200)
  assert.match(await robots.text(), /User-agent: \*/)
  const icon = await fetch(`${origin}/favicon.svg`)
  assert.equal(icon.status, 200)
  assert.match(icon.headers.get('content-type'), /image\/svg\+xml/)
})
