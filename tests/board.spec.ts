import { isPosition, walk } from '@/board'
import { describe, expect, test } from 'vitest'
import { emptyPosition, initialPosition, positions } from '@/constants'
import type { Direction, Position } from '@/types'
import {
  createBoard,
  getColor,
  Hexchess,
  parseBoard,
  parseMove,
  stringifyBoard,
  stringifyMove
} from '@/index'

test('getColor', () => {
  expect(getColor('P')).toBe('w')
  expect(getColor('p')).toBe('b')
})

test('isPosition', () => {
  for (let i = 0; i < positions.length; i++) {
    expect(isPosition(positions[i])).toBe(true)
  }

  expect(isPosition('x')).toBe(false)
})

describe('parseBoard', () => {
  test('empty', () => {
    const board = parseBoard('1/3/5/7/9/11/11/11/11/11/11')

    expect(board).toEqual({
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
    })
  })

  test('initial', () => {
    const board = parseBoard('b/qbk/n1b1n/r5r/ppppppppp/11/5P5/4P1P4/3P1B1P3/2P2B2P2/1PRNQBKNRP1')

    expect(board).toEqual({
      f11: 'b',
      e10: 'q',
      f10: 'b',
      g10: 'k',
      d9: 'n',
      e9: null,
      f9: 'b',
      g9: null,
      h9: 'n',
      c8: 'r',
      d8: null,
      e8: null,
      f8: null,
      g8: null,
      h8: null,
      i8: 'r',
      b7: 'p',
      c7: 'p',
      d7: 'p',
      e7: 'p',
      f7: 'p',
      g7: 'p',
      h7: 'p',
      i7: 'p',
      k7: 'p',
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
      f5: 'P',
      g5: null,
      h5: null,
      i5: null,
      k5: null,
      l5: null,
      a4: null,
      b4: null,
      c4: null,
      d4: null,
      e4: 'P',
      f4: null,
      g4: 'P',
      h4: null,
      i4: null,
      k4: null,
      l4: null,
      a3: null,
      b3: null,
      c3: null,
      d3: 'P',
      e3: null,
      f3: 'B',
      g3: null,
      h3: 'P',
      i3: null,
      k3: null,
      l3: null,
      a2: null,
      b2: null,
      c2: 'P',
      d2: null,
      e2: null,
      f2: 'B',
      g2: null,
      h2: null,
      i2: 'P',
      k2: null,
      l2: null,
      a1: null,
      b1: 'P',
      c1: 'R',
      d1: 'N',
      e1: 'Q',
      f1: 'B',
      g1: 'K',
      h1: 'N',
      i1: 'R',
      k1: 'P',
      l1: null,
    })
  })

  test('error: invalid length', () => {
    expect(() => parseBoard('1/3/5/7/9/11/11/11/11/11/11_')).toThrowError()
  })

  test('error: multiple black kings', () => {
    expect(() => parseBoard('1/3/5/7/9/11/11/11/11/11/9kk')).toThrowError()
  })

  test('error: multiple white kings', () => {
    expect(() => parseBoard('1/3/5/7/9/11/11/11/11/11/9KK')).toThrowError()
  })

  test('error: invalid piece', () => {
    expect(() => parseBoard('x/3/5/7/9/11/11/11/11/11/11')).toThrowError()
  })

  test('error: overflow', () => {
    expect(() => parseBoard('1/3/5/7/9/11/11/11/11/11/11p')).toThrowError()
  })
})

describe('parseMove', () => {
  test('empty string', () => {
    expect(() => parseMove('')).toThrowError()
  })

  test('without promotion', () => {
    expect(parseMove('a1b2')).toEqual({ from: 'a1', to: 'b2' })
  })

  test('with promotion', () => {
    expect(parseMove('f10f11q')).toEqual({ from: 'f10', to: 'f11', promotion: 'q' })
  })

  test('missing from file', () => {
    expect(() => parseMove('a')).toThrowError()
  })

  test('missing third character', () => {
    expect(() => parseMove('a1')).toThrowError()
  })

  test('invalid second character', () => {
    expect(() => parseMove('ax')).toThrowError()
  })

  test('invalid to file', () => {
    expect(() => parseMove('a1x')).toThrowError()
    expect(() => parseMove('a10x')).toThrowError()
    expect(() => parseMove('a11x')).toThrowError()
  })

  test('invalid to second character', () => {
    expect(() => parseMove('a1ax')).toThrowError()
  })

  test('missing to file', () => {
    expect(() => parseMove('a10')).toThrowError()
  })

  test('invalid to rank', () => {
    expect(() => parseMove('a1f12')).toThrowError()
  })

  test('invalid to second character', () => {
    expect(() => parseMove('a1abc2')).toThrowError()
  })

  test('invalid from position', () => {
    expect(() => parseMove('a9a1')).toThrowError()
  })

  test('invalid promotion character', () => {
    expect(() => parseMove('f10f11x')).toThrowError()
  })

  test('identical from and to', () => {
    expect(() => parseMove('a1a1')).toThrowError()
  })

  test('invalid promotion position', () => {
    expect(() => parseMove('f5f6q')).toThrowError()
  })
})

