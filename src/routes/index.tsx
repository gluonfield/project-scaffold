import { createFileRoute, Link } from '@tanstack/react-router'
import { Clock3, Layers3, Users } from 'lucide-react'
import { DigestPreview } from '../components/digest-preview'
import { Button } from '../components/ui/button'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card'
import { pageMeta, site } from '../lib/site'

export const Route = createFileRoute('/')({
  head: () =>
    pageMeta('Relay | Status updates worth reading', site.description, '/'),
  component: Home,
})

function Home() {
  return (
    <main id="main-content">
      <section
        className="hero-section page-container"
        aria-labelledby="hero-heading"
      >
        <div className="hero panel panel-mint">
          <h1 id="hero-heading">
            Status updates your team will actually read.
          </h1>
          <p className="hero-description">
            Relay collects what everyone shipped, what’s blocked, and what’s
            next into one short daily digest. No meetings, no digging through
            channels.
          </p>
          <div className="button-group">
            <Button asChild size="lg">
              <Link to="/demo">Start free</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#product">See how it works</a>
            </Button>
          </div>
          <div className="hero-preview">
            <DigestPreview />
          </div>
        </div>
      </section>

      <section className="benefits page-container" aria-label="Why Relay">
        {[
          {
            icon: Clock3,
            title: 'Async by default',
            description:
              'Post an update in under a minute, whenever it fits your day.',
          },
          {
            icon: Layers3,
            title: 'One daily digest',
            description:
              'A single morning summary, grouped by project. Fewer pings, more clarity.',
          },
          {
            icon: Users,
            title: 'Stay in sync',
            description:
              'A shared view of progress, wherever your team’s day takes them.',
          },
        ].map(({ icon: Icon, title, description }) => (
          <Card key={title}>
            <CardHeader>
              <span className="feature-icon">
                <Icon size={20} aria-hidden="true" />
              </span>
              <CardTitle role="heading" aria-level={2}>
                {title}
              </CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>

      <section
        id="product"
        className="product-section page-container"
        aria-labelledby="product-heading"
      >
        <div className="product-tour panel">
          <div className="section-copy">
            <h2 id="product-heading">See what changed, not what’s noisy.</h2>
            <p>
              Relay groups updates by project and flags blockers, so leads know
              where to step in before standup would have happened.
            </p>
            <Button asChild variant="secondary">
              <Link to="/demo" hash="guide">
                Read the product tour
              </Link>
            </Button>
          </div>
          <div className="tour-preview">
            <DigestPreview compact />
          </div>
        </div>
      </section>
    </main>
  )
}
