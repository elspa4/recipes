import { useRef, useState } from 'react'

interface Props {
  id: string
  value: string
  onChange: (value: string) => void
  /** When false (e.g. the header is tucked away), an empty search folds back into its circle. */
  active: boolean
}

/**
 * A gold-rimmed circle with a magnifying glass that unrolls into a search field.
 * Stays open while there's a query so an active filter is never hidden.
 */
export function ExpandingSearch({ id, value, onChange, active }: Props) {
  const [opened, setOpened] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const open = opened || value !== ''

  // When the header tucks away, fold the search back up (React's
  // "adjust state when a prop changes" pattern, no effect needed).
  const [wasActive, setWasActive] = useState(active)
  if (active !== wasActive) {
    setWasActive(active)
    if (!active) setOpened(false)
  }

  const expand = () => {
    setOpened(true)
    inputRef.current?.focus({ preventScroll: true })
  }

  const collapse = () => {
    setOpened(false)
    inputRef.current?.blur()
  }

  return (
    <form
      className="mini-search"
      data-open={open}
      role="search"
      onSubmit={(e) => e.preventDefault()}
      onBlur={(e) => {
        // Fold back up when focus leaves the search entirely and nothing's typed.
        if (!e.currentTarget.contains(e.relatedTarget) && value === '') setOpened(false)
      }}
    >
      <button
        type="button"
        className="mini-search-toggle"
        aria-label="Search recipes"
        aria-expanded={open}
        aria-controls={id}
        onClick={expand}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="M15.5 15.5L20 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>
      <label htmlFor={id} className="visually-hidden">
        Search recipes
      </label>
      <input
        ref={inputRef}
        id={id}
        type="search"
        placeholder="Search the grimoire…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Escape' && value === '') collapse()
        }}
        tabIndex={open ? 0 : -1}
        autoComplete="off"
      />
    </form>
  )
}
