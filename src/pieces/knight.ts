import { graph } from '@/constants'
import { Hexchess } from '@/hexchess'
import { getColor } from '@/board'
import type { Color, Direction, Move, Position, Vec } from '@/types'

export function getKnightMoves(hexchess: Hexchess, from: Position, color: Color): Move[] {
  const moves: Move[] = []

  // diagonal direction, first orthogonal direction, second orthogonal direction
  const targets: Vec<6, Vec<3, Direction>> = [
    [1, 0, 2],
    [3, 2, 4],
    [5, 4, 6],
    [7, 6, 8],
    [9, 8, 10],
    [11, 10, 0],
  ]

  for (const [diagonal, orthogonal1, orthagonal2] of targets) {
    const intermediate = graph[from][diagonal]

    if (!intermediate) {
      continue
    }

    const first = graph[intermediate][orthogonal1]

    if (first) {
      const piece = hexchess.board[first]

      if (!piece || color !== getColor(piece)) {
        moves.push({ from, to: first })
      }
    }

    const second = graph[intermediate][orthagonal2]

    if (second) {
      const piece = hexchess.board[second]

      if (!piece || color !== getColor(piece)) {
        moves.push({ from, to: second })
      }
    }
  }

  return moves
}
