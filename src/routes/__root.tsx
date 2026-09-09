import {
  createRootRoute,
  HeadContent,
  Link,
  Outlet,
  Scripts,
} from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { SiteHeader } from '../components/site-header'
import { site } from '../lib/site'
import stylesheet from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#ffffff' },
    ],
    links: [
      { rel: 'stylesheet', href: stylesheet },
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    ],
  }),
  shellComponent: RootDocument,
  component: Outlet,
  notFoundComponent: NotFound,
  errorComponent: () => (
    <main id="main-content" className="wrap message-page">
      <p className="eyebrow">Something went wrong</p>
      <h1>Let’s try that again.</h1>
      <p>The page couldn’t load. Please refresh to give it another try.</p>
      <a className="button button-primary" href="/">
        Return to overview
      </a>
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
        <footer className="site-footer wrap">
          <Link className="footer-name" to="/">
            {site.name}.
          </Link>
          <p>A little structure. A lot of possibility.</p>
          <a href="https://vercel.com/docs/frameworks/full-stack/tanstack-start">
            Made for Vercel <span aria-hidden="true">↗</span>
          </a>
        </footer>
        <Scripts />
      </body>
    </html>
  )
}

function NotFound() {
  return (
    <main id="main-content" className="wrap message-page">
      <title>Page not found | Scaffolding</title>
      <meta name="robots" content="noindex" />
      <p className="eyebrow">404 / A small detour</p>
      <h1>Nothing here. Yet.</h1>
      <p>This page doesn’t exist. There’s a good place to start just below.</p>
      <Link className="button button-primary" to="/">
        Return to overview
      </Link>
    </main>
  )
}
