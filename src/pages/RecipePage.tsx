import { useEffect } from 'react'
import { Link, useParams } from 'react-router'
import { SPARKLE } from '../components/Starfield'
import { recipes, type Recipe, type RecipeDetails } from '../data/recipes'
import { NotFound } from './NotFound'
import './RecipePage.css'

function formatTime(min: number) {
  if (min < 60) return `${min} min`
  const h = Math.floor(min / 60)
  const m = min % 60
  return m ? `${h} hr ${m} min` : `${h} hr`
}

/** Little pills in the banner: how many it serves, and how long it takes. */
function Badges({ recipe }: { recipe: Recipe }) {
  return (
    <ul className="recipe-badges">
      {recipe.details && (
        <li className="recipe-badge">
          <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
            {/* a little bowl */}
            <path
              d="M3.5 11h17a8.5 8.5 0 0 1-17 0Z M9 19.5h6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <path d="M9 8c0-1.5 1.5-1.5 1.5-3M13.5 8c0-1.5 1.5-1.5 1.5-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Serves {recipe.details.serves}
        </li>
      )}
      <li className="recipe-badge">
        <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
          <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="M12 7.5V12l3 2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        {formatTime(recipe.totalMinutes)}
      </li>
    </ul>
  )
}

/** Saves the printable cookbook page. */
function DownloadButton({ recipe, pdf }: { recipe: Recipe; pdf: string }) {
  return (
    <a className="recipe-download" href={`${import.meta.env.BASE_URL}${pdf}`} download={`${recipe.name} · Granacio.pdf`}>
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path
          d="M12 4v11m0 0l-4.5-4.5M12 15l4.5-4.5M5 19h14"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Download
    </a>
  )
}

function Ingredients({ details }: { details: RecipeDetails }) {
  return (
    <section className="recipe-ingredients" aria-labelledby="ingredients-heading">
      <h2 id="ingredients-heading" className="recipe-section-title">
        Ingredients
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

function Notes({ notes }: { notes: string }) {
  return (
    <aside className="recipe-notes" aria-label="Notes">
      <p className="recipe-notes-title" aria-hidden="true">
        ✦ Notes ✦
      </p>
      <p>{notes}</p>
    </aside>
  )
}

function Method({ details }: { details: RecipeDetails }) {
  return (
    <section className="recipe-method" aria-labelledby="method-heading">
      <h2 id="method-heading" className="recipe-section-title">
        Method
      </h2>
      <ol>
        {details.steps.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>
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
      <header className="recipe-banner">
        <div className="recipe-banner-text">
          <p className="recipe-kicker">✦ {recipe.category}</p>
          <h1 className="recipe-title">{recipe.name}</h1>
          <p className="recipe-blurb">{recipe.blurb}</p>
          <Badges recipe={recipe} />
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
          <div className="recipe-columns">
            <Ingredients details={details} />
            <Method details={details} />
          </div>
          {(details.notes || recipe.pdf) && (
            <div className="recipe-footer-row">
              {details.notes && <Notes notes={details.notes} />}
              {recipe.pdf && <DownloadButton recipe={recipe} pdf={recipe.pdf} />}
            </div>
          )}
          <p className="recipe-print-footer" aria-hidden="true">
            <span>Granacio Vegan Recipes</span>
            <span>✦</span>
            <span>{recipe.category}</span>
          </p>
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
