import { Link } from '@tanstack/react-router'
import { site } from '../lib/site'

export function SiteFooter() {
  return (
    <footer className="site-footer page-container">
      <div className="footer-content">
        <div className="footer-intro">
          <Link to="/" className="brand" aria-label={`${site.name} home`}>
            {site.name}
          </Link>
          <p>A calmer way to catch up.</p>
        </div>
        <nav className="site-nav" aria-label="Footer navigation">
          <Link to="/" hash="product">
            Product
          </Link>
          <Link to="/demo" hash="pricing">
            Pricing
          </Link>
          <Link to="/demo" hash="guide">
            Guide
          </Link>
        </nav>
        <p className="footer-copyright">
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  )
}
