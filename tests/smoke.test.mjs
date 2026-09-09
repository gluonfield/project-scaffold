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
  assert.match(
    main,
    /<h1[^>]*>Status updates your team will actually read\.<\/h1>/,
  )
  assert.match(main, /Your morning, caught up\./)
  assert.match(main, /The new homepage is live\./)
  assert.match(main, /href="\/demo"/)
  assert.match(html, /<html lang="en"/)
  assert.match(html, /<title>Relay \| Status updates worth reading<\/title>/)
  assert.match(html, /name="description" content="[^"]*Relay/)
  assert.match(
    html,
    /property="og:title" content="Relay \| Status updates worth reading"/,
  )
  assert.doesNotMatch(
    html,
    /<a\b[^>]*href="https?:\/\/(?:www\.)?(?:vercel\.com|tanstack\.com)/,
  )

  const cssPath = html.match(
    /<link[^>]*rel="stylesheet"[^>]*href="([^"]+)"/,
  )?.[1]
  assert.ok(cssPath, 'Stylesheet must be discoverable in server-rendered HTML')
  const css = await fetch(new URL(cssPath, origin))
  assert.equal(css.status, 200)
  assert.match(css.headers.get('content-type'), /text\/css/)

  const fontPath = html.match(/<link[^>]*as="font"[^>]*href="([^"]+)"/)?.[1]
  assert.ok(fontPath, 'Local font must be preloaded in server-rendered HTML')
  const fontUrl = new URL(fontPath, origin)
  assert.equal(fontUrl.origin, origin)
  const font = await fetch(fontUrl)
  assert.equal(font.status, 200)
  assert.match(font.headers.get('content-type'), /font\/woff2/)
})

test('the demo renders its form and sample digest on a direct request', async () => {
  const response = await fetch(`${origin}/demo`)
  assert.equal(response.status, 200)
  const html = await response.text()
  assert.match(html, /<title>Try Relay \| A calmer way to catch up<\/title>/)
  const main = html.match(/<main[\s\S]*?<\/main>/)?.[0] ?? ''
  assert.match(main, /One small update\.<br\s*\/>Everyone caught up\./)
  assert.match(main, /<textarea[^>]*name="update"/)
  assert.match(main, /<fieldset disabled=""/)
  assert.match(main, /Your morning, caught up\./)
  assert.match(main, /Waiting on the final design review/)
  assert.match(main, /<noscript>/)
})

test('unknown URLs return a real 404 with a recovery link', async () => {
  const response = await fetch(`${origin}/this-page-does-not-exist`)
  assert.equal(response.status, 404)
  const html = await response.text()
  assert.match(html, /Page not found \| Relay/)
  assert.match(html, /Let’s get you back on track/)
  assert.match(html, /Return to Relay/)
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
