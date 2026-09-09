export type TeamUpdate = {
  id: string
  author: string
  project: string
  status: 'Shipped' | 'Blocked' | 'Up next'
  text: string
}

export const sampleUpdates: TeamUpdate[] = [
  {
    id: 'homepage',
    author: 'Maya',
    project: 'Website',
    status: 'Shipped',
    text: 'The new homepage is live. Ready for the team to take a look.',
  },
  {
    id: 'review',
    author: 'Alex',
    project: 'Mobile app',
    status: 'Blocked',
    text: 'Waiting on the final design review before the next release.',
  },
  {
    id: 'onboarding',
    author: 'Sam',
    project: 'Website',
    status: 'Up next',
    text: 'Testing the new onboarding flow with the team tomorrow.',
  },
]

export function DigestPreview({
  compact = false,
  updates = sampleUpdates,
}: {
  compact?: boolean
  updates?: TeamUpdate[]
}) {
  const blockerCount = updates.filter(
    (update) => update.status === 'Blocked',
  ).length

  return (
    <section
      className={`digest${compact ? ' digest-compact' : ''}`}
      aria-label="Sample team digest"
    >
      {!compact && (
        <aside className="digest-sidebar" aria-hidden="true">
          <div className="workspace-name">
            <span className="workspace-icon">S</span> Studio
          </div>
          <span className="workspace-current">Daily digest</span>
          <span className="workspace-item">Projects</span>
          <span className="workspace-item">Your team</span>
          <span className="workspace-note">A little less noise.</span>
        </aside>
      )}
      <div className="digest-content">
        <div className="digest-heading">
          <div>
            <p className="digest-date">Today · Sample workspace</p>
            <h2 className="digest-title">Your morning, caught up.</h2>
          </div>
          <span className="avatar avatar-team" aria-hidden="true">
            S
          </span>
        </div>
        <p className="digest-summary">
          {updates.length} updates <span aria-hidden="true">·</span>{' '}
          {new Set(updates.map((update) => update.project)).size} projects{' '}
          <span aria-hidden="true">·</span> {blockerCount}{' '}
          {blockerCount === 1 ? 'blocker' : 'blockers'}
        </p>
        <ul className="update-list">
          {updates.map((update) => (
            <li className="update" key={update.id}>
              <span className="avatar" aria-hidden="true">
                {update.author.slice(0, 1)}
              </span>
              <div className="update-content">
                <div className="update-meta">
                  <span className="update-author">{update.author}</span>
                  <span className="update-project">{update.project}</span>
                  <span
                    className={`status${update.status === 'Blocked' ? ' status-warning' : ''}`}
                  >
                    {update.status}
                  </span>
                </div>
                <p>{update.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
