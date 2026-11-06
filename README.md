# HEXCODE — Cinematic Portfolio of Adeyemi Pelumi Daniel

React + Vite, GSAP (ScrollTrigger), Framer Motion and Lenis smooth scroll.

## Run it
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist (deploy to Vercel/Netlify)
```

## What's inside
- **Loader**: boot-screen progress bar, then a curtain wipe into the site
- **Hero**: animated procedural neon city (rain, flickering windows, traffic light trails, mouse parallax), a HUD with a live clock and 5-star level, and letters that drop in. On scroll the section pins, the camera zooms into the city and the name splits apart
- **About**: word-by-word text reveal scrubbed to scroll, plus counting stats
- **Missions**: pinned horizontal scroll through your experience as game "missions"
- **Projects**: 3D tilt cards with glare and a colour-wipe reveal; each one plays a scene or your own video
- **Case studies (Cleaniq + iConnect)**: pinned "screen opens up" reveal, 9 feature cards, tech stack and engineering highlights — edit them in the `cleaniq` and `iconnect` blocks of `src/data/profile.js`
- **Night Run**: playable mini-game — arrow keys / A-D, tap or swipe on mobile, best score saved in the browser
- **Skills**: spring-animated chips · **Contact**: magnetic CTA over a zooming city
- **Services** ("Pick your job"): panels that expand on hover
- **Breaking news**: headline cards that flip in, plus a running news ticker
- **Case files mask zoom**: a giant word cut out of a black screen; scrolling flies through the letters into the city
- **Photo mode**: retro poster wall whose columns drift at different speeds
- **The plan**: your process as a route that draws itself while steps light up
- **Player stats**: character card and segmented stat bars
- **Contact phone**: a phone that rises in with tappable apps (mail, call, WhatsApp, GitHub, LinkedIn)
- Motion layer: floating shapes, colour-bar section transitions, heading wipes, decoding section labels, scroll-speed skew, nav stars that fill as you scroll, letterbox bars, and a "Mission complete" banner at the footer
- Extras: custom cursor, film grain, scanlines, scroll progress bar, angled marquees

## Customise
- All text lives in `src/data/profile.js` — including `services`, `planSteps`, `playerStats` (self-ratings, 0–100), `headlines` and `posters`.
- **Add real videos**: put `.mp4` files in `public/videos/`.
  - `public/videos/hero.mp4` plays automatically over the hero city.
  - For a project, set `video: '/videos/my-project.mp4'` (and `url:` for a live link).
  - Keep clips short (5–15 s), muted and compressed (under ~5 MB) so the page stays fast.
- Colours are CSS variables at the top of `src/styles.css`.
  - For Cleaniq or iConnect, set `video` (and `url`) in their blocks in `src/data/profile.js`.
