import { Hexchess } from '@/hexchess'
import { getColor } from '@/board'
import { graph } from '@/constants'
import type { Color, Move, PromotionPiece, Position, Vec } from '@/types'

const startingPositions: Record<Color, Vec<9, Position>> = {
  b: ['b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7', 'i7', 'k7'],
  w: ['b1', 'c2', 'd3', 'e4', 'f5', 'g4', 'h3', 'i2', 'k1'],
} as const

const promotions: Record<Color, Vec<4, PromotionPiece>> = {
  b: ['q', 'r', 'b', 'n'],
  w: ['Q', 'R', 'B', 'N'],
} as const

const promotionPositions: Record<Color, Vec<11, Position>> = {
  b: ['a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1', 'i1', 'k1', 'l1'],
  w: ['a6', 'b7', 'c8', 'd9', 'e10', 'f11', 'g10', 'h9', 'i8', 'k7', 'l6'],
} as const

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
        { from: move.from, to: move.to, promotion: promotions[color][0] },
        { from: move.from, to: move.to, promotion: promotions[color][1] },
        { from: move.from, to: move.to, promotion: promotions[color][2] },
        { from: move.from, to: move.to, promotion: promotions[color][3] }
      )
    } else {
      output.push(move)
    }
  }

  return output
}
