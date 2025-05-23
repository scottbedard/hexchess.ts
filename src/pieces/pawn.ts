import { Hexchess } from '@/hexchess'
import { getColor } from '@/board'
import { graph, promotionPositions, startingPositions } from '@/constants'
import type { Color, Move, Position } from '@/types'

export function getPawnMoves(hexchess: Hexchess, from: Position, color: Color): Move[] {
  const moves: Move[] = []

  const [
    advanceDirection,
    portsideDirection,
    starboardDirection,
  ] = color === 'w'
    ? [0, 10, 2]
    : [6, 4, 8]

  // advance forward one position
  const forward = graph[from][advanceDirection]

  if (forward &&!hexchess.board[forward]) {
    moves.push({ from, to: forward })

    // advance forward another position if possible
    if (startingPositions[color].includes(from)) {
      const forward2 = graph[forward][advanceDirection]

      if (forward2 && !hexchess.board[forward2]) {
        moves.push({ from, to: forward2 })
      }
    }
  }

  // capture portside
  const portside = graph[from][portsideDirection]

  if (portside) {
    const piece = hexchess.board[portside]

    if (
      (piece && getColor(piece) !== color) ||
      (hexchess.ep === portside && hexchess.turn === color)
    ) {
      moves.push({ from, to: portside })
    }
  }

  // capture starboard
  const starboard = graph[from][starboardDirection]

  if (starboard) {
    const piece = hexchess.board[starboard]

    if (
      (piece && getColor(piece) !== color) ||
      (hexchess.ep === starboard && hexchess.turn === color)
    ) {
      moves.push({ from, to: starboard })
    }
  }

  // expand promotions
  for (let i = 0; i < moves.length; i++) {
    const { from, to } = moves[i]

    if (promotionPositions[color].includes(to)) {
      moves.splice(i, 1,
        { from, to, promotion: 'q' },
        { from, to, promotion: 'r' },
        { from, to, promotion: 'b' },
        { from, to, promotion: 'n' }
      )

      i += 4
    }
  }

  return moves
}
