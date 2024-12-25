'use client'

import { useEffect, useRef } from 'react'

export default function WavyAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
    }

    const animate = () => {
      time += 0.01
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw multiple waves with different properties
      drawWave(ctx, time, canvas.height * 0.5, '#e6f7e9', 0.3)
      drawWave(ctx, time * 0.8, canvas.height * 0.6, '#d1f1d7', 0.4)
      drawWave(ctx, time * 1.2, canvas.height * 0.7, '#bae8c2', 0.5)

      animationFrameId = requestAnimationFrame(animate)
    }

    const drawWave = (
      ctx: CanvasRenderingContext2D,
      time: number,
      baseHeight: number,
      color: string,
      amplitude: number
    ) => {
      ctx.beginPath()
      ctx.moveTo(0, canvas.height)

      for (let x = 0; x < canvas.width; x++) {
        const y = Math.sin(x * 0.003 + time) * canvas.height * amplitude + baseHeight
        ctx.lineTo(x, y)
      }

      ctx.lineTo(canvas.width, canvas.height)
      ctx.fillStyle = color
      ctx.fill()
    }

    resize()
    animate()

    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="relative h-32 md:h-40 overflow-hidden bg-gradient-to-b from-white to-green-50">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ filter: 'blur(1px)' }}
      />
    </div>
  )
}

