/**
 * Tile-based office map (~20×14). Each cell is a single character:
 *   . = floor   # = wall   D = desk   P = plant   _ = empty/void
 *
 * Sprites walk on floor tiles only. Desks are impassable but rendered.
 */

export const COLS = 20
export const ROWS = 14
export const TILE = 32

// prettier-ignore
export const tileMap: string[] = [
  '####################',
  '#..................#',
  '#..D..D..D..D..D..#',
  '#..................#',
  '#..P..........P...#',
  '#..................#',
  '#..D..D..D..D..D..#',
  '#..................#',
  '#.......P.........#',
  '#..................#',
  '#..D..D..D..D..D..#',
  '#..................#',
  '#..P..........P...#',
  '####################',
]

export type TileKind = 'floor' | 'wall' | 'desk' | 'plant' | 'void'

export function tileAt(col: number, row: number): TileKind {
  const ch = tileMap[row]?.[col]
  switch (ch) {
    case '.': return 'floor'
    case '#': return 'wall'
    case 'D': return 'desk'
    case 'P': return 'plant'
    default:  return 'void'
  }
}

export function isWalkable(col: number, row: number): boolean {
  return tileAt(col, row) === 'floor'
}
