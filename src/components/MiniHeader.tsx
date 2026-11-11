import type { CSSProperties } from 'react'
import { Link, useLocation } from 'react-router'
import { ExpandingSearch } from './ExpandingSearch'
import { Sprout } from './Sprout'
import { SPARKLE } from './Starfield'

const TITLE = 'Granacio'

// Where each sparkle flies when the header arrives (px offsets from the sprout).
const BURST = [
  { x: -26, y: -16, s: 5 },
  { x: 24, y: -20, s: 6 },
  { x: 34, y: 6, s: 4 },
  { x: -30, y: 14, s: 4 },
  { x: 6, y: 26, s: 3.5 },
  { x: 120, y: -14, s: 4.5 },
  { x: 150, y: 16, s: 3.5 },
]

interface Props {
  visible: boolean
  query: string
  onQueryChange: (q: string) => void
}

/** Compact header: springs in on the home page once the hero search scrolls away; always shown on recipe pages. */
export function MiniHeader({ visible, query, onQueryChange }: Props) {
  const location = useLocation()
  return (
    <div className="mini-header" data-visible={visible} inert={!visible} aria-hidden={!visible}>
      <div className="mini-inner">
        <Link
          to="/"
          className="mini-brand"
          aria-label="Granacio Vegan Recipes, home"
          onClick={(e) => {
            // Already home: glide back up to the top instead of reloading the page.
            if (location.pathname === '/') {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          }}
        >
          <span className="mini-sprout-wrap">
            <Sprout className="mini-sprout" />
            {BURST.map((b, i) => (
              <svg
                key={i}
                className="burst"
                viewBox="-1 -1 2 2"
                style={{ '--bx': `${b.x}px`, '--by': `${b.y}px`, '--bs': b.s, '--i': i } as CSSProperties}
                aria-hidden="true"
              >
                <path d={SPARKLE} fill="var(--gold)" />
              </svg>
            ))}
          </span>
          <span className="mini-words">
            <span className="mini-title" aria-label={TITLE}>
              {[...TITLE].map((ch, i) => (
                <span key={i} className="mini-letter" style={{ '--i': i } as CSSProperties} aria-hidden="true">
                  {ch}
                </span>
              ))}
            </span>
            <span className="mini-subtitle" style={{ '--i': TITLE.length } as CSSProperties}>
              Vegan Recipes
            </span>
          </span>
        </Link>

        <ExpandingSearch id="search-mini" value={query} onChange={onQueryChange} active={visible} />
      </div>
    </div>
  )
}
