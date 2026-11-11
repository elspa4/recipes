import { type RefObject, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router'
import { openAbout } from '../about'
import { DragonButton } from '../components/Dragon'
import { RecipeCard } from '../components/RecipeCard'
import { SearchField } from '../components/SearchField'
import { Sprout } from '../components/Sprout'
import { Starfield } from '../components/Starfield'
import { recipes, type Recipe } from '../data/recipes'
import { MINI_HEADER_HEIGHT } from '../layout'

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
function useScrolledPast(ref: RefObject<Element | null>, initial: boolean) {
  const [past, setPast] = useState(initial)
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

interface Props {
  query: string
  onQueryChange: (q: string) => void
  /** Tells the layout whether the compact header should show (hero search scrolled away). */
  onCompactChange: (compact: boolean) => void
  resultsHeadRef: RefObject<HTMLDivElement | null>
}

export function HomePage({ query, onQueryChange, onCompactChange, resultsHeadRef }: Props) {
  const results = useMemo(() => recipes.filter((r) => matches(r, query)), [query])
  const location = useLocation()
  // Arriving from a search on another page: jump straight to the results.
  const toResults = Boolean((location.state as { toResults?: boolean } | null)?.toResults)

  const heroSearchRef = useRef<HTMLFormElement>(null)
  const compact = useScrolledPast(heroSearchRef, toResults)

  useEffect(() => {
    onCompactChange(compact)
  }, [compact, onCompactChange])

  useLayoutEffect(() => {
    if (toResults) resultsHeadRef.current?.scrollIntoView({ block: 'start' })
  }, [toResults, resultsHeadRef])

  useEffect(() => {
    document.title = 'Granacio · Vegan Recipes'
  }, [])

  return (
    <>
      <header className="hero" id="top">
        <Starfield />
        <div className="hero-frame" aria-hidden="true" />

        <div className="hero-inner">
          <Sprout className="hero-sprout" />
          <p className="hero-kicker" data-avoid-stars>
            The Book of
          </p>
          <h1 className="hero-title" data-avoid-stars>
            Granacio
          </h1>
          <p className="hero-subtitle" data-avoid-stars>
            Vegan Recipes
          </p>
          <p className="flourish" aria-hidden="true" data-avoid-stars>
            <span />✦<span />
          </p>

          {/* the dragon perches on the end of the search bar, gazing up at the title */}
          <div className="search-perch">
            <SearchField id="search" value={query} onChange={onQueryChange} formRef={heroSearchRef} />
            <DragonButton onClick={openAbout} />
          </div>
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
            <button type="button" onClick={() => onQueryChange('')}>
              clear the search
            </button>
          </div>
        )}
      </main>
    </>
  )
}
