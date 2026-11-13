import { useEffect } from 'react'
import { Link, useParams } from 'react-router'
import { DragonArt } from '../components/Dragon'
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

/** Little pills in the banner: how many it serves (or makes), and how long it takes. */
function Badges({ recipe }: { recipe: Recipe }) {
  const d = recipe.details
  const yieldLabel = d?.serves ? `Serves ${d.serves}` : d?.makes ? `Makes ${d.makes}` : null
  return (
    <ul className="recipe-badges">
      {yieldLabel && (
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
          {yieldLabel}
        </li>
      )}
      {!recipe.details ? (
        <li className="recipe-badge">✦ Coming Soon</li>
      ) : (
        recipe.totalMinutes && (
          <li className="recipe-badge">
            <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
              <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <path d="M12 7.5V12l3 2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            {formatTime(recipe.totalMinutes)}
          </li>
        )
      )}
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
                {ing.amount && <strong>{ing.amount}</strong>}{' '}
                {ing.recipe ? (
                  // made from another recipe on the site: link to it
                  <Link to={`/recipe/${ing.recipe}`} className="ingredient-link">
                    {ing.item}
                  </Link>
                ) : (
                  ing.item
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}

/** The notes as a speech bubble, with the little dragon below as if he's sharing the tip. */
function Notes({ notes }: { notes: string }) {
  return (
    <div className="recipe-notes-wrap">
      <aside className="recipe-notes" aria-label="Notes">
        <p className="recipe-notes-title" aria-hidden="true">
          ✦ Notes ✦
        </p>
        <p>{notes}</p>
      </aside>
      {/* the little dragon, riding a floating spellbook */}
      <div className="notes-perch" aria-hidden="true">
        <DragonArt className="notes-dragon" />
        <svg className="notes-book" viewBox="0 0 120 50" preserveAspectRatio="none">
          <defs>
            <linearGradient id="notes-book-cover" gradientUnits="userSpaceOnUse" x1="0" y1="9" x2="0" y2="23">
              <stop offset="0" stopColor="#6c5bd4" />
              <stop offset="1" stopColor="#3b2f94" />
            </linearGradient>
            <linearGradient id="notes-book-spine" gradientUnits="userSpaceOnUse" x1="0" y1="20.5" x2="0" y2="36">
              <stop offset="0" stopColor="#4c3fae" />
              <stop offset="0.35" stopColor="#6556cc" />
              <stop offset="1" stopColor="#2c2475" />
            </linearGradient>
            <linearGradient id="notes-book-pages-side" gradientUnits="userSpaceOnUse" x1="0" y1="13" x2="0" y2="34">
              <stop offset="0" stopColor="#fdf6e1" />
              <stop offset="1" stopColor="#ead49b" />
            </linearGradient>
            <radialGradient id="notes-book-glow">
              <stop offset="0" stopColor="#b9a8ff" stopOpacity="0.6" />
              <stop offset="1" stopColor="#b9a8ff" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* a soft magic glow on the ground; it stays put while the book bobs above it */}
          <ellipse className="book-shadow" cx="60" cy="46" rx="40" ry="4" fill="url(#notes-book-glow)" />
          <g className="book-body">
            {/* the left end of the book: just its gilded page edges */}
            <path d="M4 9 L12 21 H20 V36 H12 L4 24 Z" fill="url(#notes-book-pages-side)" />
            <path d="M4 12 L12 24 M4 15 L12 27 M4 18 L12 30 M4 21 L12 33" stroke="#d8bf82" strokeWidth="0.45" opacity="0.8" />
            {/* a teal ribbon bookmark: it slips out between two pages (along a page line),
                lies across the page edges, then folds over the bottom edge and hangs down */}
            <path d="M7.1 22.65 L10.3 27.45 V33.45 L7.1 28.65 Z" fill="#3f8f7c" />
            <path d="M7.1 22.65 L10.3 27.45" stroke="#2e6e64" strokeWidth="0.6" strokeLinecap="round" />
            <path d="M7.9 24.2 V29.4" stroke="#6cbca6" strokeWidth="0.5" />
            <g className="book-ribbon">
              <path d="M7.1 28.65 C7.1 35 7.9 38.5 7.6 42.8 L9.2 41.2 L10.8 42.8 C11.1 39 10.3 36 10.3 33.45 Z" fill="#358270" />
              <path d="M7.9 29.6 C7.9 35.5 8.6 38.5 8.4 41.8" fill="none" stroke="#5fae9a" strokeWidth="0.5" />
            </g>
            {/* the front cover on top */}
            <path d="M4 9 H104 L110.6 18.9 Q112 21 109.5 21 H14.5 Q12 21 10.6 18.9 Z" fill="url(#notes-book-cover)" />
            <path d="M18 10 H44 L39 19.5 H12 Z" fill="#ffffff" opacity="0.07" />
            <path d="M17 19 H107 L101.7 11 H11.7 Z" fill="none" stroke="var(--gold)" strokeWidth="0.8" opacity="0.9" />
            <path d="M21 17.5 H103 L99.7 12.5 H17.7 Z" fill="none" stroke="var(--gold)" strokeWidth="0.45" opacity="0.6" />
            {/* the spine, facing us, with raised gold bands and a title plate */}
            <rect x="12" y="20.5" width="100" height="15.5" rx="1.5" fill="url(#notes-book-spine)" />
            <path d="M13.5 23 H110.5 M13.5 33.6 H110.5" stroke="var(--gold)" strokeWidth="0.5" opacity="0.75" />
            <path d="M24 21 V35.5 M28 21 V35.5 M96 21 V35.5 M100 21 V35.5" stroke="var(--gold)" strokeWidth="1.3" />
            <rect x="44" y="24.5" width="36" height="7.6" rx="1.6" fill="#2a2370" stroke="var(--gold)" strokeWidth="0.7" />
            <path d="M62 25.6 Q62 28.3 65.4 28.3 Q62 28.3 62 31 Q62 28.3 58.6 28.3 Q62 28.3 62 25.6Z" fill="var(--gold)" />
            <circle cx="52" cy="28.3" r="0.8" fill="var(--gold)" />
            <circle cx="72" cy="28.3" r="0.8" fill="var(--gold)" />
          </g>
          {/* sparkles of magic around it */}
          <path className="book-sparkle" d="M-1 -1 Q-1 3 3 3 Q-1 3 -1 7 Q-1 3 -5 3 Q-1 3 -1 -1Z" fill="var(--gold)" />
          <path className="book-sparkle book-sparkle-2" d="M116 3 Q116 7 120 7 Q116 7 116 11 Q116 7 112 7 Q116 7 116 3Z" fill="var(--gold)" />
          <path className="book-sparkle book-sparkle-3" d="M118 21.4 Q118 24 120.6 24 Q118 24 118 26.6 Q118 24 115.4 24 Q118 24 118 21.4Z" fill="var(--gold)" />
          <path className="book-sparkle book-sparkle-2" d="M116 37.8 Q116 40 118.2 40 Q116 40 116 42.2 Q116 40 113.8 40 Q116 40 116 37.8Z" fill="var(--gold)" />
          <circle className="book-sparkle book-sparkle-3" cx="13" cy="3" r="0.9" fill="var(--gold)" />
          <circle className="book-sparkle book-sparkle-2" cx="118" cy="15" r="0.8" fill="var(--gold)" />
        </svg>
      </div>
    </div>
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
