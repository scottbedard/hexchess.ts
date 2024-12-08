import { createBoard } from '@/board'
import { describe, expect, test } from 'vitest'
import { Hexchess } from '@/index'
import { emptyPosition, initialPosition } from '@/constants'

describe('initialization', () => {
  test('empty', () => {
    const hexchess = new Hexchess
    expect(hexchess.board).toEqual(createBoard())
    expect(hexchess.enPassant).toBeNull()
    expect(hexchess.turn).toBe('w')
    expect(hexchess.halfmove).toBe(0)
    expect(hexchess.fullmove).toBe(1)
  })

  test('board only', () => {
    const hexchess = new Hexchess('b/qbk/n1b1n/r5r/ppppppppp/11/5P5/4P1P4/3P1B1P3/2P2B2P2/1PRNQBKNRP1')

    expect(hexchess.board).toEqual({
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

    expect(hexchess.turn).toBe('w')
    expect(hexchess.enPassant).toBeNull()
    expect(hexchess.halfmove).toBe(0)
    expect(hexchess.fullmove).toBe(1)
  })

  test('turn', () => {
    const white = new Hexchess('1/3/5/7/9/11/11/11/11/11/11 w - 0 1')
    expect(white.turn).toBe('w')

    const black = new Hexchess('1/3/5/7/9/11/11/11/11/11/11 b - 0 1')
    expect(black.turn).toBe('b')

    expect(() => new Hexchess('1/3/5/7/9/11/11/11/11/11/11 x - 0 1"')).toThrowError()
  })

  test('halfmove', () => {
    const hexchess = new Hexchess('1/3/5/7/9/11/11/11/11/11/11 w - 5 1')

    expect(hexchess.halfmove).toBe(5)
  })

  test('fullmove', () => {
    const hexchess = new Hexchess('1/3/5/7/9/11/11/11/11/11/11 w - 0 10')

    expect(hexchess.fullmove).toBe(10)
  })
})

describe('apply', () => {
  test('single move', () => {
    const hexchess = Hexchess.initial()

    hexchess.apply('g4g5')

    expect(hexchess.toString()).toBe('b/qbk/n1b1n/r5r/ppppppppp/11/5PP4/4P6/3P1B1P3/2P2B2P2/1PRNQBKNRP1 b - 0 1')
  })

  test('multiple moves', () => {
    const hexchess = Hexchess.initial()

    hexchess.apply('g4g5 e7e6 f5f6 e6f6 g5f6')

    expect(hexchess.toString()).toBe('b/qbk/n1b1n/r5r/ppp1ppppp/5P5/11/4P6/3P1B1P3/2P2B2P2/1PRNQBKNRP1 b - 0 3')
  })

  test('from empty position', () => {
    const hexchess = new Hexchess()

    expect(() => hexchess.apply('a1a2')).toThrowError()
  })

  test('black sets en passant', () => {
    const b = new Hexchess('1/3/5/7/p8/11/11/11/11/11/11 b - 0 1')
    b.apply('b7b5')
    expect(b.enPassant).toBe('b6')

    const c = new Hexchess('1/3/5/7/1p7/11/11/11/11/11/11 b - 0 1')
    c.apply('c7c5')
    expect(c.enPassant).toBe('c6')

    const d = new Hexchess('1/3/5/7/2p6/11/11/11/11/11/11 b - 0 1')
    d.apply('d7d5')
    expect(d.enPassant).toBe('d6')

    const e = new Hexchess('1/3/5/7/3p5/11/11/11/11/11/11 b - 0 1')
    e.apply('e7e5')
    expect(e.enPassant).toBe('e6')

    const f = new Hexchess('1/3/5/7/4p4/11/11/11/11/11/11 b - 0 1')
    f.apply('f7f5')
    expect(f.enPassant).toBe('f6')

    const g = new Hexchess('1/3/5/7/5p3/11/11/11/11/11/11 b - 0 1')
    g.apply('g7g5')
    expect(g.enPassant).toBe('g6')

    const h = new Hexchess('1/3/5/7/6p2/11/11/11/11/11/11 b - 0 1')
    h.apply('h7h5')
    expect(h.enPassant).toBe('h6')

    const i = new Hexchess('1/3/5/7/7p1/11/11/11/11/11/11 b - 0 1')
    i.apply('i7i5')
    expect(i.enPassant).toBe('i6')

    const k = new Hexchess('1/3/5/7/8p/11/11/11/11/11/11 b - 0 1')
    k.apply('k7k5')
    expect(k.enPassant).toBe('k6')
  })

  test('white sets en passant', () => {
    const b = new Hexchess('1/3/5/7/9/11/11/11/11/11/1P9 w - 0 1')
    b.apply('b1b3')
    expect(b.enPassant).toBe('b2')

    const c = new Hexchess('1/3/5/7/9/11/11/11/11/2P8/11 w - 0 1')
    c.apply('c2c4')
    expect(c.enPassant).toBe('c3')

    const d = new Hexchess('1/3/5/7/9/11/11/11/3P7/11/11 w - 0 1')
    d.apply('d3d5')
    expect(d.enPassant).toBe('d4')

    const e = new Hexchess('1/3/5/7/9/11/11/4P6/11/11/11 w - 0 1')
    e.apply('e4e6')
    expect(e.enPassant).toBe('e5')

    const f = new Hexchess('1/3/5/7/9/11/5P5/11/11/11/11 w - 0 1')
    f.apply('f5f7')
    expect(f.enPassant).toBe('f6')

    const g = new Hexchess('1/3/5/7/9/11/11/6P4/11/11/11 w - 0 1')
    g.apply('g4g6')
    expect(g.enPassant).toBe('g5')

    const h = new Hexchess('1/3/5/7/9/11/11/11/7P3/11/11 w - 0 1')
    h.apply('h3h5')
    expect(h.enPassant).toBe('h4')

    const i = new Hexchess('1/3/5/7/9/11/11/11/11/8P2/11 w - 0 1')
    i.apply('i2i4')
    expect(i.enPassant).toBe('i3')

    const k = new Hexchess('1/3/5/7/9/11/11/11/11/11/9P1 w - 0 1')
    k.apply('k1k3')
    expect(k.enPassant).toBe('k2')
  })

  test('white clears en passant (starboard)', () => {
    const hexchess = new Hexchess()
    hexchess.board.f6 = 'P'
    hexchess.board.g5 = 'p'
    hexchess.turn = 'w'
    hexchess.enPassant = 'g6'

    expect(hexchess.board.g5).toBe('p')

    hexchess.apply('f6g6')

    expect(hexchess.board.g5).toBeNull()
  })

  test('white clears en passant (portside)', () => {
    const hexchess = new Hexchess()
    hexchess.board.e5 = 'p'
    hexchess.board.f6 = 'P'
    hexchess.turn = 'w'
    hexchess.enPassant = 'e6'

    expect(hexchess.board.e5).toBe('p')

    hexchess.apply('f6e6')

    expect(hexchess.board.e5).toBeNull()
  })

  test('black clears en passant (starboard)', () => {
    const hexchess = new Hexchess()
    hexchess.board.f6 = 'p'
    hexchess.board.e6 = 'P'
    hexchess.turn = 'b'
    hexchess.enPassant = 'e5'

    expect(hexchess.board.e6).toBe('P')

    hexchess.apply('f6e5')

    expect(hexchess.board.e6).toBeNull()
  })

  test('black clears en passant (portside)', () => {
    const hexchess = new Hexchess()
    hexchess.board.f6 = 'p'
    hexchess.board.g6 = 'P'
    hexchess.turn = 'b'
    hexchess.enPassant = 'g5'

    expect(hexchess.board.g6).toBe('P')

    hexchess.apply('f6g5')

    expect(hexchess.board.g6).toBeNull()
  })
})

describe('findKing', () => {
  test('black', () => {
    const hexchess = new Hexchess('1/3/2k2/7/9/11/11/11/5K5/11/11 w - 0 1')

    expect(hexchess.findKing('b')).toBe('f9')
  })

  test('white', () => {
    const hexchess = new Hexchess('1/3/2k2/7/9/11/11/11/5K5/11/11 w - 0 1')

    expect(hexchess.findKing('w')).toBe('f3')
  })

  test('void', () => {
    const hexchess = new Hexchess('1/3/5/7/9/11/11/11/11/11/11 w - 0 1')

    expect(hexchess.findKing('b')).toBe(null)
    expect(hexchess.findKing('w')).toBe(null)
  })
})

describe('toString', () => {
  test('empty', () => {
    const hexchess = new Hexchess()

    expect(hexchess.toString()).toBe(emptyPosition)
  })

  test('initial', () => {
    const hexchess = Hexchess.initial()

    expect(hexchess.toString()).toBe(initialPosition)
  })
})
