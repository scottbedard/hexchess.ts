import { graph, positions, promotionPositions } from './constants'
import type { Board, Color, Direction, Move, Piece, Position } from './types'

/**
 * Create board object
 */
export function createBoard() {
  return positions.reduce((acc, p) => {
    acc[p] = null
    return acc
  }, {} as Board)
}

/**
 * Get the color of a piece
 */
export function getColor(piece: Piece): Color {
  return piece === 'k' || piece === 'q' || piece === 'r' || piece === 'b' || piece === 'n' || piece === 'p'
    ? 'b'
    : 'w'
}

/**
 * Check if a string is a valid position
 */
export function isPosition(source: string): source is Position {
  return source in graph
}

/**
 * Parse a board string
 */
export function parseBoard(source: string): Board {
  const board = createBoard()

  let normalized = ''

  for (let i = 0; i < source.length; i++) {
    const current = source[i]

    if (current === '1') {
      const next = source[i + 1]

      if (next === '0') {
        i++
        normalized += '__________'
      } else if (next === '1') {
        i++
        normalized += '___________'
      } else {
        normalized += '_'
      }
    } else if (current === '2') {
      normalized += '__'
    } else if (current === '3') {
      normalized += '___'
    } else if (current === '4') {
      normalized += '____'
    } else if (current === '5') {
      normalized += '_____'
    } else if (current === '6') {
      normalized += '______'
    } else if (current === '7') {
      normalized += '_______'
    } else if (current === '8') {
      normalized += '________'
    } else if (current === '9') {
      normalized += '_________'
    } else if (current !== '/') {
      normalized += source[i]
    }
  }

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

/**
 * Parse move notation
 */
export function parseMove(source: string): Move {
  const from = positions.find(position => source.startsWith(position))

  if (!from) {
    throw new Error('Parse move failed: invalid from position')
  }

  let rest = source.slice(from.length)

  const to = positions.find(position => rest.startsWith(position))

  if (!to) {
    throw new Error('Parse move failed: invalid to position')
  }

  if (from === to) {
    throw new Error('Parse move failed: identical from and to positions')
  }

  rest = rest.slice(to.length)

  if (rest) {
    if (
      rest === 'b' ||
      rest === 'n' ||
      rest === 'q' ||
      rest === 'r'
    ) {
      if (
        !promotionPositions['b'].includes(to) &&
        !promotionPositions['w'].includes(to)
      ) {
        throw new Error('Parse move failed: invalid promotion position')
      }

      return { from, to, promotion: rest }
    }

    throw new Error('Parse move failed: invalid promotion')
  }

  return { from, to }
}

/**
 * Step along the board in a given direction, capturing enemy pieces
 */
export function step(
  from: Position,
  direction: Direction,
  board: Board,
  color: Color
): Position | undefined {
  const position = graph[from][direction]

  if (position) {
    const piece = board[position]

    if (!piece || getColor(piece) !== color) {
      return position
    }
  }
}

/**
 * Stringify board
 */
export function stringifyBoard(board: Board): string {
  let blank = 0
  let current
  let output = ''

  for (let i = 0; i < positions.length; i++) {
    current = board[positions[i]]

    if (current) {
      if (blank) {
        output += blank
        blank = 0
      }

      output += current
    } else {
      blank++
    }

    if (
      i === 0 ||
      i === 3 ||
      i === 8 ||
      i === 15 ||
      i === 24 ||
      i === 35 ||
      i === 46 ||
      i === 57 ||
      i === 68 ||
      i === 79
    ) {
      output += (blank || '') + '/'
      blank = 0
    }
  }

  if (blank) {
    output += blank
  }

  return output
}

/**
 * Stringify move
 */
export function stringifyMove(move: Move): string {
  return `${move.from}${move.to}${move.promotion || ''}`
}

/**
 * Traverse the board in a given direction
 */
export function walk(
  from: Position,
  direction: Direction,
  board: Board,
  color: Color
): Position[] {
  const path: Position[] = []

  let next: Position | undefined = step(from, direction, board, color)

  while(next) {
    path.push(next)

    const occupied = board[next] !== null

    next = step(next, direction, board, color)

    if (occupied) {
      break
    }
  }

  return path
}
