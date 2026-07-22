import { Texture, Graphics } from 'pixi.js'
import { TILE, COLS, ROWS, tileAt } from './officeMap'
import type { DesignTokens } from '@/theme/tokens'

const agentPalettes = [
  '#4A90D9', '#D94A7A', '#4AD9A5', '#D9A54A',
  '#7A4AD9', '#D9544A', '#4AD9D9', '#8BD94A',
  '#D94AD9', '#4A6DD9',
]

function makeCharCanvas(color: string, offsetY: number): HTMLCanvasElement {
  const c = document.createElement('canvas')
  c.width = 16
  c.height = 16
  const ctx = c.getContext('2d')!
  // Head
  ctx.fillStyle = color
  ctx.fillRect(5, offsetY, 6, 6)
  // Body
  ctx.fillRect(4, offsetY + 7, 8, 6)
  // Eyes
  ctx.fillStyle = '#FFFFFF'
  ctx.fillRect(6, offsetY + 2, 2, 2)
  ctx.fillRect(9, offsetY + 2, 2, 2)
  return c
}

/** Create two textures for a 2-frame idle bob animation. */
export function createCharTextures(agentIndex: number): [Texture, Texture] {
  const color = agentPalettes[agentIndex % agentPalettes.length]
  const c1 = makeCharCanvas(color, 0)
  const c2 = makeCharCanvas(color, 1)
  return [Texture.from({ resource: c1 }), Texture.from({ resource: c2 })]
}

export function drawTileMap(g: Graphics, tokens: DesignTokens) {
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const kind = tileAt(x, y)
      const px = x * TILE
      const py = y * TILE

      switch (kind) {
        case 'wall':
          g.rect(px, py, TILE, TILE).fill(tokens.color.brand.primaryStrong)
          break
        case 'floor':
          g.rect(px, py, TILE, TILE).fill(tokens.color.surface.raised)
          g.rect(px, py, TILE, 1).fill(tokens.color.border.subtle)
          g.rect(px, py, 1, TILE).fill(tokens.color.border.subtle)
          break
        case 'desk':
          g.rect(px, py, TILE, TILE).fill(tokens.color.surface.raised)
          g.rect(px + 4, py + 4, TILE - 8, TILE - 8).fill(tokens.color.surface.sunken)
          break
        case 'plant':
          g.rect(px, py, TILE, TILE).fill(tokens.color.surface.raised)
          g.rect(px + 10, py + 20, 12, 10).fill(tokens.color.status.sandbox)
          g.rect(px + 8, py + 6, 16, 14).fill(tokens.color.status.certified)
          break
      }
    }
  }
}

/** Speech-bubble glyph for blocked status. */
export function drawBubble(g: Graphics, x: number, y: number, tokens: DesignTokens) {
  g.roundRect(x - 10, y - 18, 20, 14, 4).fill(tokens.color.status.dangerSurface)
  g.rect(x - 3, y - 14, 6, 2).fill(tokens.color.status.danger)
  g.rect(x - 1, y - 10, 2, 2).fill(tokens.color.status.danger)
}
