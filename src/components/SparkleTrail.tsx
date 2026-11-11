import { useEffect, useRef } from 'react'

// Glowing pastels for the night sky; deeper jewel tones so they still show on the light teal.
const NIGHT_COLORS = ['#e4c47e', '#f3dca0', '#b9a8ec', '#8fd3c0', '#ffffff']
const DAY_COLORS = ['#c9a14f', '#b48f45', '#7d6bc4', '#9a86e0', '#3f8f7c', '#5fb39c']
/** Areas of the page with the dark night-sky background. */
const NIGHT_AREAS = '.hero, .mini-header'
const MAX_PARTICLES = 140
const SPAWN_EVERY_PX = 10 // distance the mouse travels between new sparkles

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  rot: number
  spin: number
  age: number
  life: number
  color: string
  glow: boolean
}

/** Four-point star, the same shape as the sparkles elsewhere on the site. */
function drawSparkle(ctx: CanvasRenderingContext2D, size: number) {
  const k = size * 0.14 // how pinched the waist is
  ctx.beginPath()
  ctx.moveTo(0, -size)
  ctx.quadraticCurveTo(k, -k, size, 0)
  ctx.quadraticCurveTo(k, k, 0, size)
  ctx.quadraticCurveTo(-k, k, -size, 0)
  ctx.quadraticCurveTo(-k, -k, 0, -size)
  ctx.fill()
}

/**
 * A trail of twinkling sparkles that follows the mouse. Mouse-only (no touch),
 * off for reduced motion, and the animation loop sleeps when nothing is moving.
 */
export function SparkleTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const particles: Particle[] = []
    let frame = 0
    let last = 0
    let lastX = -1
    let lastY = -1

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = innerWidth * dpr
      canvas.height = innerHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const spawn = (x: number, y: number, dx: number, dy: number, night: boolean) => {
      if (particles.length >= MAX_PARTICLES) particles.shift()
      const palette = night ? NIGHT_COLORS : DAY_COLORS
      particles.push({
        x: x + (Math.random() - 0.5) * 6,
        y: y + (Math.random() - 0.5) * 6,
        // drift a little opposite the motion, plus some scatter
        vx: -dx * 0.02 + (Math.random() - 0.5) * 0.6,
        vy: -dy * 0.02 + (Math.random() - 0.5) * 0.6 - 0.2,
        size: 2.5 + Math.random() * 5,
        rot: Math.random() * Math.PI,
        spin: (Math.random() - 0.5) * 0.15,
        age: 0,
        life: 550 + Math.random() * 450,
        color: palette[Math.floor(Math.random() * palette.length)],
        glow: night,
      })
    }

    const tick = (now: number) => {
      const dt = last ? Math.min(now - last, 50) : 16
      last = now
      ctx.clearRect(0, 0, innerWidth, innerHeight)

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.age += dt
        if (p.age >= p.life) {
          particles.splice(i, 1)
          continue
        }
        const t = p.age / p.life
        p.vy += 0.012 * (dt / 16) // gentle fall
        p.x += p.vx * (dt / 16)
        p.y += p.vy * (dt / 16)
        p.rot += p.spin * (dt / 16)

        // pop in fast, then shrink and fade, with a little twinkle
        const grow = Math.min(1, t * 6)
        const twinkle = 0.75 + 0.25 * Math.sin(p.age / 60 + p.size)
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        ctx.globalAlpha = (1 - t) * twinkle
        ctx.fillStyle = p.color
        // a soft glow on the dark sky; a faint shadow for definition on light paper
        ctx.shadowColor = p.glow ? p.color : 'rgba(43, 38, 96, 0.25)'
        ctx.shadowBlur = p.glow ? 6 : 3
        drawSparkle(ctx, p.size * grow * (1 - t * 0.6))
        ctx.restore()
      }

      if (particles.length) {
        frame = requestAnimationFrame(tick)
      } else {
        frame = 0 // nothing left to draw: sleep until the mouse moves again
        last = 0
      }
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      if (lastX < 0) {
        lastX = e.clientX
        lastY = e.clientY
        return
      }
      const dx = e.clientX - lastX
      const dy = e.clientY - lastY
      const dist = Math.hypot(dx, dy)
      if (dist < SPAWN_EVERY_PX) return
      const night = !!document.elementFromPoint(e.clientX, e.clientY)?.closest(NIGHT_AREAS)
      // fill in fast swipes so the trail doesn't have gaps
      const steps = Math.min(4, Math.floor(dist / SPAWN_EVERY_PX))
      for (let s = 1; s <= steps; s++) {
        spawn(lastX + (dx * s) / steps, lastY + (dy * s) / steps, dx, dy, night)
      }
      lastX = e.clientX
      lastY = e.clientY
      if (!frame) frame = requestAnimationFrame(tick)
    }

    const onLeave = () => {
      lastX = lastY = -1
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="sparkle-trail" aria-hidden="true" />
}
