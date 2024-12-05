import { board } from '@/constants'
import type { Direction, Position } from '@/types'

/**
 * Traverse the board in a given direction
 */
export function walk(from: Position, direction: Direction) {
  const path = [];

  let next = board[from][direction]

  while (next) {
    path.push(next)
    next = board[next][direction]
  }

  return path;
}
