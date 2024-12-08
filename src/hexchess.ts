import {
  createBoard,
  getColor,
  isPosition,
  parseBoard,
  parseMove,
  stringifyBoard
} from './board'
import { getBishopMoves } from './pieces/bishop'
import { getKingMoves } from './pieces/king'
import { getKnightMoves } from './pieces/knight'
import { getPawnMoves } from './pieces/pawn'
import { getQueenMoves } from './pieces/queen'
import { getRookMoves } from './pieces/rook'
import { graph, initialPosition, positions, promotionPositions } from './constants'
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
  constructor(fen?: string) {
    if (!fen) {
      return
    }

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
    const clone = this.clone()

    const sequence = source
      .split(' ')
      .map(str => str.trim())
      .filter(str => str)

    for (let i = 0; i < sequence.length; i++) {
      const move = parseMove(sequence[i])

      const piece = clone.board[move.from]

      if (!piece) {
        throw new Error(`invalid move at index ${i}: ${sequence[i]}`)
      }

      if (getColor(piece) !== clone.turn) {
        throw new Error(`invalid move at index ${i}: out of turn}`)
      }

      clone.applyUnsafe(move)
    }

    this.turn = clone.turn
    this.enPassant = clone.enPassant
    this.halfmove = clone.halfmove
    this.fullmove = clone.fullmove

    for (const position of positions) {
      this.board[position] = clone.board[position]
    }
  }

  /**
   * Clone hexchess instance
   */
  clone() {
    const hexchess = new Hexchess()

    hexchess.board = { ...this.board }
    hexchess.enPassant = this.enPassant
    hexchess.turn = this.turn
    hexchess.halfmove = this.halfmove
    hexchess.fullmove = this.fullmove

    return hexchess
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

    if (move.promotion) {
      if (piece === 'p' && promotionPositions.b.includes(move.to)) {
        this.board[move.to] = move.promotion.toLowerCase() as Piece
      } else if (piece === 'P' && promotionPositions.w.includes(move.to)) {
        this.board[move.to] = move.promotion.toUpperCase() as Piece
      } else {
        throw new Error(`illegal promotion: ${move.from}${move.to}${move.promotion}`)
      }
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
      if (move.from === 'b7' && move.to === 'b5') this.enPassant = 'b6'
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
   * Test if a position is threatened
   */
  isThreatened(position: Position) {
    const piece = this.board[position]

    if (!piece) {
      return false
    }

    const color = getColor(piece)

    for (let i = 0; i < positions.length; i++) {
      const piece = this.board[positions[i]]

      if (!piece || getColor(piece) === color) {
        continue
      }

      if (this.movesUnsafe(positions[i]).some(move => move.to === position)) {
        return true
      }
    }

    return false
  }

  /**
   * Get all legal moves from a position
   */
  moves(position: Position) {
    const piece = this.board[position]

    if (!piece) {
      return []
    }

    const color = getColor(piece)

    return this
      .movesUnsafe(position)
      .filter(move => {
        const clone = this.clone()

        clone.applyUnsafe(move)

        const king = clone.findKing(color)

        if (king && clone.isThreatened(king)) {
          return false
        }

        return true
      })
  }

  /**
   * Get all moves from a position, including ones that result in self-check
   */
  movesUnsafe(position: Position) {
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
