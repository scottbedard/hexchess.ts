import { positions } from '@/constants'
import { createBoard } from './board'

/**
 * Parse a board string
 */
export function parseBoard(source: string) {
  const board = createBoard()

  const normalized = source
    .replaceAll('11', '___________')
    .replaceAll('10', '__________')
    .replaceAll('9', '_________')
    .replaceAll('8', '________')
    .replaceAll('7', '_______')
    .replaceAll('6', '______')
    .replaceAll('5', '_____')
    .replaceAll('4', '____')
    .replaceAll('3', '___')
    .replaceAll('2', '__')
    .replaceAll('1', '_')
    .replaceAll('/', '')

  if (normalized.length !== positions.length) {
    throw new Error('Parse board failed: invalid length')
  }

  let black = false
  let white = false

  for (let i = 0; i < positions.length; i++) {
    const piece = normalized[i]
    const position = positions[i]

    if (piece === 'k') {
      if (black) {
        throw new Error('Parse board failed: multiple black kings')
      }

      black = true
      board[position] = 'k'
    } else if (piece === 'K') {
      if (white) {
        throw new Error('Parse board failed: multiple white kings')
      }

      white = true
      board[position] = 'K'
    } else if (
      piece === 'p' ||
      piece === 'r' ||
      piece === 'n' ||
      piece === 'b' ||
      piece === 'q' ||
      piece === 'P' ||
      piece === 'R' ||
      piece === 'N' ||
      piece === 'B' ||
      piece === 'Q'
    ) {
      board[position] = piece
    } else if (piece !== '_') {
      throw new Error('Parse board failed: invalid piece')
    }
  }

  return board
}
