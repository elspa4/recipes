import { Link } from 'react-router'
import type { Recipe } from '../data/recipes'
import { SPARKLE } from './Starfield'

function formatTime(min: number) {
  if (min < 60) return `${min} min`
  const h = Math.floor(min / 60)
  const m = min % 60
  return m ? `${h} hr ${m} min` : `${h} hr`
}

/** Shown in the medallion when a recipe has no photo yet: a little sprout under the stars. */
function SproutPlaceholder() {
  return (
    <svg viewBox="0 0 100 100" className="medallion-placeholder" aria-hidden="true">
      <path d="M50 70 C 49 60, 52 54, 50 42" stroke="#9fe0cf" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M50 58 C 41 61, 33 56, 30 48 C 40 46, 47 51, 50 58Z" fill="#8fd3c0" />
      <path d="M50 50 C 59 51, 67 45, 69 37 C 59 36, 52 42, 50 50Z" fill="var(--lavender)" />
      <path d={SPARKLE} transform="translate(72 24) scale(5)" fill="var(--gold)" />
      <path d={SPARKLE} transform="translate(26 30) scale(3)" fill="var(--gold)" opacity="0.8" />
      <path d={SPARKLE} transform="translate(76 74) scale(2.5)" fill="#fff" opacity="0.7" />
    </svg>
  )
}

/** A small four-point star for the frame's corners. */
function CornerStar({ className }: { className: string }) {
  return (
    <svg viewBox="-1 -1 2 2" className={`card-corner ${className}`} aria-hidden="true">
      <path d={SPARKLE} fill="currentColor" />
    </svg>
  )
}

/**
 * A recipe styled like a tarot card: a night-sky top half and an ivory bottom
 * half, a fine gold double frame with starred corners, and the dish in a round
 * medallion that rises on the horizon between the two.
 */
export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link to={`/recipe/${recipe.slug}`} className="card">
      <CornerStar className="tl" />
      <CornerStar className="tr" />
      <CornerStar className="bl" />
      <CornerStar className="br" />

      <div className="card-sky">
        <p className="card-category">
          <span aria-hidden="true">✦</span> {recipe.category} <span aria-hidden="true">✦</span>
        </p>
      </div>

      <div className="card-medallion">
        {recipe.photo ? (
          <img src={`${import.meta.env.BASE_URL}${recipe.photo}`} alt={recipe.name} loading="lazy" />
        ) : (
          <SproutPlaceholder />
        )}
      </div>

      <div className="card-body">
        <h3 className="card-title">{recipe.name}</h3>
        <p className="card-blurb">{recipe.blurb}</p>
        <p className="card-meta">
          <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
            <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
            <path d="M8 4.5V8l2.5 1.5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          {formatTime(recipe.totalMinutes)}
        </p>
      </div>
    </Link>
  )
}
