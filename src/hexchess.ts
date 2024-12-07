import { createBoard } from './board'
import { getBishopMoves } from './pieces/bishop'
import { getKnightMoves } from './pieces/knight'
import { getQueenMoves } from './pieces/queen'
import { getRookMoves } from './pieces/rook'
import { isPosition, parseBoard } from './board'
import type { Board, Move, Position } from './types'

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
    switch (this.board[position]) {
      case 'b': return getBishopMoves(this, position, 'b')
      case 'B': return getBishopMoves(this, position, 'w')
      case 'n': return getKnightMoves(this, position, 'b')
      case 'N': return getKnightMoves(this, position, 'w')
      case 'q': return getQueenMoves(this, position, 'b')
      case 'Q': return getQueenMoves(this, position, 'w')
      case 'r': return getRookMoves(this, position, 'b')
      case 'R': return getRookMoves(this, position, 'w')
      default: return []
    }
  }
}
