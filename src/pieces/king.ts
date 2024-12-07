import { Hexchess } from '@/hexchess'
import { step } from '@/board'
import type { Color, Direction, Move, Position } from '@/types'

export function getKingMoves(hexchess: Hexchess, from: Position, color: Color): Move[] {
  const moves: Move[] = []

  // 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
  for (let i = 0; i < 12; i++) {
    const to = step(from, i as Direction, hexchess.board, color)
    
    if (to) {
      moves.push({ from, to })
    }
  }

  return moves
}
