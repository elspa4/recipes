import { useEffect } from 'react'
import { Link, useParams } from 'react-router'
import { SPARKLE } from '../components/Starfield'
import { recipes, type RecipeDetails } from '../data/recipes'
import { NotFound } from './NotFound'
import './RecipePage.css'

function formatTime(min: number) {
  if (min < 60) return `${min} min`
  const h = Math.floor(min / 60)
  const m = min % 60
  return m ? `${h} hr ${m} min` : `${h} hr`
}

/** The little leafy flourish after the "Ingredients" and "Method" headings, like the cookbook. */
function Fleuron() {
  return (
    <span className="fleuron" aria-hidden="true">
      ❦
    </span>
  )
}

function Stats({ details, totalMinutes }: { details: RecipeDetails; totalMinutes: number }) {
  const stats = [
    ['Serves', String(details.serves)],
    ['Prep', formatTime(details.prepMinutes)],
    ['Cook', formatTime(details.cookMinutes)],
    ['Total', formatTime(totalMinutes)],
  ]
  return (
    <dl className="recipe-stats">
      {stats.map(([label, value]) => (
        <div key={label} className="recipe-stat">
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  )
}

function Ingredients({ details }: { details: RecipeDetails }) {
  return (
    <section className="recipe-ingredients" aria-labelledby="ingredients-heading">
      <h2 id="ingredients-heading" className="recipe-section-title">
        Ingredients <Fleuron />
      </h2>
      {details.ingredients.map((group, i) => (
        <div key={group.title ?? i} className="ingredient-group">
          {group.title && <h3>{group.title}</h3>}
          <ul>
            {group.items.map((ing, j) => (
              <li key={j}>
                {ing.amount && <strong>{ing.amount}</strong>} {ing.item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}

function Method({ details }: { details: RecipeDetails }) {
  return (
    <section className="recipe-method" aria-labelledby="method-heading">
      <h2 id="method-heading" className="recipe-section-title">
        Method <Fleuron />
      </h2>
      <ol>
        {details.steps.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>
      {details.notes && (
        <aside className="recipe-notes" aria-label="Notes">
          <p className="recipe-notes-title" aria-hidden="true">
            ✦ Notes ✦
          </p>
          <p>{details.notes}</p>
        </aside>
      )}
    </section>
  )
}

export function RecipePage() {
  const { slug } = useParams()
  const recipe = recipes.find((r) => r.slug === slug)

  useEffect(() => {
    if (recipe) document.title = `${recipe.name} · Granacio`
  }, [recipe])

  if (!recipe) return <NotFound />
  const { details } = recipe

  return (
    <main className="recipe-page">
      <Link to="/" className="recipe-back">
        ← All recipes
      </Link>

      <header className="recipe-banner">
        <div className="recipe-banner-text">
          <p className="recipe-kicker">✦ {recipe.category}</p>
          <h1 className="recipe-title">{recipe.name}</h1>
          <p className="recipe-blurb">{recipe.blurb}</p>
        </div>

        <div className="recipe-portrait">
          <div className="recipe-photo">
            {recipe.photo ? (
              <img src={`${import.meta.env.BASE_URL}${recipe.photo}`} alt={recipe.name} />
            ) : (
              <svg viewBox="0 0 100 100" className="medallion-placeholder" aria-hidden="true">
                <path d="M50 70 C 49 60, 52 54, 50 42" stroke="#9fe0cf" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M50 58 C 41 61, 33 56, 30 48 C 40 46, 47 51, 50 58Z" fill="#8fd3c0" />
                <path d="M50 50 C 59 51, 67 45, 69 37 C 59 36, 52 42, 50 50Z" fill="var(--lavender)" />
              </svg>
            )}
          </div>
          {/* sparkles around the portrait, as in the cookbook */}
          <svg className="recipe-portrait-sparkles" viewBox="0 0 100 100" aria-hidden="true">
            <path d={SPARKLE} transform="translate(8 14) scale(4)" fill="var(--gold)" />
            <path d={SPARKLE} transform="translate(94 30) scale(3)" fill="var(--gold)" />
            <path d={SPARKLE} transform="translate(90 92) scale(4.5)" fill="var(--gold)" />
            <path d={SPARKLE} transform="translate(4 80) scale(2.5)" fill="#fff" opacity="0.8" />
          </svg>
        </div>
      </header>

      {details ? (
        <>
          <Stats details={details} totalMinutes={recipe.totalMinutes} />
          <div className="recipe-columns">
            <Ingredients details={details} />
            <Method details={details} />
          </div>
        </>
      ) : (
        <div className="page-message page-message--inline">
          <p className="page-message-kicker">✦ Still simmering ✦</p>
          <h2>This recipe is coming soon</h2>
          <p>It’s being perfected in the kitchen. Check back soon!</p>
          <Link to="/" className="page-message-link">
            Back to Recipes
          </Link>
        </div>
      )}
    </main>
  )
}
