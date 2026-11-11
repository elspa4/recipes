import { useEffect, useState } from 'react'

/** The dragon illustration: a transparent PNG in /public, cropped tight so his feet touch the bottom edge. */
const DRAGON_SRC = `${import.meta.env.BASE_URL}dragon.png`

/**
 * Granacio's little dragon. Decorative: whatever wraps it provides the label.
 * Drawn facing right and gazing up; pass `flip` to have him face left.
 */
export function DragonArt({ className = '', flip = false }: { className?: string; flip?: boolean }) {
  return (
    <span className={`dragon-frame ${flip ? 'is-flipped' : ''} ${className}`}>
      <span className="dragon">
        <img src={DRAGON_SRC} alt="" width="357" height="360" decoding="async" draggable={false} />
      </span>
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
      {/* he sits at the right end of the search bar, so face him left: up toward the title */}
      <DragonArt flip />
    </button>
  )
}
