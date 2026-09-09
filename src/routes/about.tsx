import { createFileRoute, Link } from '@tanstack/react-router'
import { Arrow } from '../components/arrow'
import { pageMeta } from '../lib/site'

export const Route = createFileRoute('/about')({
  head: () =>
    pageMeta(
      'The guide | Scaffolding',
      'Get started, make the template your own, and deploy your TanStack Start project with GitHub and Vercel.',
      '/about',
    ),
  component: Guide,
})

function Guide() {
  return (
    <main id="main-content" className="wrap guide">
      <div className="guide-heading">
        <p className="eyebrow">The guide</p>
        <h1>
          A small foundation.
          <br />
          <span>Room to grow.</span>
        </h1>
        <p>
          The setup is here. Bring the idea, make a few changes, and build from
          there.
        </p>
      </div>
      <div className="guide-layout">
        <aside className="guide-aside">
          <p>Make it yours</p>
          <nav aria-label="Guide sections">
            <a href="#start">Start locally</a>
            <a href="#customize">Add your own character</a>
            <a href="#deploy">Put it out there</a>
          </nav>
          <span>Three steps to a fresh start.</span>
        </aside>
        <div className="guide-content">
          <section id="start">
            <span className="step-label">Step 01</span>
            <h2>Start locally.</h2>
            <p>
              Use Node.js 24 and Bun. Open the project folder in your terminal,
              install the dependencies, then start the development server.
            </p>
            <pre>
              <code>
                <span className="code-comment"># Install and start</span>
                {'\n'}bun install{'\n'}bun run dev
              </code>
            </pre>
            <p className="small-copy">
              Your local site will be available at{' '}
              <code>http://localhost:3000</code>.
            </p>
          </section>
          <section id="customize">
            <span className="step-label">Step 02</span>
            <h2>Add your own character.</h2>
            <p>
              Replace the sample copy, change the colors, and add a page. The
              project is deliberately small so you can find your way around
              quickly.
            </p>
            <dl className="file-list">
              <div>
                <dt>
                  <code>src/routes/</code>
                </dt>
                <dd>Your pages and their metadata</dd>
              </div>
              <div>
                <dt>
                  <code>src/styles.css</code>
                </dt>
                <dd>Colors, typography, and layout</dd>
              </div>
              <div>
                <dt>
                  <code>src/lib/site.ts</code>
                </dt>
                <dd>Your project’s name and description</dd>
              </div>
              <div>
                <dt>
                  <code>AGENTS.md</code>
                </dt>
                <dd>Guidance for future development</dd>
              </div>
            </dl>
          </section>
          <section id="deploy">
            <span className="step-label">Step 03</span>
            <h2>Put it out there.</h2>
            <p>
              Create a private GitHub repository, then use Vercel CLI to create
              and connect the matching Vercel project. Select TanStack Start,
              use Node.js 24, and add your production domain as{' '}
              <code>VITE_SITE_URL</code>.
            </p>
            <p>
              Before you deploy, check the code and build the production app:
            </p>
            <pre>
              <code>
                bun run check{'\n'}bun run build{'\n'}bun run typecheck{'\n'}bun
                run test
              </code>
            </pre>
            <p>
              After deployment, test your public URL with PageSpeed Insights.
              The README includes the complete setup and performance checklist.
            </p>
            <a
              className="text-link accent-link"
              href="https://pagespeed.web.dev/"
            >
              Open PageSpeed Insights <Arrow diagonal />
            </a>
          </section>
        </div>
      </div>
      <div className="guide-back">
        <Link className="text-link" to="/">
          Back to overview <Arrow />
        </Link>
      </div>
    </main>
  )
}
