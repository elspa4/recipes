// The dragon's color (an easter egg: click the sprout above "Granacio" to swap it).
// A tiny shared store so the hero dragon and the About dragon always match.
// He always starts purple; a swap lasts until the page is reloaded.
import { useSyncExternalStore } from 'react'

export type DragonColor = 'purple' | 'teal'

/** How far into the poof the color actually swaps: while he's at his smallest, hidden in the puff. */
const SWAP_AT_MS = 280

let color: DragonColor = 'purple'
/** Bumps on every swap, so the poof animation can restart each time. */
let poofCount = 0
const listeners = new Set<() => void>()

function emit() {
  listeners.forEach((l) => l())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

/** Poof! Plays the animation, and swaps the color mid-puff. */
export function swapDragonColor() {
  poofCount++
  emit()
  setTimeout(() => {
    color = color === 'purple' ? 'teal' : 'purple'
    emit()
  }, SWAP_AT_MS)
}

export function useDragonColor() {
  return useSyncExternalStore(subscribe, () => color)
}

export function useDragonPoof() {
  return useSyncExternalStore(subscribe, () => poofCount)
}
