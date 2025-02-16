import { error } from './utils'
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

  let black = false
  let white = false
  let j = 0

  for (let i = 0; i < source.length; i++) {
    const current = source[i]
    const position = positions[j]

    switch (current) {
      case '1':
        switch (source[i + 1]) {
          case '0':
            j += 10
            i++
            continue
          case '1':
            j += 11
            i++
            continue
          default:
            j++
            continue
        }
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        j += parseInt(current, 10)
        continue
      case 'K':
        if (white) {
          error('parse failed: multiple white kings')
        }

        white = true
        board[position] = 'K'
        j++
        continue
      case 'k':
        if (black) {
          error('parse failed: multiple black kings')
        }

        black = true
        board[position] = 'k'
        j++
        continue
      case 'b':
      case 'B':
      case 'n':
      case 'N':
      case 'p':
      case 'P':
      case 'Q':
      case 'q':
      case 'r':
      case 'R':
        board[position] = current
        j++
        continue
      case '/':
        continue
    }

    error(`parse failed: invalid piece ${current}`)
  }

  if (j !== 91) {
    error('parse failed: invalid length')
  }

  return board
}

/**
 * Parse move notation
 */
export function parseMove(source: string): Move {
  const fromFile = source[0]

  const fromRank = (source[1] === '1' && (source[2] === '0' || source[2] === '1'))
    ? `${source[1]}${source[2]}`
    : source[1]

  const from = `${fromFile}${fromRank}`

  if (!from || !isPosition(from)) {
    error('parse failed: invalid from position')
  }

  const toFile = source[from.length]

  const toRank = (source[from.length + 1] === '1' && (source[from.length + 2] === '0' || source[from.length + 2] === '1'))
    ? `${source[from.length + 1]}${source[from.length + 2]}`
    : source[from.length + 1]

  const to = `${toFile}${toRank}`

  if (!to || !isPosition(to)) {
    error('parse failed: invalid to position')
  }

  if (from === to) {
    error('parse failed: identical from and to positions')
  }

  const promotion = source[from.length + to.length]

  if (promotion) {
    if (
      promotion === 'b' ||
      promotion === 'n' ||
      promotion === 'q' ||
      promotion === 'r'
    ) {
      if (
        !promotionPositions['b'].includes(to) &&
        !promotionPositions['w'].includes(to)
      ) {
        error('parse failed: invalid promotion position')
      }

      return { from, to, promotion }
    }

    error('parse failed: invalid promotion')
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
