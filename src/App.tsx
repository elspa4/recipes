import { type RefObject, useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { recipes, type Recipe } from './data/recipes'
import { MiniHeader } from './components/MiniHeader'
import { RecipeCard } from './components/RecipeCard'
import { SearchField } from './components/SearchField'
import { Sprout } from './components/Sprout'
import { Starfield } from './components/Starfield'

/** Height of the compact header; keep in sync with --mini-h in App.css. */
const MINI_HEADER_HEIGHT = 64

/** Every word in the query must appear somewhere in the recipe's searchable text. */
function matches(recipe: Recipe, query: string) {
  const haystack = [recipe.name, recipe.category, recipe.blurb, ...(recipe.tags ?? [])].join(' ').toLowerCase()
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word))
}

/** True once the element has scrolled up underneath the compact header. */
function useScrolledPast(ref: RefObject<Element | null>) {
  const [past, setPast] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setPast(!entry.isIntersecting && entry.boundingClientRect.top < MINI_HEADER_HEIGHT),
      { rootMargin: `-${MINI_HEADER_HEIGHT}px 0px 0px 0px` },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref])
  return past
}

function App() {
  const [query, setQuery] = useState('')
  const results = useMemo(() => recipes.filter((r) => matches(r, query)), [query])

  const heroSearchRef = useRef<HTMLFormElement>(null)
  const resultsHeadRef = useRef<HTMLDivElement>(null)
  const compact = useScrolledPast(heroSearchRef)

  // Searching from the compact header: if you're scrolled past the top of the
  // results, jump back up so the filtered list starts right under the bar.
  const searchFromMini = (q: string) => {
    setQuery(q)
    const head = resultsHeadRef.current
    if (head && head.getBoundingClientRect().top < MINI_HEADER_HEIGHT) {
      head.scrollIntoView({ block: 'start' })
    }
  }

  return (
    <>
      <MiniHeader visible={compact} query={query} onQueryChange={searchFromMini} />

      <header className="hero" id="top">
        <Starfield />
        <div className="hero-frame" aria-hidden="true" />

        <div className="hero-inner">
          <Sprout className="hero-sprout" />
          <p className="hero-kicker" data-avoid-stars>The Book of</p>
          <h1 className="hero-title" data-avoid-stars>Granacio</h1>
          <p className="hero-subtitle" data-avoid-stars>Vegan Recipes</p>
          <p className="flourish" aria-hidden="true" data-avoid-stars>
            <span />✦<span />
          </p>
          <p className="hero-tagline" data-avoid-stars>Enchanted fare from the garden &amp; the hearth</p>

          <SearchField id="search" value={query} onChange={setQuery} formRef={heroSearchRef} />
        </div>

        <svg className="hero-hills" viewBox="0 0 1440 160" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 90 L180 40 L360 95 L560 30 L760 100 L980 45 L1180 90 L1440 35 V160 H0Z" fill="#2c2667" />
          <path d="M0 120 L240 70 L470 125 L700 75 L930 125 L1180 80 L1440 115 V160 H0Z" fill="#221e55" />
          <path d="M0 160 V135 Q720 100 1440 135 V160Z" fill="var(--paper)" />
        </svg>
      </header>

      <main className="recipes">
        <div className="recipes-head" ref={resultsHeadRef}>
          <h2>All Recipes</h2>
          <p aria-live="polite">
            {results.length} {results.length === 1 ? 'recipe' : 'recipes'}
            {query && ' found'}
          </p>
        </div>

        {results.length > 0 ? (
          <div className="grid">
            {results.map((r) => (
              <RecipeCard key={r.slug} recipe={r} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <p className="empty-title">No spell matches “{query}”</p>
            <p>Try another ingredient, or</p>
            <button type="button" onClick={() => setQuery('')}>
              clear the search
            </button>
          </div>
        )}
      </main>

      <footer className="footer">
        <span>Granacio Vegan Recipes</span>
        <span aria-hidden="true">✦</span>
        <span>Made with plants &amp; a little magic</span>
      </footer>
    </>
  )
}

export default App
