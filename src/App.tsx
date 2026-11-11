import { useEffect, useRef, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router'
import './App.css'
import { AboutDialog } from './components/AboutDialog'
import { MiniHeader } from './components/MiniHeader'
import { SparkleTrail } from './components/SparkleTrail'
import { MINI_HEADER_HEIGHT } from './layout'
import { HomePage } from './pages/HomePage'
import { NotFound } from './pages/NotFound'
import { RecipePage } from './pages/RecipePage'

/**
 * Shared layout: the compact header, sparkle trail, About dialog and footer stay
 * mounted across pages, so searching from a recipe page keeps your cursor in place.
 */
function App() {
  const [query, setQuery] = useState('')
  const [homeCompact, setHomeCompact] = useState(false)
  const resultsHeadRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const onHome = location.pathname === '/'

  // Searching from the compact header.
  const searchFromMini = (q: string) => {
    setQuery(q)
    if (!onHome) {
      // On a recipe page: head home, straight to the results, header staying put.
      setHomeCompact(true)
      navigate('/', { state: { toResults: true } })
      return
    }
    // On the home page: if you're scrolled past the results, jump back up to them.
    const head = resultsHeadRef.current
    if (head && head.getBoundingClientRect().top < MINI_HEADER_HEIGHT) {
      head.scrollIntoView({ block: 'start' })
    }
  }

  // New page: start at the top (unless we're jumping to search results).
  useEffect(() => {
    if (!(location.state as { toResults?: boolean } | null)?.toResults) window.scrollTo(0, 0)
  }, [location.pathname, location.state])

  return (
    <>
      <SparkleTrail />
      {/* always shown on recipe pages; on the home page it appears once the hero search scrolls away */}
      <MiniHeader visible={onHome ? homeCompact : true} query={query} onQueryChange={searchFromMini} />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              query={query}
              onQueryChange={setQuery}
              onCompactChange={setHomeCompact}
              resultsHeadRef={resultsHeadRef}
            />
          }
        />
        <Route path="/recipe/:slug" element={<RecipePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <AboutDialog />

      <footer className="footer">
        <span>Granacio Vegan Recipes</span>
        <span aria-hidden="true">✦</span>
        <span>Made with plants &amp; a little magic</span>
      </footer>
    </>
  )
}

export default App
