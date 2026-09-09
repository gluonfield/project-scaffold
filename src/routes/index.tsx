import { createFileRoute, Link } from '@tanstack/react-router'
import { Arrow } from '../components/arrow'
import { pageMeta, site } from '../lib/site'

export const Route = createFileRoute('/')({
  head: () => pageMeta('Scaffolding | A place to begin', site.description, '/'),
  component: Home,
})

function Home() {
  return (
    <main id="main-content">
      <section className="hero wrap" aria-labelledby="hero-heading">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="small-mark" />A considered starting point
          </p>
          <h1 id="hero-heading">
            Good things
            <br />
            start <span>simple.</span>
          </h1>
          <p className="hero-description">
            A little structure for your next big idea. Thoughtfully designed,
            fast from the first page, and ready to make your own.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/about">
              Explore the guide <Arrow />
            </Link>
            <a className="text-link" href="#foundation">
              See what’s inside <span aria-hidden="true">↓</span>
            </a>
          </div>
          <p className="hero-note">
            TanStack Start <span aria-hidden="true">/</span> React{' '}
            <span aria-hidden="true">/</span> TypeScript
          </p>
        </div>
        <div className="illustration" aria-hidden="true">
          <div className="drawing-caption">
            <span>A foundation, open to possibility.</span>
            <span>Fig. A</span>
          </div>
          <svg
            className="structure"
            viewBox="0 0 440 400"
            fill="none"
            aria-hidden="true"
          >
            <g className="construction-lines">
              <path d="M25 260 220 147l195 113-195 113L25 260Z" />
              <path d="m25 160 195-113 195 113M220 22v365M50 65v235M390 65v235" />
              <path d="m25 310 195-113 195 113M25 210 195 97l195 113" />
            </g>
            <g className="foundation-shape">
              <path
                className="shape-side"
                d="m85 233 135 78 135-78v30l-135 78-135-78v-30Z"
              />
              <path
                className="shape-top"
                d="m85 233 135-78 135 78-135 78-135-78Z"
              />
              <path className="shape-edge" d="M220 311v30" />
            </g>
            <g className="middle-shape">
              <path
                className="shape-side"
                d="m85 178 135 78 135-78v30l-135 78-135-78v-30Z"
              />
              <path
                className="shape-top"
                d="m85 178 135-78 135 78-135 78-135-78Z"
              />
              <path className="shape-edge" d="M220 256v30" />
            </g>
            <g className="top-shape">
              <path
                className="shape-side"
                d="m85 113 135 78 135-78v30l-135 78-135-78v-30Z"
              />
              <path
                className="shape-top"
                d="m85 113 135-78 135 78-135 78-135-78Z"
              />
              <path className="shape-edge" d="M220 191v30" />
              <path
                className="shape-detail"
                d="m153 113 67-39 67 39-67 39-67-39Z"
              />
            </g>
            <g className="drawing-points">
              <circle cx="50" cy="65" r="3" />
              <circle cx="390" cy="300" r="3" />
              <circle cx="220" cy="373" r="3" />
            </g>
          </svg>
          <div className="drawing-bottom">
            <span className="drawing-cross">+</span>
            <span>Build on something good.</span>
            <span className="drawing-cross">+</span>
          </div>
        </div>
      </section>

      <section
        id="foundation"
        className="foundation wrap"
        aria-labelledby="foundation-heading"
      >
        <div className="section-intro">
          <h2 id="foundation-heading">
            The essentials.
            <br />
            Already in place.
          </h2>
          <p>
            A small foundation that leaves space for what makes your project
            yours.
          </p>
        </div>
        <div className="feature-list">
          <article>
            <span className="feature-symbol" aria-hidden="true">
              ↗
            </span>
            <div>
              <h3>Fast from the first visit</h3>
              <p>
                Server-rendered pages, lightweight styles, and no waiting for
                JavaScript to read the page.
              </p>
            </div>
            <span className="feature-tag">Performance</span>
          </article>
          <article>
            <span className="feature-symbol" aria-hidden="true">
              ⊞
            </span>
            <div>
              <h3>Easy to make your own</h3>
              <p>
                Clear routes, a few shared components, and a simple visual
                system you can change in one place.
              </p>
            </div>
            <span className="feature-tag">Simplicity</span>
          </article>
          <article>
            <span className="feature-symbol" aria-hidden="true">
              ↑
            </span>
            <div>
              <h3>A clear path to launch</h3>
              <p>
                Keep your code on GitHub. Connect it to Vercel. Give your next
                idea a home.
              </p>
            </div>
            <span className="feature-tag">Deployment</span>
          </article>
        </div>
      </section>
      <section className="closing wrap" aria-labelledby="closing-heading">
        <div>
          <p>From here, it’s yours.</p>
          <h2 id="closing-heading">What will you make?</h2>
        </div>
        <Link className="button button-secondary" to="/about">
          Find your starting point <Arrow />
        </Link>
      </section>
    </main>
  )
}
