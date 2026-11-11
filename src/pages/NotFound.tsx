import { useEffect } from 'react'
import { Link } from 'react-router'

/** For links that don't lead anywhere (a mistyped address, a removed recipe). */
export function NotFound() {
  useEffect(() => {
    document.title = 'Lost in the woods · Granacio'
  }, [])

  return (
    <main className="page-message">
      <p className="page-message-kicker">✦ Lost in the woods ✦</p>
      <h1>This page wandered off</h1>
      <p>We couldn’t find what you were looking for.</p>
      <Link to="/" className="page-message-link">
        Back to Recipes
      </Link>
    </main>
  )
}
