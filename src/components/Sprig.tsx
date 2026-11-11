import { SPARKLE } from './Starfield'

/** A tiny curly sprout that sits inline with text, about the height of a capital letter. */
export function Sprig() {
  return (
    <svg className="sprig" viewBox="0 0 40 40" aria-hidden="true">
      {/* curly stem */}
      <path
        d="M17 38 C 16 30, 21 26, 19 19 C 17.5 14, 21 9, 25 9.5 C 28 10, 28.5 14, 25.5 14.5"
        stroke="#3f8f7c"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {/* leaves */}
      <g className="sprig-leaf-l">
        <path d="M18 27 C 12 29, 5 26, 3 19 C 10 18, 16 21, 18 27Z" fill="#79c2ae" />
      </g>
      <g className="sprig-leaf-r">
        <path d="M19.5 20 C 25 22, 32 20, 35 14 C 29 11, 22 14, 19.5 20Z" fill="#9a86e0" />
      </g>
      {/* little bud */}
      <circle cx="25.5" cy="14.5" r="2.4" fill="var(--gold)" />
      <path className="sprig-sparkle" d={SPARKLE} transform="translate(33 4) scale(3.4)" fill="var(--gold)" />
    </svg>
  )
}
