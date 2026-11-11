// Regenerates the downloadable recipe PDFs from the site itself, so they always
// match the recipe pages. Prints each recipe that has full details using the
// page's print styles (see the "Print / PDF" section of RecipePage.css).
//
//   npm run pdfs
//
// Needs Google Chrome installed (set CHROME_PATH to use another Chromium build).
// Writes public/pdfs/<slug>.pdf; a recipe gets a Download button once its
// `pdf` field in src/data/recipes.ts points at that file.

import { spawn, execFileSync } from 'node:child_process'
import { mkdtempSync, rmSync, statSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { recipes } from '../src/data/recipes.ts'

const PORT = 4180
const BASE = `http://localhost:${PORT}/recipes`
const CHROME = process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const OUT_DIR = resolve(import.meta.dirname, '../public/pdfs')

async function waitForServer(url, timeoutMs = 15000) {
  const start = Date.now()
  while (Date.now() - start < timeoutMs) {
    try {
      if ((await fetch(url)).ok) return
    } catch {
      // not up yet
    }
    await new Promise((r) => setTimeout(r, 250))
  }
  throw new Error(`Preview server didn't start at ${url}`)
}

// Serve the built site (run `npm run build` first; `npm run pdfs` does that for you).
const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], {
  cwd: resolve(import.meta.dirname, '..'),
  stdio: 'ignore',
})

// A throwaway Chrome profile, so this never touches your own browser.
const profile = mkdtempSync(join(tmpdir(), 'granacio-pdf-'))

try {
  await waitForServer(`${BASE}/`)
  const toPrint = recipes.filter((r) => r.details)
  for (const recipe of toPrint) {
    const out = join(OUT_DIR, `${recipe.slug}.pdf`)
    execFileSync(CHROME, [
      '--headless=new',
      '--disable-gpu',
      `--user-data-dir=${profile}`,
      '--no-pdf-header-footer',
      '--virtual-time-budget=10000', // let web fonts and the photo load
      `--print-to-pdf=${out}`,
      `${BASE}/recipe/${recipe.slug}`,
    ], { stdio: 'ignore' })
    const kb = Math.round(statSync(out).size / 1024)
    const linked = recipe.pdf === `pdfs/${recipe.slug}.pdf` ? '' : `  (set pdf: 'pdfs/${recipe.slug}.pdf' to show the Download button)`
    console.log(`✦ ${recipe.name} → public/pdfs/${recipe.slug}.pdf (${kb} KB)${linked}`)
  }
} finally {
  server.kill()
  rmSync(profile, { recursive: true, force: true })
}
