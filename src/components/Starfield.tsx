import { useLayoutEffect, useMemo, useRef, useState } from 'react'

// Tiny seeded PRNG so the sky looks the same on every render/visit.
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const SPARKLE = 'M0,-1 C0.12,-0.12 0.12,-0.12 1,0 C0.12,0.12 0.12,0.12 0,1 C-0.12,0.12 -0.12,0.12 -1,0 C-0.12,-0.12 -0.12,-0.12 0,-1Z'

/** Elements marked with this attribute get a star-free margin around their text. */
const AVOID_SELECTOR = '[data-avoid-stars]'
const DOT_MARGIN = 10
const SPARKLE_MARGIN = 18

interface Box {
  l: number
  t: number
  r: number
  b: number
}

/** Tight box around an element's rendered text (not its full-width block). */
function textBox(el: Element): DOMRect {
  const range = document.createRange()
  range.selectNodeContents(el)
  const rect = range.getBoundingClientRect()
  return rect.width && rect.height ? rect : el.getBoundingClientRect()
}

export function Starfield({ count = 140, sparkles = 9 }: { count?: number; sparkles?: number }) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [layout, setLayout] = useState<{ w: number; h: number; boxes: Box[] } | null>(null)

  const { dots, stars } = useMemo(() => {
    const rand = mulberry32(42)
    const dots = Array.from({ length: count }, () => ({
      x: rand() * 100,
      y: rand() * 100,
      r: rand() * 0.9 + 0.25,
      o: rand() * 0.6 + 0.3,
      d: rand() * 6,
    }))
    const stars = Array.from({ length: sparkles }, () => ({
      x: rand() * 100,
      y: rand() * 75,
      s: rand() * 5 + 4,
      d: rand() * 6,
    }))
    return { dots, stars }
  }, [count, sparkles])

  // Measure where the text sits so stars can steer clear of it.
  useLayoutEffect(() => {
    const svg = svgRef.current
    const host = svg?.parentElement
    if (!svg || !host) return

    const measure = () => {
      const base = svg.getBoundingClientRect()
      const boxes = [...host.querySelectorAll(AVOID_SELECTOR)].map((el) => {
        const r = textBox(el)
        return { l: r.left - base.left, t: r.top - base.top, r: r.right - base.left, b: r.bottom - base.top }
      })
      setLayout({ w: base.width, h: base.height, boxes })
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(host)
    host.querySelectorAll(AVOID_SELECTOR).forEach((el) => ro.observe(el))
    document.fonts?.ready.then(measure) // web fonts change text size once they load
    return () => ro.disconnect()
  }, [])

  const isClear = (xPct: number, yPct: number, margin: number) => {
    if (!layout) return false // don't paint anything until we know where the text is
    const x = (xPct / 100) * layout.w
    const y = (yPct / 100) * layout.h
    return !layout.boxes.some((b) => x > b.l - margin && x < b.r + margin && y > b.t - margin && y < b.b + margin)
  }

  return (
    <svg ref={svgRef} className="starfield" aria-hidden="true" preserveAspectRatio="none">
      {dots.map(
        (p, i) =>
          isClear(p.x, p.y, DOT_MARGIN + p.r) && (
            <circle
              key={i}
              cx={`${p.x}%`}
              cy={`${p.y}%`}
              r={p.r}
              fill="#fff"
              opacity={p.o}
              className="twinkle"
              style={{ animationDelay: `${p.d}s` }}
            />
          ),
      )}
      {stars.map(
        (s, i) =>
          isClear(s.x, s.y, SPARKLE_MARGIN + s.s) && (
            <svg key={`s${i}`} x={`${s.x}%`} y={`${s.y}%`} overflow="visible">
              <path
                d={SPARKLE}
                transform={`scale(${s.s})`}
                fill="var(--gold)"
                className="twinkle"
                style={{ animationDelay: `${s.d}s` }}
              />
            </svg>
          ),
      )}
    </svg>
  )
}

export { SPARKLE }
