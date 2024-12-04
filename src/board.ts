import { board } from '@/constants'
import type { Position } from '@/types'

export function step(from: Position, direction: number) {
  return board[from][direction % 12]
}
