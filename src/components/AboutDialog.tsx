import { useEffect, useRef } from 'react'
import { ABOUT_HASH as HASH } from '../about'
import './About.css'
import { DragonArt } from './Dragon'

/**
 * The About section, shown as a modal whenever the URL hash is #about.
 * Built on <dialog> for focus handling, Escape-to-close and the backdrop.
 */
export function AboutDialog() {
  const ref = useRef<HTMLDialogElement>(null)
  // Whether we added the #about history entry ourselves (vs. someone landing on a shared link).
  const pushedRef = useRef(false)
  // Set while a history.back() is in flight, so we never step back twice.
  const leavingRef = useRef(false)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return

    const sync = () => {
      const want = location.hash === HASH
      if (want && !dialog.open) dialog.showModal()
      if (!want && dialog.open) dialog.close()
    }

    const onHashChange = (e: HashChangeEvent) => {
      leavingRef.current = false
      pushedRef.current = new URL(e.newURL).hash === HASH
      sync()
    }

    sync() // handles arriving on /recipes/#about directly
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  /** Take #about back out of the URL. Safe to call more than once. */
  const leaveHash = () => {
    if (location.hash !== HASH || leavingRef.current) return
    if (pushedRef.current) {
      // We added the entry, so step back over it (keeps Back/Forward tidy).
      leavingRef.current = true
      pushedRef.current = false
      history.back()
    } else {
      // Arrived via a shared link: just drop the hash without leaving the site.
      history.replaceState(null, '', location.pathname + location.search)
    }
  }

  const dismiss = () => {
    ref.current?.close()
    leaveHash()
  }

  return (
    <dialog
      ref={ref}
      className="about"
      aria-labelledby="about-title"
      // Fallback for any other way the dialog closes. Chrome fires `close` on the next
      // frame, so ignore a late one that arrives after the dialog was reopened.
      onClose={() => {
        if (!ref.current?.open) leaveHash()
      }}
      onCancel={(e) => {
        e.preventDefault() // Escape: close it ourselves so the URL updates right away
        dismiss()
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) dismiss() // clicked the backdrop
      }}
    >
      <div className="about-card">
        <header className="about-head">
          <DragonArt className="about-dragon" />
          <h2 id="about-title">About</h2>
          <button type="button" className="about-close" aria-label="Close" onClick={dismiss}>
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M4 4 L12 12 M12 4 L4 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </header>

        <div className="about-body">
          <p>
            Hey, I’m Elena, welcome to my corner of the Internet! I built this site to document my recipes, and to share
            with friends and family. I became vegan in 2026, and I wanted a way to still enjoy decadent, delicious recipes
            without hurting any of our animal friends. I began exploring new and different ways of cooking, and realized
            that you can create incredible dishes with plants!
          </p>
          <p>
            I also really wanted to create a recipe site that was, well, actually usable? Fun? Most recipe sites you click
            on will force you to scroll through pages and pages of monologue about the author’s childhood, 57
            advertisements and pop-ups, and only then after shredding through the last bit of your sanity, do you get a
            15-line recipe. On social media it’s even worse. They show these short clips of yummy-looking recipes, force
            you to comment “RECIPE” to generate engagement, and then they send you a link to buy a generic cookbook
            for $65.99. We can do better than this, as a society.
          </p>
          <p>Here are recipes. They are good.</p>

          <button type="button" className="about-cta" onClick={dismiss}>
            Back to Recipes
          </button>
        </div>
      </div>
    </dialog>
  )
}
