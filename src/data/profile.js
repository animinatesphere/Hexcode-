// ✏️ Edit everything about you here.
export const profile = {
  name: 'Adeyemi Pelumi Daniel',
  alias: 'HEXCODE',
  first: 'HEX',
  last: 'CODE',
  role: 'Full-Stack Developer',
  stack: 'React · Next.js · Node.js · Python · React Native',
  location: 'Ibadan, Nigeria — open to remote',
  email: 'adeyemipelumi1980@gmail.com',
  phone: '+234 902 161 5849',
  links: {
    github: 'https://github.com/animinatesphere',
    linkedin: 'https://linkedin.com/in/adeyemi-pelumi',
    portfolio: 'https://hexcode-portfolio.vercel.app',
  },
  summary:
    'Full-stack developer with 3+ years of experience building and shipping web and mobile products. I build React and Next.js front ends with polished animation, back ends in Node.js, Express, Python (FastAPI), MongoDB and PostgreSQL, and React Native apps — including two live on the App Store.',
  stats: [
    { value: 3, suffix: '+', label: 'Years shipping' },
    { value: 2, suffix: '', label: 'Apps on the App Store' },
    { value: 3, suffix: '', label: 'Roles · web + mobile' },
    { value: 100, suffix: '%', label: 'Animated' },
  ],
}

export const missions = [
  {
    code: 'MISSION 01',
    title: 'Cleaniq Services',
    role: 'Full-Stack Developer (Web + Mobile)',
    place: 'Manchester, UK',
    color: '#ff2e63',
    points: [
      'Full-stack booking platform in React + Node.js — availability logic, calendar scheduling, admin CRM, invoices, SMS automation and cold email outreach.',
      'Stripe and email APIs in a multi-tab admin CRM; SEO-optimised service pages with dynamic API-driven pricing.',
      'Shipped 2 React Native apps to the App Store: Cleaniq Services (customers) and Cleaniq Service Pro (workers).',
      'AI receptionist on WhatsApp and phone (Twilio + Claude) that quotes from live prices and logs every enquiry as a lead.',
      'Framer Motion + GSAP animation, tuned for mobile performance and accessibility.',
    ],
  },
  {
    code: 'MISSION 02',
    title: 'Roots and Square',
    role: 'Frontend Developer',
    place: 'E-commerce',
    color: '#08d9d6',
    points: [
      'Next.js e-commerce platform with a buyer marketplace and vendor storefronts.',
      'Animations and micro-interactions with Framer Motion and GSAP.',
      'Faster loads through lazy-loading and responsive image optimisation.',
    ],
  },
  {
    code: 'MISSION 03',
    title: 'Dimatech Consultancy',
    role: 'Frontend Developer Intern',
    place: 'School portal',
    color: '#f9c74f',
    points: [
      'Responsive school portal built with React, Framer Motion and GSAP.',
      'Worked with designers and backend developers to deliver pixel-perfect UI/UX.',
    ],
  },
]

// Drop an .mp4 into /public/videos and set `video: '/videos/yourfile.mp4'`.
// Without a video, an animated scene plays instead.
export const cleaniq = {
  id: 'cleaniq',
  label: 'CASE FILE 01 — LIVE BUSINESS, UK',
  title: 'Cleaniq',
  tagline: 'One platform running a whole cleaning company.',
  hue: 175,
  accent: '#08d9d6',
  overview:
    'Cleaniq is a cleaning company in Greater Manchester. Customers book or get quotes online, cleaners pick up jobs in their own app, the office runs everything from one admin panel, and an AI receptionist answers WhatsApp messages and phone calls. I built the system end to end: public website, admin panel, backend API, two mobile apps and the receptionist.',
  tech: ['React 19', 'Vite', 'Tailwind 4', 'React Router 7', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'Twilio', 'Claude API', 'Expo / React Native', 'GSAP'],
  features: [
    { icon: '◷', title: 'Booking & quotes', text: 'Service, hours, extras, frequency, date/time, coupons and Stripe checkout; instant quotes saved as leads.' },
    { icon: '↻', title: 'Regular cleans', text: 'Stripe subscriptions with saved cards, automatic charging before each visit, retries, and pause/cancel rules.' },
    { icon: '▦', title: 'Admin panel', text: 'Job tracker, calendar, rota, quotes, invoices, CRM, finance, staff and customers in one place.' },
    { icon: '◎', title: 'Smart job offers', text: 'Cleaners only see jobs matching their services, working hours, travel area and pet preferences — with pay and travel estimate.' },
    { icon: '▣', title: 'Customer app', text: 'Book, manage regular cleans, chat with the office and cleaner, business and creator accounts, push notifications.' },
    { icon: '⚑', title: 'Cleaner app', text: 'Job feed, on-the-way → arrived → completed flow, checklists, photos, schedule, earnings and withdrawals.' },
    { icon: '☏', title: 'AI receptionist', text: 'Answers WhatsApp and phone calls, quotes from live prices, logs every enquiry as a lead. Never claims to be human.' },
    { icon: '✦', title: 'Growth tools', text: 'Creator referral programme with commissions, cold email campaigns, SMS/email automations and an AI blog autopilot.' },
    { icon: '⌖', title: 'Local SEO', text: 'Pre-rendered pages and 12 location landing pages across Greater Manchester.' },
  ],
  highlights: [
    'Website and admin are one React app; pages are pre-rendered (SSR) at build time for SEO.',
    'Node.js + Express API with Mongoose/MongoDB, deployed on a VPS with pm2.',
    'Stripe: checkout, saved cards, card holds, refunds and webhooks for one-off and recurring cleans.',
    'Two Expo apps shipped with EAS builds and over-the-air updates; Twilio WhatsApp and voice (ConversationRelay) drive the AI receptionist.',
  ],
  // case-study details
  role: 'Full-stack · web, mobile & AI',
  client: 'Cleaniq Services — Manchester, UK',
  platforms: 'Web · iOS · WhatsApp · Phone',
  status: 'Live',
  facts: [
    { value: 6, label: 'Products in one system' },
    { value: 2, label: 'Apps on the App Store' },
    { value: 12, label: 'Local SEO landing pages' },
    { value: 9, label: 'Core modules' },
  ],
  // animated device mockups: web = 'dashboard' | 'feed', phones = 'booking' | 'jobs' | 'chat' | 'live'
  mockups: { web: 'dashboard', webLabel: 'Admin panel', phones: ['booking', 'jobs'], phoneLabels: ['Customer app', 'Cleaner app'] },
  callouts: ['Stripe payments', 'AI receptionist', 'Smart job offers'],
  video: '', // e.g. '/videos/cleaniq.mp4'
  url: 'https://www.cleaniqservices.com',
  repo: '',
}

