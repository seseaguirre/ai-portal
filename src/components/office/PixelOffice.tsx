import { useEffect, useRef, useState, useCallback } from 'react'
import { Application, Graphics, Sprite, Container } from 'pixi.js'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import { COLS, ROWS, TILE } from './officeMap'
import { drawTileMap, createCharTextures, drawBubble } from './spriteFactory'
import { bfsPath, randomWalkable } from './pathfinding'
import { AgentCard } from './AgentCard'
import { officeAgents } from '@/data/office-agents'
import type { OfficeAgent } from '@/types'

interface AgentState {
  agent: OfficeAgent
  sprite: Sprite
  frame: number
  textures: [any, any]
  path: { x: number; y: number }[]
  pathIndex: number
  walkTimer: number
  home: { x: number; y: number }
}

export function PixelOffice() {
  const containerRef = useRef<HTMLDivElement>(null)
  const appRef = useRef<Application | null>(null)
  const statesRef = useRef<AgentState[]>([])
  const [selected, setSelected] = useState<{ agent: OfficeAgent; x: number; y: number } | null>(null)
  const [initError, setInitError] = useState(false)
  const theme = useTheme()
  const tokens = theme.tokens

  const handleSpriteClick = useCallback((agent: OfficeAgent, sprite: Sprite) => {
    const bounds = containerRef.current?.getBoundingClientRect()
    if (!bounds) return
    setSelected({
      agent,
      x: Math.min(sprite.x, bounds.width - 290),
      y: Math.max(sprite.y - 120, 0),
    })
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const width = COLS * TILE
    const height = ROWS * TILE
    const app = new Application()
    let destroyed = false

    app.init({
      width,
      height,
      backgroundAlpha: 0,
      resolution: 2,
      autoDensity: true,
      antialias: false,
    }).then(() => {
      if (destroyed) { app.destroy(); return }
      appRef.current = app
      el.appendChild(app.canvas)
      app.canvas.style.imageRendering = 'pixelated'

      // Draw tile map
      const bg = new Graphics()
      drawTileMap(bg, tokens)
      app.stage.addChild(bg)

      // Overlay container for bubbles
      const overlay = new Container()

      // Create agent sprites
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const states: AgentState[] = officeAgents
        .filter((a) => a.status !== 'away')
        .map((agent, i) => {
          const [tex0, tex1] = createCharTextures(i)
          const sprite = new Sprite(tex0)
          sprite.x = agent.desk.x * TILE + 8
          sprite.y = agent.desk.y * TILE + 4
          sprite.width = 16
          sprite.height = 16
          sprite.eventMode = 'static'
          sprite.cursor = 'pointer'
          sprite.on('pointerdown', () => handleSpriteClick(agent, sprite))
          app.stage.addChild(sprite)
          return {
            agent,
            sprite,
            frame: 0,
            textures: [tex0, tex1] as [any, any],
            path: [],
            pathIndex: 0,
            walkTimer: 3000 + Math.random() * 5000,
            home: { x: agent.desk.x, y: agent.desk.y },
          }
        })
      statesRef.current = states
      app.stage.addChild(overlay)

      if (reducedMotion) return

      // Ticker loop
      let elapsed = 0
      app.ticker.add((ticker) => {
        elapsed += ticker.deltaMS
        overlay.removeChildren()

        for (const s of states) {
          // 2-frame idle animation every 600ms
          if (Math.floor(elapsed / 600) % 2 === 0) {
            s.sprite.texture = s.textures[0]
          } else {
            s.sprite.texture = s.textures[1]
          }

          // Blocked: draw speech bubble
          if (s.agent.status === 'blocked') {
            const bubble = new Graphics()
            drawBubble(bubble, s.sprite.x + 8, s.sprite.y, tokens)
            overlay.addChild(bubble)
          }

          // Walking logic
          if (s.path.length > 0 && s.pathIndex < s.path.length) {
            const target = s.path[s.pathIndex]
            const tx = target.x * TILE + 8
            const ty = target.y * TILE + 4
            const dx = tx - s.sprite.x
            const dy = ty - s.sprite.y
            const speed = 1.5
            if (Math.abs(dx) < speed && Math.abs(dy) < speed) {
              s.sprite.x = tx
              s.sprite.y = ty
              s.pathIndex++
            } else {
              s.sprite.x += Math.sign(dx) * speed
              s.sprite.y += Math.sign(dy) * speed
            }
          } else if (s.path.length > 0) {
            // Walk back home
            const current = s.path[s.path.length - 1]
            const homePath = bfsPath(current, s.home)
            if (homePath.length > 0) {
              s.path = homePath
              s.pathIndex = 0
            } else {
              s.path = []
            }
          } else {
            // Maybe start a walk
            s.walkTimer -= ticker.deltaMS
            if (s.walkTimer <= 0 && s.agent.status === 'idle') {
              const dest = randomWalkable()
              const path = bfsPath(s.home, dest)
              if (path.length > 0 && path.length < 12) {
                s.path = path
                s.pathIndex = 0
              }
              s.walkTimer = 4000 + Math.random() * 6000
            }
          }
        }
      })

      // Pause when off-screen
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            app.ticker.start()
          } else {
            app.ticker.stop()
          }
        },
        { threshold: 0.05 },
      )
      observer.observe(el)
    }).catch(() => {
      setInitError(true)
    })

    return () => {
      destroyed = true
      if (appRef.current) {
        appRef.current.destroy(true)
        appRef.current = null
      }
    }
  }, [tokens, handleSpriteClick])

  if (initError) throw new Error('PixiJS init failed')

  return (
    <Box sx={{ position: 'relative', width: COLS * TILE, maxWidth: '100%', mx: 'auto' }}>
      <Box
        ref={containerRef}
        sx={{
          width: COLS * TILE,
          height: ROWS * TILE,
          maxWidth: '100%',
          overflow: 'hidden',
          borderRadius: 2,
          imageRendering: 'pixelated',
        }}
      />
      {selected && (
        <AgentCard
          agent={selected.agent}
          onClose={() => setSelected(null)}
          style={{ left: selected.x, top: selected.y }}
        />
      )}
    </Box>
  )
}
