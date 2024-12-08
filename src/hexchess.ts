import { createBoard } from './board'
import { getBishopMoves } from './pieces/bishop'
import { getKingMoves } from './pieces/king'
import { getKnightMoves } from './pieces/knight'
import { getPawnMoves } from './pieces/pawn'
import { getQueenMoves } from './pieces/queen'
import { getRookMoves } from './pieces/rook'
import { isPosition, parseBoard } from './board'
import { positions } from './constants'
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
   * Find a player's king
   */
  findKing(color: 'w' | 'b'): Position | null {
    const char = color === 'w' ? 'K' : 'k'

    for (let i = 0; i < positions.length; i++) {
      if (this.board[positions[i]] === char) {
        return positions[i]
      }
    }

    return null
  }

  /**
   * Get all legal moves from a position
   */
  moves(position: Position) {
    const unsafe = (pos: Position) => {
      const piece = this.board[pos]

      if (!piece) {
        return []
      }

      return {
        b: getBishopMoves(this, pos, 'b'),
        B: getBishopMoves(this, pos, 'w'),
        k: getKingMoves(this, pos, 'b'),
        K: getKingMoves(this, pos, 'w'),
        n: getKnightMoves(this, pos, 'b'),
        N: getKnightMoves(this, pos, 'w'),
        p: getPawnMoves(this, pos, 'b'),
        P: getPawnMoves(this, pos, 'w'),
        q: getQueenMoves(this, pos, 'b'),
        Q: getQueenMoves(this, pos, 'w'),
        r: getRookMoves(this, pos, 'b'),
        R: getRookMoves(this, pos, 'w'),
      }[piece]
    }
    
    return unsafe(position)
  }
}
