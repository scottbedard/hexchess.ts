import { isPosition, parseBoard } from './board'
import type { Board, Position } from './types'

export class Hexchess {
  board: Board

  enPassant: Position | null

  turn: 'w' | 'b'

  halfmove: number

  fullmove: number

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
}