export const iconnect = {
  id: 'iconnect',
  label: 'CASE FILE 02 — FULL-STACK BUILD',
  hue: 265,
  accent: '#a06bff',
  title: 'iConnect',
  tagline: 'A little more connection.',
  overview:
    'A responsive, web-first social platform that brings community, conversations, video and member marketplaces together in one place — an animated public landing page plus a full member experience for sharing updates, discovering people, joining communities and communicating.',
  tech: ['React', 'Vite', 'Tailwind CSS', 'FastAPI', 'Python', 'PostgreSQL', 'LiveKit', 'Gemini API'],
  features: [
    { icon: '◉', title: 'Accounts', text: 'Email verification, profiles and privacy controls.' },
    { icon: '▤', title: 'Social feed', text: 'Posts, photos, comments, likes and bookmarks.' },
    { icon: '✉', title: 'Messaging', text: 'Editing, photo attachments, voice notes and read receipts.' },
    { icon: '◷', title: 'Statuses', text: '24-hour photo statuses with viewer tracking.' },
    { icon: '⬡', title: 'Communities', text: 'Member-created groups with posts and membership controls.' },
    { icon: '▶', title: 'Video hub', text: 'Uploaded videos and self-hosted LiveKit broadcasts with live chat.' },
    { icon: '⌂', title: 'Jobs & market', text: 'Job listings, employer boards, product listings and local marketplace pages.' },
    { icon: '♥', title: 'Dating', text: 'Dating profiles, discovery, matches and a separate dating inbox.' },
    { icon: '✦', title: 'AI assistant', text: 'Chat interface connected through a server-side Gemini API integration.' },
  ],
  highlights: [
    'Full-stack app with a responsive interface and protected member routes.',
    'API-backed features for accounts, social content, messaging, communities, statuses and listings.',
    'Real-time video with self-hosted LiveKit; request validation, authentication, rate limiting and database migrations.',
    'Authenticated API routes — provider keys stay on the server. Works across desktop and mobile.',
  ],
  role: 'Full-stack · React + FastAPI',
  platforms: 'Web · responsive desktop & mobile',
  status: 'Built',
  facts: [
    { value: 9, label: 'Feature areas' },
    { value: 8, label: 'Technologies in the stack' },
    { text: 'LIVE', label: 'Video broadcasts (LiveKit)' },
    { text: '24H', label: 'Photo statuses' },
  ],
  mockups: { web: 'feed', webLabel: 'Social feed', phones: ['chat', 'live'], phoneLabels: ['Messaging', 'Video hub'] },
  callouts: ['LiveKit video', 'Gemini AI assistant', 'Voice notes'],
  video: '', // e.g. '/videos/iconnect.mp4'
  url: '',   // live link
  repo: 'https://github.com/animinatesphere/',
}

export const featured = [cleaniq, iconnect]

export const projects = [
  {
    title: 'Roots and Square',
    tag: 'Next.js · Marketplace',
    desc: 'Multi-vendor e-commerce: buyer marketplace, vendor storefronts, motion-rich UI.',
    hue: 45,
    video: '',
    url: '',
  },
  {
    title: 'LuxeStore Admin',
    tag: 'React · Tailwind CSS',
    desc: 'Fashion-store dashboard: collapsible sidebar, stat cards, sales chart, paginated products, image upload.',
    hue: 270,
    video: '',
    url: '',
  },
]

