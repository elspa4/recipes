import type { Recipe } from '../data/recipes'
import { SPARKLE } from './Starfield'

function formatTime(min: number) {
  if (min < 60) return `${min} min`
  const h = Math.floor(min / 60)
  const m = min % 60
  return m ? `${h} hr ${m} min` : `${h} hr`
}

/** Shown when a recipe has no photo yet: an empty gold-rimmed plate under the stars. */
function PlatePlaceholder() {
  return (
    <svg viewBox="0 0 160 120" className="plate" aria-hidden="true">
      <circle cx="80" cy="62" r="38" fill="none" stroke="var(--gold)" strokeWidth="1.5" opacity="0.9" />
      <circle cx="80" cy="62" r="31" fill="rgba(255,255,255,0.06)" stroke="var(--gold)" strokeWidth="0.75" opacity="0.6" />
      <path d="M80 76 C 79 68, 82 62, 80 52" stroke="#9fe0cf" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M80 66 C 72 68, 66 64, 64 58 C 72 57, 78 60, 80 66Z" fill="#8fd3c0" />
      <path d="M80 60 C 88 61, 95 56, 97 50 C 89 49, 83 53, 80 60Z" fill="var(--lavender)" />
      <path d={SPARKLE} transform="translate(122 28) scale(5)" fill="var(--gold)" />
      <path d={SPARKLE} transform="translate(36 92) scale(3.5)" fill="var(--gold)" opacity="0.8" />
      <path d={SPARKLE} transform="translate(130 96) scale(2.5)" fill="#fff" opacity="0.7" />
    </svg>
  )
}

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <article className="card">
      <div className="card-photo">
        {recipe.photo ? (
          <img src={`${import.meta.env.BASE_URL}${recipe.photo}`} alt={recipe.name} loading="lazy" />
        ) : (
          <PlatePlaceholder />
        )}
      </div>
      <div className="card-body">
        <p className="card-category">✦ {recipe.category}</p>
        <h3 className="card-title">{recipe.name}</h3>
        <p className="card-blurb">{recipe.blurb}</p>
        <p className="card-meta">
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
            <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
            <path d="M8 4.5V8l2.5 1.5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          {formatTime(recipe.totalMinutes)}
        </p>
      </div>
    </article>
  )
}
