import { SPARKLE } from './Starfield'

/** The glowing seedling from the cover, redrawn as a small inline SVG. */
export function Sprout({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 170" aria-hidden="true">
      <defs>
        <radialGradient id="sprout-glow">
          <stop offset="0" stopColor="#fff3c4" stopOpacity="0.95" />
          <stop offset="0.35" stopColor="#ffd98a" stopOpacity="0.45" />
          <stop offset="1" stopColor="#ffd98a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="sprout-halo">
          <stop offset="0" stopColor="#8a7fe0" stopOpacity="0.35" />
          <stop offset="1" stopColor="#8a7fe0" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="100" cy="90" r="80" fill="url(#sprout-halo)" />

      {/* moon */}
      <path d="M150 22 a17 17 0 1 0 14 28 a13 13 0 1 1 -14 -28z" fill="var(--gold)" />

      {/* hill */}
      <path d="M48 160 Q100 132 152 160 Z" fill="#2e6e64" />
      <path d="M58 160 Q100 140 142 160 Z" fill="#3f8f7c" />

      {/* mushrooms */}
      <g>
        <rect x="68" y="148" width="3" height="8" rx="1" fill="#efe8ff" />
        <path d="M63 149 a7 5 0 0 1 13 0z" fill="var(--lavender)" />
        <rect x="128" y="150" width="2.5" height="6" rx="1" fill="#efe8ff" />
        <path d="M124 151 a5.5 4 0 0 1 10.5 0z" fill="var(--sage)" />
      </g>

      {/* stem */}
      <path
        d="M100 152 C 98 125, 104 110, 98 90 C 94 75, 104 60, 101 40"
        stroke="#9fe0cf"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* leaves */}
      <path d="M99 118 C 80 125, 60 118, 52 106 C 70 100, 90 104, 99 118Z" fill="#8fd3c0" opacity="0.9" />
      <path d="M100 108 C 120 112, 142 104, 150 88 C 130 84, 110 92, 100 108Z" fill="var(--lavender)" />
      <path d="M98 84 C 84 82, 72 70, 70 58 C 84 60, 94 70, 98 84Z" fill="#a48ee6" />
      <path d="M101 66 C 112 62, 122 52, 124 40 C 112 42, 104 52, 101 66Z" fill="#8fd3c0" opacity="0.9" />
      <g stroke="rgba(255,255,255,0.35)" strokeWidth="0.8" fill="none">
        <path d="M99 118 C 85 115, 68 110, 56 106" />
        <path d="M100 108 C 118 104, 135 96, 148 89" />
      </g>

      {/* glowing bud */}
      <circle cx="101" cy="34" r="26" fill="url(#sprout-glow)" className="pulse" />
      <path d="M101 22 C 108 30, 108 40, 101 44 C 94 40, 94 30, 101 22Z" fill="#ffe6a3" />

      <path d={SPARKLE} transform="translate(101 8) scale(5)" fill="#fff4d0" />
    </svg>
  )
}
