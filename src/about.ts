/** URL hash that shows the About dialog. Shareable: /recipes/#about opens straight to it. */
export const ABOUT_HASH = '#about'

/** Open the About dialog by pointing the URL at #about (so Back closes it). */
export function openAbout() {
  if (location.hash !== ABOUT_HASH) location.hash = ABOUT_HASH
}
