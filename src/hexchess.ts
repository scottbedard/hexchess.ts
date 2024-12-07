import { createBoard } from './board'
import { getBishopMoves } from './pieces/bishop'
import { getKingMoves } from './pieces/king'
import { getKnightMoves } from './pieces/knight'
import { getPawnMoves } from './pieces/pawn'
import { getQueenMoves } from './pieces/queen'
import { getRookMoves } from './pieces/rook'
import { isPosition, parseBoard } from './board'
import type { Board, Move, Piece, Position } from './types'

export class Hexchess {
  board: Board = createBoard()

  enPassant: Position | null = null

  turn: 'w' | 'b' = 'w'

  halfmove: number = 0

  fullmove: number = 1

  /**
   * Create new hexchess object from FEN string
   */
  constructor(fen: string = '1/3/5/7/9/11/11/11/11/11/11 w - 0 1') {
    const [
      board = '1/3/5/7/9/11/11/11/11/11/11',
      turn = 'w',
      enPassant = '-',
      halfmove = '0',
      fullmove = '1',
    ] = fen
      .split(' ')
      .map(str => str.trim())
      .filter(str => str)

    this.board = parseBoard(board)

    if (turn === 'w' || turn === 'b') {
      this.turn = turn
    } else {
      throw new Error('Parse fen failed: invalid turn color')
    }

    if (enPassant === '-') {
      this.enPassant = null
    } else if (isPosition(enPassant)) {
      this.enPassant = enPassant
    } else {
      throw new Error('Parse fen failed: invalid en passant')
    }

    this.halfmove = Math.max(0, parseInt(halfmove, 10))

    this.fullmove = Math.max(1, parseInt(fullmove, 10))
  }

  /**
   * Get all legal moves from a position
   */
  moves(position: Position) {
    return this.movesUnsafe(position)
  }

  /**
   * Get all moves from a position, including ones that cause self-check
   */
  private movesUnsafe(position: Position): Move[] {
    const piece = this.board[position]

    if (!piece) {
      return []
    }

    return {
      b: getBishopMoves(this, position, 'b'),
      B: getBishopMoves(this, position, 'w'),
      k: getKingMoves(this, position, 'b'),
      K: getKingMoves(this, position, 'w'),
      n: getKnightMoves(this, position, 'b'),
      N: getKnightMoves(this, position, 'w'),
      p: getPawnMoves(this, position, 'b'),
      P: getPawnMoves(this, position, 'w'),
      q: getQueenMoves(this, position, 'b'),
      Q: getQueenMoves(this, position, 'w'),
      r: getRookMoves(this, position, 'b'),
      R: getRookMoves(this, position, 'w'),
    }[piece]
  }
}
