import type { Ref } from 'react'

interface Props {
  id: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  formRef?: Ref<HTMLFormElement>
}

/** Gold-rimmed search pill. Used in the hero and in the compact header, both bound to the same query. */
export function SearchField({ id, value, onChange, placeholder = 'Search the grimoire…', className = '', formRef }: Props) {
  return (
    <form ref={formRef} className={`search ${className}`} role="search" onSubmit={(e) => e.preventDefault()} data-avoid-stars>
      <label htmlFor={id} className="visually-hidden">
        Search recipes
      </label>
      <svg viewBox="0 0 24 24" className="search-icon" aria-hidden="true">
        <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M15.5 15.5L20 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      <input
        id={id}
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
      />
    </form>
  )
}
