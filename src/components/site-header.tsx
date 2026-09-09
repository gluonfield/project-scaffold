import { Link } from '@tanstack/react-router'
import { site } from '../lib/site'
import { Arrow } from './arrow'

export function SiteHeader() {
  return (
    <header className="site-header wrap">
      <Link to="/" className="brand" aria-label={`${site.name} home`}>
        <span className="brand-mark" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        {site.name}
        <span className="brand-period">.</span>
      </Link>
      <nav className="main-nav" aria-label="Main navigation">
        <Link to="/" activeOptions={{ exact: true }}>
          Overview
        </Link>
        <Link to="/about">The guide</Link>
      </nav>
      <a
        className="header-link"
        href="https://tanstack.com/start/latest/docs/framework/react/overview"
      >
        TanStack docs <Arrow diagonal />
      </a>
    </header>
  )
}
