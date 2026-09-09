import {
  createRootRoute,
  HeadContent,
  Link,
  Outlet,
  Scripts,
} from '@tanstack/react-router'
import type { ReactNode } from 'react'
import soraFont from '../assets/sora-latin.woff2?url'
import { SiteFooter } from '../components/site-footer'
import { SiteHeader } from '../components/site-header'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { site } from '../lib/site'
import stylesheet from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#f7f8fa' },
    ],
    links: [
      { rel: 'stylesheet', href: stylesheet },
      {
        rel: 'preload',
        as: 'font',
        type: 'font/woff2',
        href: soraFont,
        crossOrigin: 'anonymous',
      },
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      { rel: 'describedby', type: 'text/plain', href: '/llms.txt' },
    ],
  }),
  shellComponent: RootDocument,
  component: Outlet,
  notFoundComponent: NotFound,
  errorComponent: () => (
    <main id="main-content" className="page-container message-page">
      <div className="panel">
        <h1>Let’s try that again.</h1>
        <p>The page couldn’t load. Please refresh to give it another try.</p>
        <Button asChild>
          <a href="/">Return to Relay</a>
        </Button>
      </div>
    </main>
  ),
})

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <Scripts />
      </body>
    </html>
  )
}

function NotFound() {
  return (
    <main id="main-content" className="page-container message-page">
      <title>{`Page not found | ${site.name}`}</title>
      <meta name="robots" content="noindex" />
      <div className="panel">
        <Badge variant="secondary">404</Badge>
        <p>This page doesn’t exist.</p>
        <h1>Let’s get you back on track.</h1>
        <p>Your team’s updates are a good place to start.</p>
        <Button asChild>
          <Link to="/">Return to Relay</Link>
        </Button>
      </div>
    </main>
  )
}
