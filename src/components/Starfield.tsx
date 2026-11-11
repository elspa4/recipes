import { useMemo } from 'react'

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

export function Starfield({ count = 140, sparkles = 9 }: { count?: number; sparkles?: number }) {
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

  return (
    <svg className="starfield" aria-hidden="true" preserveAspectRatio="none">
      {dots.map((p, i) => (
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
      ))}
      {stars.map((s, i) => (
        <svg key={`s${i}`} x={`${s.x}%`} y={`${s.y}%`} overflow="visible">
          <path
            d={SPARKLE}
            transform={`scale(${s.s})`}
            fill="var(--gold)"
            className="twinkle"
            style={{ animationDelay: `${s.d}s` }}
          />
        </svg>
      ))}
    </svg>
  )
}

export { SPARKLE }