describe('stringifyBoard', () => {
  test('empty', () => {
    const hexchess = new Hexchess()

    expect(stringifyBoard(hexchess.board)).toBe(emptyPosition.split(' ').shift())
  })

  test('initial', () => {
    const hexchess = Hexchess.init()

    expect(stringifyBoard(hexchess.board)).toBe(initialPosition.split(' ').shift())
  })
})

describe('stringifyMove', () => {
  test('without promotion', () => {
    expect(stringifyMove({ from: 'a1', to: 'b2' })).toBe('a1b2')
  })

  test('with promotion', () => {
    expect(stringifyMove({ from: 'f10', to: 'f11', promotion: 'q' })).toBe('f10f11q')
  })
})

describe('walk', () => {
  // use the perimeter to walk across every position in every direction
  const tests: {
    from: Position,
    direction: Direction,
    expected: Position[],
  }[] = [
    { from: 'a1', direction: 0, expected: ['a2', 'a3', 'a4', 'a5', 'a6'] },
    { from: 'a1', direction: 1, expected: ['b3', 'c5', 'd7', 'e9', 'f11'] },
    { from: 'a1', direction: 2, expected: ['b2', 'c3', 'd4', 'e5', 'f6', 'g6', 'h6', 'i6', 'k6', 'l6'] },
    { from: 'a1', direction: 3, expected: ['c2', 'e3', 'g3', 'i2', 'l1'] },
    { from: 'a1', direction: 4, expected: ['b1', 'c1', 'd1', 'e1', 'f1'] },
    { from: 'a1', direction: 5, expected: [] },
    { from: 'a1', direction: 6, expected: [] },
    { from: 'a1', direction: 7, expected: [] },
    { from: 'a1', direction: 8, expected: [] },
    { from: 'a1', direction: 9, expected: [] },
    { from: 'a1', direction: 10, expected: [] },
    { from: 'a1', direction: 11, expected: [] },

    { from: 'a2', direction: 0, expected: ['a3', 'a4', 'a5', 'a6'] },
    { from: 'a2', direction: 1, expected: ['b4', 'c6', 'd8', 'e10'] },
    { from: 'a2', direction: 2, expected: ['b3', 'c4', 'd5', 'e6', 'f7', 'g7', 'h7', 'i7', 'k7'] },
    { from: 'a2', direction: 3, expected: ['c3', 'e4', 'g4', 'i3', 'l2'] },
    { from: 'a2', direction: 4, expected: ['b2', 'c2', 'd2', 'e2', 'f2', 'g1'] },
    { from: 'a2', direction: 5, expected: ['b1'] },
    { from: 'a2', direction: 6, expected: ['a1'] },
    { from: 'a2', direction: 7, expected: [] },
    { from: 'a2', direction: 8, expected: [] },
    { from: 'a2', direction: 9, expected: [] },
    { from: 'a2', direction: 10, expected: [] },
    { from: 'a2', direction: 11, expected: [] },

    { from: 'a3', direction: 0, expected: ['a4', 'a5', 'a6'] },
    { from: 'a3', direction: 1, expected: ['b5', 'c7', 'd9'] },
    { from: 'a3', direction: 2, expected: ['b4', 'c5', 'd6', 'e7', 'f8', 'g8', 'h8', 'i8'] },
    { from: 'a3', direction: 3, expected: ['c4', 'e5', 'g5', 'i4', 'l3'] },
    { from: 'a3', direction: 4, expected: ['b3', 'c3', 'd3', 'e3', 'f3', 'g2', 'h1'] },
    { from: 'a3', direction: 5, expected: ['b2', 'c1'] },
    { from: 'a3', direction: 6, expected: ['a2', 'a1'] },
    { from: 'a3', direction: 7, expected: [] },
    { from: 'a3', direction: 8, expected: [] },
    { from: 'a3', direction: 9, expected: [] },
    { from: 'a3', direction: 10, expected: [] },
    { from: 'a3', direction: 11, expected: [] },

    { from: 'a4', direction: 0, expected: ['a5', 'a6'] },
    { from: 'a4', direction: 1, expected: ['b6', 'c8'] },
    { from: 'a4', direction: 2, expected: ['b5', 'c6', 'd7', 'e8', 'f9', 'g9', 'h9'] },
    { from: 'a4', direction: 3, expected: ['c5', 'e6', 'g6', 'i5', 'l4'] },
    { from: 'a4', direction: 4, expected: ['b4', 'c4', 'd4', 'e4', 'f4', 'g3', 'h2', 'i1'] },
    { from: 'a4', direction: 5, expected: ['b3', 'c2', 'd1'] },
    { from: 'a4', direction: 6, expected: ['a3', 'a2', 'a1'] },
    { from: 'a4', direction: 7, expected: [] },
    { from: 'a4', direction: 8, expected: [] },
    { from: 'a4', direction: 9, expected: [] },
    { from: 'a4', direction: 10, expected: [] },
    { from: 'a4', direction: 11, expected: [] },

    { from: 'a5', direction: 0, expected: ['a6'] },
    { from: 'a5', direction: 1, expected: ['b7'] },
    { from: 'a5', direction: 2, expected: ['b6', 'c7', 'd8', 'e9', 'f10', 'g10'] },
    { from: 'a5', direction: 3, expected: ['c6', 'e7', 'g7', 'i6', 'l5'] },
    { from: 'a5', direction: 4, expected: ['b5', 'c5', 'd5', 'e5', 'f5', 'g4', 'h3', 'i2', 'k1'] },
    { from: 'a5', direction: 5, expected: ['b4', 'c3', 'd2', 'e1'] },
    { from: 'a5', direction: 6, expected: ['a4', 'a3', 'a2', 'a1'] },
    { from: 'a5', direction: 7, expected: [] },
    { from: 'a5', direction: 8, expected: [] },
    { from: 'a5', direction: 9, expected: [] },
    { from: 'a5', direction: 10, expected: [] },
    { from: 'a5', direction: 11, expected: [] },

    { from: 'a6', direction: 0, expected: [] },
    { from: 'a6', direction: 1, expected: [] },
    { from: 'a6', direction: 2, expected: ['b7', 'c8', 'd9', 'e10', 'f11'] },
    { from: 'a6', direction: 3, expected: ['c7', 'e8', 'g8', 'i7', 'l6'] },
    { from: 'a6', direction: 4, expected: ['b6', 'c6', 'd6', 'e6', 'f6', 'g5', 'h4', 'i3', 'k2', 'l1'] },
    { from: 'a6', direction: 5, expected: ['b5', 'c4', 'd3', 'e2', 'f1'] },
    { from: 'a6', direction: 6, expected: ['a5', 'a4', 'a3', 'a2', 'a1'] },
    { from: 'a6', direction: 7, expected: [] },
    { from: 'a6', direction: 8, expected: [] },
    { from: 'a6', direction: 9, expected: [] },
    { from: 'a6', direction: 10, expected: [] },
    { from: 'a6', direction: 11, expected: [] },

    { from: 'b7', direction: 0, expected: [] },
    { from: 'b7', direction: 1, expected: [] },
    { from: 'b7', direction: 2, expected: ['c8', 'd9', 'e10', 'f11'] },
    { from: 'b7', direction: 3, expected: ['d8', 'f9', 'h8', 'k7'] },
    { from: 'b7', direction: 4, expected: ['c7', 'd7', 'e7', 'f7', 'g6', 'h5', 'i4', 'k3', 'l2'] },
    { from: 'b7', direction: 5, expected: ['c6', 'd5', 'e4', 'f3', 'g1'] },
    { from: 'b7', direction: 6, expected: ['b6', 'b5', 'b4', 'b3', 'b2', 'b1'] },
    { from: 'b7', direction: 7, expected: ['a5'] },
    { from: 'b7', direction: 8, expected: ['a6'] },
    { from: 'b7', direction: 9, expected: [] },
    { from: 'b7', direction: 10, expected: [] },
    { from: 'b7', direction: 11, expected: [] },

    { from: 'c8', direction: 0, expected: [] },
    { from: 'c8', direction: 1, expected: [] },
    { from: 'c8', direction: 2, expected: ['d9', 'e10', 'f11'] },
    { from: 'c8', direction: 3, expected: ['e9', 'g9', 'i8'] },
    { from: 'c8', direction: 4, expected: ['d8', 'e8', 'f8', 'g7', 'h6', 'i5', 'k4', 'l3'] },
    { from: 'c8', direction: 5, expected: ['d7', 'e6', 'f5', 'g3', 'h1'] },
    { from: 'c8', direction: 6, expected: ['c7', 'c6', 'c5', 'c4', 'c3', 'c2', 'c1'] },
    { from: 'c8', direction: 7, expected: ['b6', 'a4'] },
    { from: 'c8', direction: 8, expected: ['b7', 'a6'] },
    { from: 'c8', direction: 9, expected: [] },
    { from: 'c8', direction: 10, expected: [] },
    { from: 'c8', direction: 11, expected: [] },

    { from: 'd9', direction: 0, expected: [] },
    { from: 'd9', direction: 1, expected: [] },
    { from: 'd9', direction: 2, expected: ['e10', 'f11'] },
    { from: 'd9', direction: 3, expected: ['f10', 'h9'] },
    { from: 'd9', direction: 4, expected: ['e9', 'f9', 'g8', 'h7', 'i6', 'k5', 'l4'] },
    { from: 'd9', direction: 5, expected: ['e8', 'f7', 'g5', 'h3', 'i1'] },
    { from: 'd9', direction: 6, expected: ['d8', 'd7', 'd6', 'd5', 'd4', 'd3', 'd2', 'd1'] },
    { from: 'd9', direction: 7, expected: ['c7', 'b5', 'a3'] },
    { from: 'd9', direction: 8, expected: ['c8', 'b7', 'a6'] },
    { from: 'd9', direction: 9, expected: [] },
    { from: 'd9', direction: 10, expected: [] },
    { from: 'd9', direction: 11, expected: [] },

    { from: 'e10', direction: 0, expected: [] },
    { from: 'e10', direction: 1, expected: [] },
    { from: 'e10', direction: 2, expected: ['f11'] },
    { from: 'e10', direction: 3, expected: ['g10'] },
    { from: 'e10', direction: 4, expected: ['f10', 'g9', 'h8', 'i7', 'k6', 'l5'] },
    { from: 'e10', direction: 5, expected: ['f9', 'g7', 'h5', 'i3', 'k1'] },
    { from: 'e10', direction: 6, expected: ['e9', 'e8', 'e7', 'e6', 'e5', 'e4', 'e3', 'e2', 'e1'] },
    { from: 'e10', direction: 7, expected: ['d8', 'c6', 'b4', 'a2'] },
    { from: 'e10', direction: 8, expected: ['d9', 'c8', 'b7', 'a6'] },
    { from: 'e10', direction: 9, expected: [] },
    { from: 'e10', direction: 10, expected: [] },
    { from: 'e10', direction: 11, expected: [] },

    { from: 'f11', direction: 0, expected: [] },
    { from: 'f11', direction: 1, expected: [] },
    { from: 'f11', direction: 2, expected: [] },
    { from: 'f11', direction: 3, expected: [] },
    { from: 'f11', direction: 4, expected: ['g10', 'h9', 'i8', 'k7', 'l6'] },
    { from: 'f11', direction: 5, expected: ['g9', 'h7', 'i5', 'k3', 'l1'] },
    { from: 'f11', direction: 6, expected: ['f10', 'f9', 'f8', 'f7', 'f6', 'f5', 'f4', 'f3', 'f2', 'f1'] },
    { from: 'f11', direction: 7, expected: ['e9', 'd7', 'c5', 'b3', 'a1'] },
    { from: 'f11', direction: 8, expected: ['e10', 'd9', 'c8', 'b7', 'a6'] },
    { from: 'f11', direction: 9, expected: [] },
    { from: 'f11', direction: 10, expected: [] },
    { from: 'f11', direction: 11, expected: [] },

    { from: 'g10', direction: 0, expected: [] },
    { from: 'g10', direction: 1, expected: [] },
    { from: 'g10', direction: 2, expected: [] },
    { from: 'g10', direction: 3, expected: [] },
    { from: 'g10', direction: 4, expected: ['h9', 'i8', 'k7', 'l6'] },
    { from: 'g10', direction: 5, expected: ['h8', 'i6', 'k4', 'l2'] },
    { from: 'g10', direction: 6, expected: ['g9', 'g8', 'g7', 'g6', 'g5', 'g4', 'g3', 'g2', 'g1'] },
    { from: 'g10', direction: 7, expected: ['f9', 'e7', 'd5', 'c3', 'b1'] },
    { from: 'g10', direction: 8, expected: ['f10', 'e9', 'd8', 'c7', 'b6', 'a5'] },
    { from: 'g10', direction: 9, expected: ['e10'] },
    { from: 'g10', direction: 10, expected: ['f11'] },
    { from: 'g10', direction: 11, expected: [] },

    { from: 'h9', direction: 0, expected: [] },
    { from: 'h9', direction: 1, expected: [] },
    { from: 'h9', direction: 2, expected: [] },
    { from: 'h9', direction: 3, expected: [] },
    { from: 'h9', direction: 4, expected: ['i8', 'k7', 'l6'] },
    { from: 'h9', direction: 5, expected: ['i7', 'k5', 'l3'] },
    { from: 'h9', direction: 6, expected: ['h8', 'h7', 'h6', 'h5', 'h4', 'h3', 'h2', 'h1'] },
    { from: 'h9', direction: 7, expected: ['g8', 'f7', 'e5', 'd3', 'c1'] },
    { from: 'h9', direction: 8, expected: ['g9', 'f9', 'e8', 'd7', 'c6', 'b5', 'a4'] },
    { from: 'h9', direction: 9, expected: ['f10', 'd9'] },
    { from: 'h9', direction: 10, expected: ['g10', 'f11'] },
    { from: 'h9', direction: 11, expected: [] },

    { from: 'i8', direction: 0, expected: [] },
    { from: 'i8', direction: 1, expected: [] },
    { from: 'i8', direction: 2, expected: [] },
    { from: 'i8', direction: 3, expected: [] },
    { from: 'i8', direction: 4, expected: ['k7', 'l6'] },
    { from: 'i8', direction: 5, expected: ['k6', 'l4'] },
    { from: 'i8', direction: 6, expected: ['i7', 'i6', 'i5', 'i4', 'i3', 'i2', 'i1'] },
    { from: 'i8', direction: 7, expected: ['h7', 'g6', 'f5', 'e3', 'd1'] },
    { from: 'i8', direction: 8, expected: ['h8', 'g8', 'f8', 'e7', 'd6', 'c5', 'b4', 'a3'] },
    { from: 'i8', direction: 9, expected: ['g9', 'e9', 'c8'] },
    { from: 'i8', direction: 10, expected: ['h9', 'g10', 'f11'] },
    { from: 'i8', direction: 11, expected: [] },

    { from: 'k7', direction: 0, expected: [] },
    { from: 'k7', direction: 1, expected: [] },
    { from: 'k7', direction: 2, expected: [] },
    { from: 'k7', direction: 3, expected: [] },
    { from: 'k7', direction: 4, expected: ['l6'] },
    { from: 'k7', direction: 5, expected: ['l5'] },
    { from: 'k7', direction: 6, expected: ['k6', 'k5', 'k4', 'k3', 'k2', 'k1'] },
    { from: 'k7', direction: 7, expected: ['i6', 'h5', 'g4', 'f3', 'e1'] },
    { from: 'k7', direction: 8, expected: ['i7', 'h7', 'g7', 'f7', 'e6', 'd5', 'c4', 'b3', 'a2'] },
    { from: 'k7', direction: 9, expected: ['h8', 'f9', 'd8', 'b7'] },
    { from: 'k7', direction: 10, expected: ['i8', 'h9', 'g10', 'f11'] },
    { from: 'k7', direction: 11, expected: [] },

    { from: 'l6', direction: 0, expected: [] },
    { from: 'l6', direction: 1, expected: [] },
    { from: 'l6', direction: 2, expected: [] },
    { from: 'l6', direction: 3, expected: [] },
    { from: 'l6', direction: 4, expected: [] },
    { from: 'l6', direction: 5, expected: [] },
    { from: 'l6', direction: 6, expected: ['l5', 'l4', 'l3', 'l2', 'l1'] },
    { from: 'l6', direction: 7, expected: ['k5', 'i4', 'h3', 'g2', 'f1'] },
    { from: 'l6', direction: 8, expected: ['k6', 'i6', 'h6', 'g6', 'f6', 'e5', 'd4', 'c3', 'b2', 'a1'] },
    { from: 'l6', direction: 9, expected: ['i7', 'g8', 'e8', 'c7', 'a6'] },
    { from: 'l6', direction: 10, expected: ['k7', 'i8', 'h9', 'g10', 'f11'] },
    { from: 'l6', direction: 11, expected: [] },

    { from: 'l5', direction: 0, expected: ['l6'] },
    { from: 'l5', direction: 1, expected: [] },
    { from: 'l5', direction: 2, expected: [] },
    { from: 'l5', direction: 3, expected: [] },
    { from: 'l5', direction: 4, expected: [] },
    { from: 'l5', direction: 5, expected: [] },
    { from: 'l5', direction: 6, expected: ['l4', 'l3', 'l2', 'l1'] },
    { from: 'l5', direction: 7, expected: ['k4', 'i3', 'h2', 'g1'] },
    { from: 'l5', direction: 8, expected: ['k5', 'i5', 'h5', 'g5', 'f5', 'e4', 'd3', 'c2', 'b1'] },
    { from: 'l5', direction: 9, expected: ['i6', 'g7', 'e7', 'c6', 'a5'] },
    { from: 'l5', direction: 10, expected: ['k6', 'i7', 'h8', 'g9', 'f10', 'e10'] },
    { from: 'l5', direction: 11, expected: ['k7'] },

    { from: 'l4', direction: 0, expected: ['l5', 'l6'] },
    { from: 'l4', direction: 1, expected: [] },
    { from: 'l4', direction: 2, expected: [] },
    { from: 'l4', direction: 3, expected: [] },
    { from: 'l4', direction: 4, expected: [] },
    { from: 'l4', direction: 5, expected: [] },
    { from: 'l4', direction: 6, expected: ['l3', 'l2', 'l1'] },
    { from: 'l4', direction: 7, expected: ['k3', 'i2', 'h1'] },
    { from: 'l4', direction: 8, expected: ['k4', 'i4', 'h4', 'g4', 'f4', 'e3', 'd2', 'c1'] },
    { from: 'l4', direction: 9, expected: ['i5', 'g6', 'e6', 'c5', 'a4'] },
    { from: 'l4', direction: 10, expected: ['k5', 'i6', 'h7', 'g8', 'f9', 'e9', 'd9'] },
    { from: 'l4', direction: 11, expected: ['k6', 'i8'] },

    { from: 'l3', direction: 0, expected: ['l4', 'l5', 'l6'] },
    { from: 'l3', direction: 1, expected: [] },
    { from: 'l3', direction: 2, expected: [] },
    { from: 'l3', direction: 3, expected: [] },
    { from: 'l3', direction: 4, expected: [] },
    { from: 'l3', direction: 5, expected: [] },
    { from: 'l3', direction: 6, expected: ['l2', 'l1'] },
    { from: 'l3', direction: 7, expected: ['k2', 'i1'] },
    { from: 'l3', direction: 8, expected: ['k3', 'i3', 'h3', 'g3', 'f3', 'e2', 'd1'] },
    { from: 'l3', direction: 9, expected: ['i4', 'g5', 'e5', 'c4', 'a3'] },
    { from: 'l3', direction: 10, expected: ['k4', 'i5', 'h6', 'g7', 'f8', 'e8', 'd8', 'c8'] },
    { from: 'l3', direction: 11, expected: ['k5', 'i7', 'h9'] },

    { from: 'l2', direction: 0, expected: ['l3', 'l4', 'l5', 'l6'] },
    { from: 'l2', direction: 1, expected: [] },
    { from: 'l2', direction: 2, expected: [] },
    { from: 'l2', direction: 3, expected: [] },
    { from: 'l2', direction: 4, expected: [] },
    { from: 'l2', direction: 5, expected: [] },
    { from: 'l2', direction: 6, expected: ['l1'] },
    { from: 'l2', direction: 7, expected: ['k1'] },
    { from: 'l2', direction: 8, expected: ['k2', 'i2', 'h2', 'g2', 'f2', 'e1'] },
    { from: 'l2', direction: 9, expected: ['i3', 'g4', 'e4', 'c3', 'a2'] },
    { from: 'l2', direction: 10, expected: ['k3', 'i4', 'h5', 'g6', 'f7', 'e7', 'd7', 'c7', 'b7'] },
    { from: 'l2', direction: 11, expected: ['k4', 'i6', 'h8', 'g10'] },

    { from: 'l1', direction: 0, expected: ['l2', 'l3', 'l4', 'l5', 'l6'] },
    { from: 'l1', direction: 1, expected: [] },
    { from: 'l1', direction: 2, expected: [] },
    { from: 'l1', direction: 3, expected: [] },
    { from: 'l1', direction: 4, expected: [] },
    { from: 'l1', direction: 5, expected: [] },
    { from: 'l1', direction: 6, expected: [] },
    { from: 'l1', direction: 7, expected: [] },
    { from: 'l1', direction: 8, expected: ['k1', 'i1', 'h1', 'g1', 'f1'] },
    { from: 'l1', direction: 9, expected: ['i2', 'g3', 'e3', 'c2', 'a1'] },
    { from: 'l1', direction: 10, expected: ['k2', 'i3', 'h4', 'g5', 'f6', 'e6', 'd6', 'c6', 'b6', 'a6'] },
    { from: 'l1', direction: 11, expected: ['k3', 'i5', 'h7', 'g9', 'f11'] },

    { from: 'k1', direction: 0, expected: ['k2', 'k3', 'k4', 'k5', 'k6', 'k7'] },
    { from: 'k1', direction: 1, expected: ['l2'] },
    { from: 'k1', direction: 2, expected: ['l1'] },
    { from: 'k1', direction: 3, expected: [] },
    { from: 'k1', direction: 4, expected: [] },
    { from: 'k1', direction: 5, expected: [] },
    { from: 'k1', direction: 6, expected: [] },
    { from: 'k1', direction: 7, expected: [] },
    { from: 'k1', direction: 8, expected: ['i1', 'h1', 'g1', 'f1'] },
    { from: 'k1', direction: 9, expected: ['h2', 'f3', 'd2', 'b1'] },
    { from: 'k1', direction: 10, expected: ['i2', 'h3', 'g4', 'f5', 'e5', 'd5', 'c5', 'b5', 'a5'] },
    { from: 'k1', direction: 11, expected: ['i3', 'h5', 'g7', 'f9', 'e10'] },

    { from: 'i1', direction: 0, expected: ['i2', 'i3', 'i4', 'i5', 'i6', 'i7', 'i8'] },
    { from: 'i1', direction: 1, expected: ['k2', 'l3'] },
    { from: 'i1', direction: 2, expected: ['k1', 'l1'] },
    { from: 'i1', direction: 3, expected: [] },
    { from: 'i1', direction: 4, expected: [] },
    { from: 'i1', direction: 5, expected: [] },
    { from: 'i1', direction: 6, expected: [] },
    { from: 'i1', direction: 7, expected: [] },
    { from: 'i1', direction: 8, expected: ['h1', 'g1', 'f1'] },
    { from: 'i1', direction: 9, expected: ['g2', 'e2', 'c1'] },
    { from: 'i1', direction: 10, expected: ['h2', 'g3', 'f4', 'e4', 'd4', 'c4', 'b4', 'a4'] },
    { from: 'i1', direction: 11, expected: ['h3', 'g5', 'f7', 'e8', 'd9'] },

    { from: 'h1', direction: 0, expected: ['h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8', 'h9'] },
    { from: 'h1', direction: 1, expected: ['i2', 'k3', 'l4'] },
    { from: 'h1', direction: 2, expected: ['i1', 'k1', 'l1'] },
    { from: 'h1', direction: 3, expected: [] },
    { from: 'h1', direction: 4, expected: [] },
    { from: 'h1', direction: 5, expected: [] },
    { from: 'h1', direction: 6, expected: [] },
    { from: 'h1', direction: 7, expected: [] },
    { from: 'h1', direction: 8, expected: ['g1', 'f1'] },
    { from: 'h1', direction: 9, expected: ['f2', 'd1'] },
    { from: 'h1', direction: 10, expected: ['g2', 'f3', 'e3', 'd3', 'c3', 'b3', 'a3'] },
    { from: 'h1', direction: 11, expected: ['g3', 'f5', 'e6', 'd7', 'c8'] },

    { from: 'g1', direction: 0, expected: ['g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8', 'g9', 'g10'] },
    { from: 'g1', direction: 1, expected: ['h2', 'i3', 'k4', 'l5'] },
    { from: 'g1', direction: 2, expected: ['h1', 'i1', 'k1', 'l1'] },
    { from: 'g1', direction: 3, expected: [] },
    { from: 'g1', direction: 4, expected: [] },
    { from: 'g1', direction: 5, expected: [] },
    { from: 'g1', direction: 6, expected: [] },
    { from: 'g1', direction: 7, expected: [] },
    { from: 'g1', direction: 8, expected: ['f1'] },
    { from: 'g1', direction: 9, expected: ['e1'] },
    { from: 'g1', direction: 10, expected: ['f2', 'e2', 'd2', 'c2', 'b2', 'a2'] },
    { from: 'g1', direction: 11, expected: ['f3', 'e4', 'd5', 'c6', 'b7'] },

    { from: 'f1', direction: 0, expected: ['f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'f10', 'f11'] },
    { from: 'f1', direction: 1, expected: ['g2', 'h3', 'i4', 'k5', 'l6'] },
    { from: 'f1', direction: 2, expected: ['g1', 'h1', 'i1', 'k1', 'l1'] },
    { from: 'f1', direction: 3, expected: [] },
    { from: 'f1', direction: 4, expected: [] },
    { from: 'f1', direction: 5, expected: [] },
    { from: 'f1', direction: 6, expected: [] },
    { from: 'f1', direction: 7, expected: [] },
    { from: 'f1', direction: 8, expected: [] },
    { from: 'f1', direction: 9, expected: [] },
    { from: 'f1', direction: 10, expected: ['e1', 'd1', 'c1', 'b1', 'a1'] },
    { from: 'f1', direction: 11, expected: ['e2', 'd3', 'c4', 'b5', 'a6'] },

    { from: 'e1', direction: 0, expected: ['e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8', 'e9', 'e10'] },
    { from: 'e1', direction: 1, expected: ['f3', 'g4', 'h5', 'i6', 'k7'] },
    { from: 'e1', direction: 2, expected: ['f2', 'g2', 'h2', 'i2', 'k2', 'l2'] },
    { from: 'e1', direction: 3, expected: ['g1'] },
    { from: 'e1', direction: 4, expected: ['f1'] },
    { from: 'e1', direction: 5, expected: [] },
    { from: 'e1', direction: 6, expected: [] },
    { from: 'e1', direction: 7, expected: [] },
    { from: 'e1', direction: 8, expected: [] },
    { from: 'e1', direction: 9, expected: [] },
    { from: 'e1', direction: 10, expected: ['d1', 'c1', 'b1', 'a1'] },
    { from: 'e1', direction: 11, expected: ['d2', 'c3', 'b4', 'a5'] },

    { from: 'd1', direction: 0, expected: ['d2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9'] },
    { from: 'd1', direction: 1, expected: ['e3', 'f5', 'g6', 'h7', 'i8'] },
    { from: 'd1', direction: 2, expected: ['e2', 'f3', 'g3', 'h3', 'i3', 'k3', 'l3'] },
    { from: 'd1', direction: 3, expected: ['f2', 'h1'] },
    { from: 'd1', direction: 4, expected: ['e1', 'f1'] },
    { from: 'd1', direction: 5, expected: [] },
    { from: 'd1', direction: 6, expected: [] },
    { from: 'd1', direction: 7, expected: [] },
    { from: 'd1', direction: 8, expected: [] },
    { from: 'd1', direction: 9, expected: [] },
    { from: 'd1', direction: 10, expected: ['c1', 'b1', 'a1'] },
    { from: 'd1', direction: 11, expected: ['c2', 'b3', 'a4'] },

    { from: 'c1', direction: 0, expected: ['c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'] },
    { from: 'c1', direction: 1, expected: ['d3', 'e5', 'f7', 'g8', 'h9'] },
    { from: 'c1', direction: 2, expected: ['d2', 'e3', 'f4', 'g4', 'h4', 'i4', 'k4', 'l4'] },
    { from: 'c1', direction: 3, expected: ['e2', 'g2', 'i1'] },
    { from: 'c1', direction: 4, expected: ['d1', 'e1', 'f1'] },
    { from: 'c1', direction: 5, expected: [] },
    { from: 'c1', direction: 6, expected: [] },
    { from: 'c1', direction: 7, expected: [] },
    { from: 'c1', direction: 8, expected: [] },
    { from: 'c1', direction: 9, expected: [] },
    { from: 'c1', direction: 10, expected: ['b1', 'a1'] },
    { from: 'c1', direction: 11, expected: ['b2', 'a3'] },

    { from: 'b1', direction: 0, expected: ['b2', 'b3', 'b4', 'b5', 'b6', 'b7'] },
    { from: 'b1', direction: 1, expected: ['c3', 'd5', 'e7', 'f9', 'g10'] },
    { from: 'b1', direction: 2, expected: ['c2', 'd3', 'e4', 'f5', 'g5', 'h5', 'i5', 'k5', 'l5'] },
    { from: 'b1', direction: 3, expected: ['d2', 'f3', 'h2', 'k1'] },
    { from: 'b1', direction: 4, expected: ['c1', 'd1', 'e1', 'f1'] },
    { from: 'b1', direction: 5, expected: [] },
    { from: 'b1', direction: 6, expected: [] },
    { from: 'b1', direction: 7, expected: [] },
    { from: 'b1', direction: 8, expected: [] },
    { from: 'b1', direction: 9, expected: [] },
    { from: 'b1', direction: 10, expected: ['a1'] },
    { from: 'b1', direction: 11, expected: ['a2'] },
  ]

  const board = createBoard()

  tests.forEach(t => {
    test(`${t.from} : ${t.direction} = ${t.expected.join(' → ')}`, () => {
      expect(walk(t.from, t.direction, board, 'w'), `Board path ${t.from}:${t.direction} failed`).toEqual(t.expected)
    })
  })

  test('stop short of friendly piece', () => {
    const path = walk('f6', 0, parseBoard('K/3/5/7/9/11/11/11/11/11/11'), 'w')

    expect(path).toEqual(['f7', 'f8', 'f9', 'f10']) // <- f11 is white king
  })

  test('capture enemy piece', () => {
    const eleven = walk('f1', 11, parseBoard('1/3/5/7/9/11/11/11/11/4P1p4/5B5'), 'w')
    const one = walk('f1', 1, parseBoard('1/3/5/7/9/11/11/11/11/4P1p4/5B5'), 'w')

    expect(eleven).toEqual([])
    expect(one).toEqual(['g2'])
  })
})
