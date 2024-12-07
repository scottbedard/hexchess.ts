import { Hexchess } from '@/hexchess'
import { walk } from '@/board'
import type { Color, Direction, Move, Position } from '@/types'

export function getBishopMoves(hexchess: Hexchess, from: Position, color: Color): Move[] {
  const moves: Move[] = []

  // 1, 3, 5, 7, 9, 11
  for (let i = 1; i < 12; i += 2) {
    moves.push(
      ...walk(from, i as Direction, hexchess.board, color).map(to => ({ from, to }))
    )
  }

  return moves
}