export const skills = {
  Frontend: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Vite', 'Tailwind CSS', 'Framer Motion', 'GSAP'],
  Mobile: ['React Native', 'Expo + EAS', 'Flutter', 'Ionic'],
  Backend: ['Node.js', 'Express', 'Python', 'FastAPI', 'REST APIs', 'PostgreSQL', 'MongoDB', 'JWT Auth'],
  Integrations: ['Stripe', 'Paystack', 'Cloudinary', 'Twilio', 'LiveKit', 'Claude API', 'Gemini API', 'SMS automation', 'Email automation'],
  Tools: ['Git', 'GitHub', 'Figma', 'Responsive Design', 'Performance', 'UI/UX'],
}

// ───────── New sections ─────────

// "Pick your job" — what you can hire me for.
export const services = [
  { icon: '▣', title: 'Web Apps', text: 'React and Next.js front ends that load fast, rank well and feel alive — dashboards, marketplaces, booking systems.', tags: ['React', 'Next.js', 'Tailwind'], color: '#ff2e63' },
  { icon: '◫', title: 'Mobile Apps', text: 'React Native + Expo apps, from first screen to App Store release, with push notifications and over-the-air updates.', tags: ['React Native', 'Expo', 'EAS'], color: '#08d9d6' },
  { icon: '⌘', title: 'Backends & APIs', text: 'Node.js / Express and Python / FastAPI services on MongoDB or PostgreSQL, with auth, payments and webhooks done right.', tags: ['Node.js', 'FastAPI', 'Stripe'], color: '#f9c74f' },
  { icon: '☏', title: 'AI Automation', text: 'AI receptionists on WhatsApp and phone, lead capture and smart assistants built on Claude and Gemini.', tags: ['Twilio', 'Claude', 'Gemini'], color: '#a06bff' },
  { icon: '✦', title: 'Motion & UI', text: 'Scroll stories, micro-interactions and cinematic sites like this one, built with GSAP and Framer Motion.', tags: ['GSAP', 'Framer Motion', 'Figma'], color: '#7dff8a' },
]

// "The plan" — how a project runs.
export const planSteps = [
  { code: 'RECON', title: 'Scope the job', text: 'We talk goals, users and budget. I map out features and give you a clear plan and timeline.' },
  { code: 'PLAN', title: 'Design the route', text: 'Wireframes and UI in Figma, plus the data model and architecture, so nothing is guessed later.' },
  { code: 'EXECUTE', title: 'Build in sprints', text: 'Weekly demos on a live preview link. You see progress every week, not just at the end.' },
  { code: 'GETAWAY', title: 'Launch & support', text: 'Deploy, monitor, fix and keep improving. App Store submissions handled too.' },
]

// "Player stats" — self-rated, 0–100. Edit freely.
export const playerStats = [
  { label: 'Frontend', value: 95 },
  { label: 'Animation', value: 92 },
  { label: 'Backend', value: 85 },
  { label: 'Mobile', value: 82 },
  { label: 'AI Integrations', value: 80 },
  { label: 'Coffee Intake', value: 100 },
]

// "Breaking news" — headlines about your real work.
export const headlines = [
  { tag: 'APP STORE', title: 'Local dev ships two apps to the App Store', text: 'Cleaniq Services for customers and Cleaniq Service Pro for cleaners are both live.' },
  { tag: 'MANCHESTER', title: 'AI receptionist now answering the phones', text: 'Built on Twilio and Claude, it quotes from live prices and logs every enquiry as a lead.' },
  { tag: 'TECH', title: 'iConnect goes live with video broadcasts', text: 'Self-hosted LiveKit streams with live chat, messaging, communities and a marketplace.' },
  { tag: 'WEATHER', title: 'Forecast: 100% chance of smooth scrolling', text: 'Witnesses report buttery animations across the whole of this website.' },
]

// "Photo mode" — poster wall.
export const posters = [
  { title: 'SHIP IT', sub: 'From idea to production', hue: 330, glyph: 'tri' },
  { title: 'PIXEL PERFECT', sub: 'Designs built exactly as drawn', hue: 190, glyph: 'square' },
  { title: '60 FPS', sub: 'Animation that never stutters', hue: 45, glyph: 'ring' },
  { title: 'CLEAN CODE', sub: 'Easy to read, easy to grow', hue: 265, glyph: 'plus' },
  { title: 'MOBILE FIRST', sub: 'Every screen, every size', hue: 150, glyph: 'half' },
  { title: 'PAYMENTS', sub: 'Stripe & Paystack wired in', hue: 10, glyph: 'dots' },
  { title: 'AI POWERED', sub: 'Claude & Gemini on tap', hue: 285, glyph: 'cross' },
  { title: 'REMOTE OK', sub: 'Ibadan → anywhere', hue: 210, glyph: 'zig' },
  { title: 'NO BUGS*', sub: '*well, very few', hue: 355, glyph: 'ring' },
]
