// Illustrative, animated UI mockups for the case studies (wireframe style, not screenshots).
// Everything inside is sized in container units so it scales with the device frame.

const Sk = ({ w = 60, className = '' }) => <i className={`sk ${className}`} style={{ width: `${w}%` }} />

function Dashboard() {
  const nav = ['Job tracker', 'Calendar', 'Rota', 'Quotes', 'Invoices', 'CRM', 'Finance', 'Staff']
  const bars = [40, 65, 50, 80, 58, 92, 70, 85, 60, 96]
  return (
    <div className="mk-app mk-dash">
      <aside className="mk-side">
        <b className="mk-logo" />
        {nav.map((l, i) => <span key={l} className={i === 0 ? 'on' : ''}>{l}</span>)}
      </aside>
      <div className="mk-main">
        <div className="mk-top"><span className="mk-h">Job tracker</span><span className="mk-search" /><span className="mk-avatar" /></div>
        <div className="mk-stats">
          {['Jobs today', 'Revenue', 'New leads', 'Cleaners out'].map((l, i) => (
            <div key={l} className="mk-stat"><span>{l}</span><Sk w={40 + i * 10} className="big" /><em style={{ animationDelay: `${i * 0.4}s` }} /></div>
          ))}
        </div>
        <div className="mk-row">
          <div className="mk-card mk-chart">
            <span className="mk-label">Bookings</span>
            <div className="mk-bars">{bars.map((h, i) => <i key={i} style={{ '--h': `${h}%`, animationDelay: `${i * 0.08}s` }} />)}</div>
          </div>
          <div className="mk-card mk-cal">
            <span className="mk-label">This week</span>
            <div className="mk-cal-grid">{[...Array(28)].map((_, i) => <i key={i} className={[3, 5, 9, 10, 16, 18, 23, 26].includes(i) ? 'on' : i % 7 === 4 ? 'alt' : ''} />)}</div>
          </div>
        </div>
        <div className="mk-card mk-table">
          {[0, 1, 2].map((r) => <div key={r} className="mk-tr"><span className="mk-dot" /><Sk w={30} /><Sk w={20} /><span className={`mk-pill s${r}`}>{['Booked', 'On the way', 'Completed'][r]}</span></div>)}
        </div>
      </div>
    </div>
  )
}

function Feed() {
  const nav = ['Feed', 'Messages', 'Communities', 'Videos', 'Jobs', 'Market', 'Dating']
  return (
    <div className="mk-app mk-feed">
      <aside className="mk-side">
        <b className="mk-logo" />
        {nav.map((l, i) => <span key={l} className={i === 0 ? 'on' : ''}>{l}</span>)}
      </aside>
      <div className="mk-main">
        <div className="mk-top"><span className="mk-h">Feed</span><span className="mk-search" /><span className="mk-avatar" /></div>
        <div className="mk-statuses">{[...Array(7)].map((_, i) => <i key={i} style={{ animationDelay: `${i * 0.3}s` }} />)}</div>
        {[0, 1].map((p) => (
          <div key={p} className="mk-card mk-post">
            <div className="mk-post-head"><span className="mk-avatar" /><Sk w={28} /></div>
            <Sk w={90} /><Sk w={70} />
            {p === 0 && <div className="mk-img" />}
            <div className="mk-actions"><span className="mk-heart">♥</span><span>💬</span><span>⌑</span></div>
          </div>
        ))}
      </div>
      <aside className="mk-right">
        <span className="mk-label">Communities</span>
        {[0, 1, 2, 3].map((i) => <div key={i} className="mk-tr"><span className="mk-avatar sm" /><Sk w={60} /></div>)}
        <span className="mk-label">AI assistant</span>
        <div className="mk-ai"><Sk w={80} /><Sk w={55} /><span className="mk-typing"><i /><i /><i /></span></div>
      </aside>
    </div>
  )
}

function Booking() {
  const rows = ['Service', 'Hours', 'Extras', 'Frequency', 'Date & time']
  return (
    <div className="mk-app mk-phone-app">
      <p className="mk-ph">Book a clean</p>
      <div className="mk-steps">{rows.map((r, i) => <span key={r} className={i <= 2 ? 'done' : ''} />)}</div>
      {rows.map((r, i) => (
        <div key={r} className={`mk-field ${i === 2 ? 'active' : ''}`}><span>{r}</span><Sk w={35} /><b>›</b></div>
      ))}
      <div className="mk-quote"><span>Instant quote</span><Sk w={30} className="big" /></div>
      <button className="mk-btn" tabIndex={-1}>Book & pay</button>
      <p className="mk-small">Secure checkout with Stripe</p>
    </div>
  )
}

function Jobs() {
  const tags = [['Your area', 'Pets OK'], ['Your hours'], ['Your area', 'Your hours']]
  return (
    <div className="mk-app mk-phone-app">
      <p className="mk-ph">Job offers</p>
      {tags.map((t, i) => (
        <div key={i} className="mk-card mk-job" style={{ animationDelay: `${i * 0.25}s` }}>
          <Sk w={70} /><div className="mk-tags">{t.map((x) => <span key={x}>{x}</span>)}</div>
          <div className="mk-job-foot"><span>Pay</span><Sk w={25} /><span>Travel</span><Sk w={20} /></div>
        </div>
      ))}
      <div className="mk-track">
        <div className="mk-track-bar"><i /></div>
        <div className="mk-track-labels"><span>On the way</span><span>Arrived</span><span>Done</span></div>
      </div>
    </div>
  )
}

function Chat() {
  return (
    <div className="mk-app mk-phone-app mk-chat">
      <div className="mk-chat-head"><span className="mk-avatar" /><Sk w={40} /><span className="mk-online" /></div>
      <div className="mk-bubbles">
        <span className="b in" style={{ '--w': '62%' }} />
        <span className="b out" style={{ '--w': '48%' }} />
        <span className="b in voice"><b>▶</b>{[...Array(14)].map((_, i) => <i key={i} style={{ animationDelay: `${-i * 0.11}s` }} />)}</span>
        <span className="b out" style={{ '--w': '70%' }} />
        <span className="b in img" />
        <span className="mk-read">✓✓ Read</span>
      </div>
      <div className="mk-input"><Sk w={60} /><b>🎙</b></div>
    </div>
  )
}

function Live() {
  return (
    <div className="mk-app mk-phone-app mk-live">
      <div className="mk-video">
        <span className="mk-live-tag">● LIVE</span>
        <span className="mk-viewers">👁 <Sk w={40} /></span>
        <div className="mk-hearts">{[...Array(5)].map((_, i) => <i key={i} style={{ animationDelay: `${i * 0.6}s`, left: `${10 + i * 14}%` }}>♥</i>)}</div>
      </div>
      <div className="mk-live-chat">
        {[0, 1, 2, 3].map((i) => <div key={i} className="mk-tr" style={{ animationDelay: `${i * 0.5}s` }}><span className="mk-avatar sm" /><Sk w={50 + (i % 2) * 25} /></div>)}
      </div>
      <div className="mk-input"><Sk w={60} /><b>♥</b></div>
    </div>
  )
}

export const screens = { dashboard: Dashboard, feed: Feed, booking: Booking, jobs: Jobs, chat: Chat, live: Live }
