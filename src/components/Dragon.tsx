import { type CSSProperties, useEffect, useState } from 'react'
import { type DragonColor, useDragonColor, useDragonPoof } from '../dragonColor'
import { SPARKLE } from './Starfield'

/** The dragon in both colors: transparent PNGs in /public, cropped tight so his feet touch the bottom edge. */
const DRAGON_IMAGES: Record<DragonColor, { src: string; width: number; height: number }> = {
  purple: { src: `${import.meta.env.BASE_URL}dragon.png`, width: 357, height: 360 },
  teal: { src: `${import.meta.env.BASE_URL}dragon-teal.png`, width: 342, height: 360 },
}

/**
 * Granacio's little dragon, in whichever color he currently is. Decorative:
 * whatever wraps it provides the label. Drawn facing right and gazing up; pass
 * `flip` to have him face left.
 */
export function DragonArt({ className = '', flip = false }: { className?: string; flip?: boolean }) {
  const img = DRAGON_IMAGES[useDragonColor()]
  return (
    <span className={`dragon-frame ${flip ? 'is-flipped' : ''} ${className}`}>
      <span className="dragon">
        <img src={img.src} alt="" width={img.width} height={img.height} decoding="async" draggable={false} />
      </span>
    </span>
  )
}

// Where the puff clouds and sparkles fly to when he poofs (px from his middle).
const POOF_CLOUDS = [
  { x: -34, y: -10, s: 34 },
  { x: 30, y: -18, s: 30 },
  { x: -18, y: 26, s: 30 },
  { x: 26, y: 22, s: 34 },
  { x: 0, y: -34, s: 26 },
  { x: 0, y: 6, s: 44 },
]
const POOF_SPARKLES = [
  { x: -70, y: -40, s: 7 },
  { x: 64, y: -52, s: 8 },
  { x: 80, y: 6, s: 6 },
  { x: -82, y: 18, s: 6 },
  { x: -40, y: 58, s: 5 },
  { x: 46, y: 54, s: 6 },
  { x: 6, y: -78, s: 7 },
  { x: -12, y: 70, s: 5 },
]

/** The puff of smoke and burst of gold sparkles. Remounted (via `key`) for every poof so it replays. */
function PoofEffects() {
  return (
    <span className="poof" aria-hidden="true">
      {POOF_CLOUDS.map((c, i) => (
        <span
          key={`c${i}`}
          className="poof-cloud"
          style={{ '--px': `${c.x}px`, '--py': `${c.y}px`, '--ps': `${c.s}px`, '--i': i } as CSSProperties}
        />
      ))}
      {POOF_SPARKLES.map((p, i) => (
        <svg
          key={`s${i}`}
          className="poof-sparkle"
          viewBox="-1 -1 2 2"
          style={{ '--px': `${p.x}px`, '--py': `${p.y}px`, '--ps': `${p.s * 2}px`, '--i': i } as CSSProperties}
        >
          <path d={SPARKLE} fill="var(--gold)" />
        </svg>
      ))}
    </span>
  )
}

const GREET_DELAY_MS = 1500 // let the page settle first
const GREET_LENGTH_MS = 3200 // how long the bubble stays up
const GREETED_KEY = 'granacio-dragon-greeted'

/**
 * Once per visit, a moment after the page loads, the dragon hops and shows his
 * "About me" bubble, so people discover he's clickable. Skipped on later visits
 * to the home page in the same session.
 */
function useGreeting() {
  const [greeting, setGreeting] = useState(false)

  useEffect(() => {
    try {
      if (sessionStorage.getItem(GREETED_KEY)) return
    } catch {
      // storage blocked (private mode etc.): just greet every time
    }
    const start = setTimeout(() => {
      // marked only once it actually plays (so a cancelled timer doesn't use up the hello)
      try {
        sessionStorage.setItem(GREETED_KEY, '1')
      } catch {
        // ignore
      }
      setGreeting(true)
    }, GREET_DELAY_MS)
    const stop = setTimeout(() => setGreeting(false), GREET_DELAY_MS + GREET_LENGTH_MS)
    return () => {
      clearTimeout(start)
      clearTimeout(stop)
    }
  }, [])

  return greeting
}

/** The clickable dragon perched on the end of the hero search bar. */
export function DragonButton({ onClick }: { onClick: () => void }) {
  const greeting = useGreeting()
  const poof = useDragonPoof()

  // Warm the browser cache with both colors, so a swap never flashes an empty image.
  useEffect(() => {
    Object.values(DRAGON_IMAGES).forEach(({ src }) => {
      new Image().src = src
    })
  }, [])

  return (
    <button
      type="button"
      className={`dragon-btn ${greeting ? 'is-greeting' : ''}`}
      onClick={onClick}
      aria-label="About Granacio"
      data-avoid-stars
    >
      <span className="dragon-bubble" aria-hidden="true">
        About me ✦
      </span>
      {/* he sits at the right end of the search bar, so face him left: up toward the title.
          Keyed by the poof count, so each color swap replays the shrink-and-spring animation. */}
      <span key={`dragon-${poof}`} className={`dragon-poofer ${poof > 0 ? 'is-poofing' : ''}`}>
        <DragonArt flip />
      </span>
      {/* distinct key prefixes: sibling keys must differ, or React can't remove the old ones */}
      {poof > 0 && <PoofEffects key={`poof-${poof}`} />}
    </button>
  )
}
