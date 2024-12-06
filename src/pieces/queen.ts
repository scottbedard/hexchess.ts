import { walk } from '@/board'
import { Hexchess } from '@/hexchess'
import type { Color, Direction, Move, Position } from '@/types'

export function getQueenMoves(hexchess: Hexchess, from: Position, color: Color): Move[] {
  const moves: Move[] = []

  for (let i = 0; i < 12; i++) {
    moves.push(
      ...walk(from, i as Direction, hexchess.board, color).map(to => ({ from, to }))
    )
  }

  return moves
}
