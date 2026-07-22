import { COLS, ROWS, isWalkable } from './officeMap'

interface Point { x: number; y: number }

const DIRS: Point[] = [
  { x: 0, y: -1 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
  { x: 1, y: 0 },
]

/**
 * BFS shortest path from start to end on the walkable grid.
 * Returns the path as an array of grid coordinates (excluding start),
 * or an empty array if no path exists.
 */
export function bfsPath(start: Point, end: Point): Point[] {
  if (start.x === end.x && start.y === end.y) return []
  if (!isWalkable(end.x, end.y)) return []

  const key = (p: Point) => `${p.x},${p.y}`
  const visited = new Set<string>([key(start)])
  const parent = new Map<string, Point>()
  const queue: Point[] = [start]

  while (queue.length > 0) {
    const current = queue.shift()!
    for (const dir of DIRS) {
      const next: Point = { x: current.x + dir.x, y: current.y + dir.y }
      if (next.x < 0 || next.x >= COLS || next.y < 0 || next.y >= ROWS) continue
      if (!isWalkable(next.x, next.y)) continue
      const k = key(next)
      if (visited.has(k)) continue
      visited.add(k)
      parent.set(k, current)
      if (next.x === end.x && next.y === end.y) {
        const path: Point[] = []
        let p: Point | undefined = next
        while (p && !(p.x === start.x && p.y === start.y)) {
          path.unshift(p)
          p = parent.get(key(p))
        }
        return path
      }
      queue.push(next)
    }
  }
  return []
}

/** Pick a random walkable tile on the grid. */
export function randomWalkable(): Point {
  const walkable: Point[] = []
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (isWalkable(x, y)) walkable.push({ x, y })
    }
  }
  return walkable[Math.floor(Math.random() * walkable.length)]
}
