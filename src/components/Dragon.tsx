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

/** The clickable dragon perched on the end of the hero search bar. */
export function DragonButton({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" className="dragon-btn" onClick={onClick} aria-label="About Granacio" data-avoid-stars>
      <span className="dragon-bubble" aria-hidden="true">
        About me ✦
      </span>
      {/* he sits at the right end of the search bar, so face him left: up toward the title */}
      <DragonArt flip />
    </button>
  )
}
