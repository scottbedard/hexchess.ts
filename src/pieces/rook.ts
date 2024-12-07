import { Hexchess } from '@/hexchess'
import { walk } from '@/board'
import type { Color, Direction, Move, Position } from '@/types'

export function getRookMoves(hexchess: Hexchess, from: Position, color: Color): Move[] {
  const moves: Move[] = []

  // 0, 2, 4, 6, 8, 10
  for (let i = 0; i < 12; i += 2) {
    moves.push(
      ...walk(from, i as Direction, hexchess.board, color).map(to => ({ from, to }))
    )
  }

  return moves
}
