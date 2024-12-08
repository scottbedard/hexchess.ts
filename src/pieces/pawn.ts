import { Hexchess } from '@/hexchess'
import { getColor } from '@/board'
import { graph, promotionPositions, startingPositions } from '@/constants'
import type { Color, Move, Position, Vec } from '@/types'

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
      (hexchess.enPassant === portside && hexchess.turn === color)
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
      (hexchess.enPassant === starboard && hexchess.turn === color)
    ) {
      moves.push({ from, to: starboard })
    }
  }

  // expand promotions
  const output: Move[] = []

  for (let i = 0; i < moves.length; i++) {
    const move = moves[i]!

    if (promotionPositions[color].includes(move.to)) {
      output.push(
        { from: move.from, to: move.to, promotion: 'q' },
        { from: move.from, to: move.to, promotion: 'r' },
        { from: move.from, to: move.to, promotion: 'b' },
        { from: move.from, to: move.to, promotion: 'n' }
      )
    } else {
      output.push(move)
    }
  }

  return output
}
