import {
  createBoard,
  getColor,
  isPosition,
  isPromotionPosition,
  parseBoard,
  parseMove,
  stringifyBoard
} from './board'
import { emptyPosition, graph, initialPosition, positions } from './constants'
import { getBishopMoves } from './pieces/bishop'
import { getKingMoves } from './pieces/king'
import { getKnightMoves } from './pieces/knight'
import { getPawnMoves } from './pieces/pawn'
import { getQueenMoves } from './pieces/queen'
import { getRookMoves } from './pieces/rook'
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
  constructor(fen: string = emptyPosition) {
    const [
      board,
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
   * Apply legal moves to the game
   */
  apply(source: string) {
    source
      .split(' ')
      .forEach((notation, index) => {
        const move = parseMove(notation.trim())
        const piece = this.board[move.from]

        if (!piece) {
          throw new Error(`invalid move at position ${index}: ${notation}`)
        }
      })
  }

  /**
   * Apply a move, regardless of turn or legality
   */
  applyUnsafe(move: Move) {
    const piece = this.board[move.from]

    if (!piece) {
      return
    }

    // update halfmove
    if (piece === 'p' || piece === 'P' || this.board[move.to]) {
      this.halfmove = 0
    } else {
      this.halfmove += 1
    }

    // update fullmove and turn color
    const color = getColor(piece)

    if (color === 'b') {
      this.fullmove += 1
      this.turn = 'w'
    } else {
      this.turn = 'b'
    }

    // set to and from positions
    this.board[move.from] = null

    if (
      (piece === 'p' || piece === 'P') &&
      move.promotion &&
      isPromotionPosition(move.to)
    ) {
      this.board[move.to] = color === 'b'
        ? move.promotion.toLowerCase() as Piece
        : move.promotion.toUpperCase() as Piece
    } else {
      this.board[move.to] = piece
    }

    // clear en passant capture
    if (move.to === this.enPassant) {
      if (piece === 'p' || piece === 'P') {
        const sibling = color === 'b'
          ? graph[move.to][0]
          : graph[move.to][6]

        if (sibling) {
          this.board[sibling] = null
        }
      }
    }

    // set en passant
    if (piece === 'p') {
      if (move.from === 'b5' && move.to === 'b7') this.enPassant = 'b6'
      else if (move.from === 'c7' && move.to === 'c5') this.enPassant = 'c6'
      else if (move.from === 'd7' && move.to === 'd5') this.enPassant = 'd6'
      else if (move.from === 'e7' && move.to === 'e5') this.enPassant = 'e6'
      else if (move.from === 'f7' && move.to === 'f5') this.enPassant = 'f6'
      else if (move.from === 'g7' && move.to === 'g5') this.enPassant = 'g6'
      else if (move.from === 'h7' && move.to === 'h5') this.enPassant = 'h6'
      else if (move.from === 'i7' && move.to === 'i5') this.enPassant = 'i6'
      else if (move.from === 'k7' && move.to === 'k5') this.enPassant = 'k6'
    } else if (piece === 'P') {
      if (move.from === 'b1', move.to === 'b3') this.enPassant = 'b2'
      else if (move.from === 'c2', move.to === 'c4') this.enPassant = 'c3'
      else if (move.from === 'd3', move.to === 'd5') this.enPassant = 'd4'
      else if (move.from === 'e4', move.to === 'e6') this.enPassant = 'e5'
      else if (move.from === 'f5', move.to === 'f7') this.enPassant = 'f6'
      else if (move.from === 'g4', move.to === 'g6') this.enPassant = 'g5'
      else if (move.from === 'h3', move.to === 'h5') this.enPassant = 'h4'
      else if (move.from === 'i2', move.to === 'i4') this.enPassant = 'i3'
      else if (move.from === 'k1', move.to === 'k3') this.enPassant = 'k2'
    }
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

  /**
   * Create hexchess in initial position
   */
  static initial() {
    return new Hexchess(initialPosition)
  }

  /**
   * Convert to string
   */
  toString(): string {
    return `${stringifyBoard(this.board)} ${this.turn} ${this.enPassant ?? '-'} ${this.halfmove} ${this.fullmove}`
  }
}
