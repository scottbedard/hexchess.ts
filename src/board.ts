import { graph, positions } from '@/constants'
import type { Board, Color, Direction, Piece, Position } from '@/types'

/**
 * Create board object
 */
export function createBoard(): Board {
  return {
    f11: null,
    e10: null,
    f10: null,
    g10: null,
    d9: null,
    e9: null,
    f9: null,
    g9: null,
    h9: null,
    c8: null,
    d8: null,
    e8: null,
    f8: null,
    g8: null,
    h8: null,
    i8: null,
    b7: null,
    c7: null,
    d7: null,
    e7: null,
    f7: null,
    g7: null,
    h7: null,
    i7: null,
    k7: null,
    a6: null,
    b6: null,
    c6: null,
    d6: null,
    e6: null,
    f6: null,
    g6: null,
    h6: null,
    i6: null,
    k6: null,
    l6: null,
    a5: null,
    b5: null,
    c5: null,
    d5: null,
    e5: null,
    f5: null,
    g5: null,
    h5: null,
    i5: null,
    k5: null,
    l5: null,
    a4: null,
    b4: null,
    c4: null,
    d4: null,
    e4: null,
    f4: null,
    g4: null,
    h4: null,
    i4: null,
    k4: null,
    l4: null,
    a3: null,
    b3: null,
    c3: null,
    d3: null,
    e3: null,
    f3: null,
    g3: null,
    h3: null,
    i3: null,
    k3: null,
    l3: null,
    a2: null,
    b2: null,
    c2: null,
    d2: null,
    e2: null,
    f2: null,
    g2: null,
    h2: null,
    i2: null,
    k2: null,
    l2: null,
    a1: null,
    b1: null,
    c1: null,
    d1: null,
    e1: null,
    f1: null,
    g1: null,
    h1: null,
    i1: null,
    k1: null,
    l1: null,
  }
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

function step(
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
 * Traverse the board in a given direction
 */
export function walk(
  from: Position,
  direction: Direction,
  board: Board = createBoard(),
  color: Color
): Position[] {
  const path: Position[] = []

  let next: Position | undefined = step(from, direction, board, color)

  while(next) {
    path.push(next)

    next = step(next, direction, board, color)
  }

  return path
}
