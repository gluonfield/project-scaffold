import { createFileRoute } from '@tanstack/react-router'
import type { FormEvent } from 'react'
import { useEffect, useState } from 'react'
import type { TeamUpdate } from '../components/digest-preview'
import { DigestPreview, sampleUpdates } from '../components/digest-preview'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { pageMeta } from '../lib/site'

export const Route = createFileRoute('/demo')({
  head: () =>
    pageMeta(
      'Try Relay | A calmer way to catch up',
      'Explore a sample team digest and try writing a short status update. Free to explore, with no account required.',
      '/demo',
    ),
  component: Demo,
})

function Demo() {
  const [updates, setUpdates] = useState(sampleUpdates)
  const [ready, setReady] = useState(false)
  const [feedback, setFeedback] = useState('')

  useEffect(() => setReady(true), [])

  function addUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const text = String(data.get('update') ?? '').trim()
    if (!text) {
      setFeedback('Write a short update before adding it.')
      return
    }
    const update: TeamUpdate = {
      id: crypto.randomUUID(),
      author: 'You',
      project: String(data.get('project')),
      status: String(data.get('status')) as TeamUpdate['status'],
      text,
    }
    setUpdates((current) => [update, ...current])
    setFeedback('Your update is in the digest.')
    form.reset()
  }

  return (
    <main id="main-content" className="demo-page page-container">
      <section className="page-intro panel panel-mint">
        <Badge variant="outline">Interactive demo</Badge>
        <h1>
          One small update.
          <br />
          Everyone caught up.
        </h1>
        <p>
          Try it with a sample team. Your updates stay in this tab and reset
          when you reload.
        </p>
      </section>
      <section className="demo-workspace" aria-label="Try a team update">
        <div className="composer panel">
          <h2>What’s the latest?</h2>
          <p>A few useful lines are all it takes.</p>
          <form onSubmit={addUpdate}>
            <fieldset disabled={!ready}>
              <legend className="visually-hidden">Write a team update</legend>
              <div className="form-row">
                <label>
                  Project
                  <select name="project">
                    <option>Website</option>
                    <option>Mobile app</option>
                  </select>
                </label>
                <label>
                  Status
                  <select name="status">
                    <option>Shipped</option>
                    <option>Blocked</option>
                    <option>Up next</option>
                  </select>
                </label>
              </div>
              <label>
                Your update
                <textarea
                  name="update"
                  required
                  maxLength={240}
                  rows={4}
                  placeholder="What moved forward, or where do you need a hand?"
                />
              </label>
              <Button type="submit">Add update</Button>
            </fieldset>
            <p className="form-feedback" role="status">
              {feedback}
            </p>
          </form>
          <noscript>
            <p>
              Enable JavaScript to add an update. You can still read the sample
              digest.
            </p>
          </noscript>
        </div>
        <div className="demo-digest">
          <DigestPreview compact updates={updates} />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="demo-reset"
            disabled={updates.length === sampleUpdates.length}
            onClick={() => {
              setUpdates(sampleUpdates)
              setFeedback('The sample digest has been reset.')
            }}
          >
            Reset sample
          </Button>
        </div>
      </section>
      <div className="info-grid">
        <section id="guide" className="info-section panel">
          <h2>
            A minute to share.
            <br />A moment to catch up.
          </h2>
          <ol className="guide-steps">
            <li>
              <h3>Choose your project.</h3>
              <p>Give your update a home so the right people can find it.</p>
            </li>
            <li>
              <h3>Share what matters.</h3>
              <p>Say what shipped, flag a blocker, or share what’s up next.</p>
            </li>
            <li>
              <h3>Read the digest.</h3>
              <p>
                See progress and where someone needs a hand, all in one place.
              </p>
            </li>
          </ol>
        </section>
        <section id="pricing" className="info-section panel">
          <Badge variant="secondary">Pricing</Badge>
          <h2>Free to explore.</h2>
          <p>
            Try this sample workspace without an account or payment details.
          </p>
          <p>
            The demo doesn’t connect to external services or send messages to
            your team.
          </p>
          <Button asChild variant="secondary">
            <a href="#main-content">Try your first update</a>
          </Button>
        </section>
      </div>
    </main>
  )
}
