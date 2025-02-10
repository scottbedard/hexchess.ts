import { createBoard } from '@/board'
import { describe, expect, test } from 'vitest'
import { Hexchess } from '@/index'
import { emptyPosition, initialPosition } from '@/constants'

describe('initialization', () => {
  test('empty', () => {
    const hexchess = new Hexchess
    expect(hexchess.board).toEqual(createBoard())
    expect(hexchess.ep).toBeNull()
    expect(hexchess.turn).toBe('w')
    expect(hexchess.halfmove).toBe(0)
    expect(hexchess.fullmove).toBe(1)
  })

  test('invalid en passant', () => {
    expect(() => new Hexchess('1/3/5/7/9/11/11/11/11/11/11 w x 0 1')).toThrow()
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
    expect(hexchess.ep).toBeNull()
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
  test('move', () => {
    const hexchess = Hexchess.init()

    hexchess.apply({ from: 'g4', to: 'g5' })

    expect(hexchess.toString()).toBe('b/qbk/n1b1n/r5r/ppppppppp/11/5PP4/4P6/3P1B1P3/2P2B2P2/1PRNQBKNRP1 b - 0 1')
  })

  test('irregular whitespace', () => {
    expect(Hexchess.init().apply('').toString()).toBe(initialPosition)

    const expected = 'b/qbk/n1b1n/r5r/ppp1ppppp/11/4pPP4/4P6/3P1B1P3/2P2B2P2/1PRNQBKNRP1 w e6 0 2'

    expect(Hexchess.init().apply('g4g5  e7e5').toString()).toBe(expected)
    expect(Hexchess.init().apply(' g4g5  e7e5').toString()).toBe(expected)
    expect(Hexchess.init().apply(' g4g5   e7e5 ').toString()).toBe(expected)
  })

  test('return instance', () => {
    const hexchess = Hexchess.init()

    expect(hexchess.apply('g4g5')).toBe(hexchess)
  })

  test('san', () => {
    const hexchess = Hexchess.init()

    hexchess.apply('g4g5')

    expect(hexchess.toString()).toBe('b/qbk/n1b1n/r5r/ppppppppp/11/5PP4/4P6/3P1B1P3/2P2B2P2/1PRNQBKNRP1 b - 0 1')
  })

  test('multiple moves', () => {
    const hexchess = Hexchess.init()

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
    expect(b.ep).toBe('b6')

    const c = new Hexchess('1/3/5/7/1p7/11/11/11/11/11/11 b - 0 1')
    c.apply('c7c5')
    expect(c.ep).toBe('c6')

    const d = new Hexchess('1/3/5/7/2p6/11/11/11/11/11/11 b - 0 1')
    d.apply('d7d5')
    expect(d.ep).toBe('d6')

    const e = new Hexchess('1/3/5/7/3p5/11/11/11/11/11/11 b - 0 1')
    e.apply('e7e5')
    expect(e.ep).toBe('e6')

    const f = new Hexchess('1/3/5/7/4p4/11/11/11/11/11/11 b - 0 1')
    f.apply('f7f5')
    expect(f.ep).toBe('f6')

    const g = new Hexchess('1/3/5/7/5p3/11/11/11/11/11/11 b - 0 1')
    g.apply('g7g5')
    expect(g.ep).toBe('g6')

    const h = new Hexchess('1/3/5/7/6p2/11/11/11/11/11/11 b - 0 1')
    h.apply('h7h5')
    expect(h.ep).toBe('h6')

    const i = new Hexchess('1/3/5/7/7p1/11/11/11/11/11/11 b - 0 1')
    i.apply('i7i5')
    expect(i.ep).toBe('i6')

    const k = new Hexchess('1/3/5/7/8p/11/11/11/11/11/11 b - 0 1')
    k.apply('k7k5')
    expect(k.ep).toBe('k6')
  })

  test('white sets en passant', () => {
    const b = new Hexchess('1/3/5/7/9/11/11/11/11/11/1P9 w - 0 1')
    b.apply('b1b3')
    expect(b.ep).toBe('b2')

    const c = new Hexchess('1/3/5/7/9/11/11/11/11/2P8/11 w - 0 1')
    c.apply('c2c4')
    expect(c.ep).toBe('c3')

    const d = new Hexchess('1/3/5/7/9/11/11/11/3P7/11/11 w - 0 1')
    d.apply('d3d5')
    expect(d.ep).toBe('d4')

    const e = new Hexchess('1/3/5/7/9/11/11/4P6/11/11/11 w - 0 1')
    e.apply('e4e6')
    expect(e.ep).toBe('e5')

    const f = new Hexchess('1/3/5/7/9/11/5P5/11/11/11/11 w - 0 1')
    f.apply('f5f7')
    expect(f.ep).toBe('f6')

    const g = new Hexchess('1/3/5/7/9/11/11/6P4/11/11/11 w - 0 1')
    g.apply('g4g6')
    expect(g.ep).toBe('g5')

    const h = new Hexchess('1/3/5/7/9/11/11/11/7P3/11/11 w - 0 1')
    h.apply('h3h5')
    expect(h.ep).toBe('h4')

    const i = new Hexchess('1/3/5/7/9/11/11/11/11/8P2/11 w - 0 1')
    i.apply('i2i4')
    expect(i.ep).toBe('i3')

    const k = new Hexchess('1/3/5/7/9/11/11/11/11/11/9P1 w - 0 1')
    k.apply('k1k3')
    expect(k.ep).toBe('k2')
  })

  test('white clears en passant (starboard)', () => {
    const hexchess = new Hexchess()
    hexchess.board.f6 = 'P'
    hexchess.board.g5 = 'p'
    hexchess.turn = 'w'
    hexchess.ep = 'g6'

    expect(hexchess.board.g5).toBe('p')

    hexchess.apply('f6g6')

    expect(hexchess.board.g5).toBeNull()
  })

  test('white clears en passant (portside)', () => {
    const hexchess = new Hexchess()
    hexchess.board.e5 = 'p'
    hexchess.board.f6 = 'P'
    hexchess.turn = 'w'
    hexchess.ep = 'e6'

    expect(hexchess.board.e5).toBe('p')

    hexchess.apply('f6e6')

    expect(hexchess.board.e5).toBeNull()
  })

  test('black clears en passant (starboard)', () => {
    const hexchess = new Hexchess()
    hexchess.board.f6 = 'p'
    hexchess.board.e6 = 'P'
    hexchess.turn = 'b'
    hexchess.ep = 'e5'

    expect(hexchess.board.e6).toBe('P')

    hexchess.apply('f6e5')

    expect(hexchess.board.e6).toBeNull()
  })

  test('black clears en passant (portside)', () => {
    const hexchess = new Hexchess()
    hexchess.board.f6 = 'p'
    hexchess.board.g6 = 'P'
    hexchess.turn = 'b'
    hexchess.ep = 'g5'

    expect(hexchess.board.g6).toBe('P')

    hexchess.apply('f6g5')

    expect(hexchess.board.g6).toBeNull()
  })

  test('cannot step out of a pin', () => {
    const hexchess = new Hexchess()
    hexchess.board.f7 = 'K'
    hexchess.board.f6 = 'R'
    hexchess.board.f5 = 'q'

    const moves = hexchess.moves('f6')

    expect(moves.length).toBe(1)
    expect(moves[0].to).toBe('f5')
  })

  test('cannot self check on opponents turn', () => {
    const hexchess = new Hexchess()
    hexchess.board.f7 = 'K'
    hexchess.board.f6 = 'R'
    hexchess.board.f5 = 'q'
    hexchess.turn = 'b'

    const moves = hexchess.moves('f6')

    expect(moves.length).toBe(1)
    expect(moves[0].to).toBe('f5')
  })

  test('king cannot step into check', () => {
    const hexchess = new Hexchess()
    hexchess.board.f11 = 'K'
    hexchess.board.f9 = 'q'

    const moves = hexchess.moves('f11')

    expect(moves).toEqual([])
  })

  test('promote black queen', () => {
    const hexchess = new Hexchess('1/3/5/7/9/11/11/11/11/5p5/11 b - 0 1')
    hexchess.apply('f2f1q')
    expect(hexchess.board.f1).toBe('q')
  })

  test('promote black bishop', () => {
    const hexchess = new Hexchess('1/3/5/7/9/11/11/11/11/5p5/11 b - 0 1')
    hexchess.apply('f2f1b')
    expect(hexchess.board.f1).toBe('b')
  })

  test('promote black rook', () => {
    const hexchess = new Hexchess('1/3/5/7/9/11/11/11/11/5p5/11 b - 0 1')
    hexchess.apply('f2f1r')
    expect(hexchess.board.f1).toBe('r')
  })

  test('promote black knight', () => {
    const hexchess = new Hexchess('1/3/5/7/9/11/11/11/11/5p5/11 b - 0 1')
    hexchess.apply('f2f1n')
    expect(hexchess.board.f1).toBe('n')
  })

  test('promote white queen', () => {
    const hexchess = new Hexchess('1/1P1/5/7/9/11/11/11/11/11/11 w - 0 1')
    hexchess.apply('f10f11q')
    expect(hexchess.board.f11).toBe('Q')
  })

  test('promote white bishop', () => {
    const hexchess = new Hexchess('1/1P1/5/7/9/11/11/11/11/11/11 w - 0 1')
    hexchess.apply('f10f11b')
    expect(hexchess.board.f11).toBe('B')
  })

  test('promote white rook', () => {
    const hexchess = new Hexchess('1/1P1/5/7/9/11/11/11/11/11/11 w - 0 1')
    hexchess.apply('f10f11r')
    expect(hexchess.board.f11).toBe('R')
  })

  test('promote white knight', () => {
    const hexchess = new Hexchess('1/1P1/5/7/9/11/11/11/11/11/11 w - 0 1')
    hexchess.apply('f10f11n')
    expect(hexchess.board.f11).toBe('N')
  })

  test('white cannot promote on black promotion position', () => {
    const hexchess = new Hexchess('1/3/5/7/9/11/11/11/11/11/qP9 w - 0 1')
    expect(() => hexchess.apply('b1a1q')).toThrowError()
  })

  test('black cannot promote on white promotion position', () => {
    const hexchess = new Hexchess('1/3/5/7/p8/Q10/11/11/11/11/11 b - 0 1')
    expect(() => hexchess.apply('b7a6q')).toThrowError()
  })

  test('out of turn', () => {
    const hexchess = Hexchess.init()

    expect(() => hexchess.apply('e7e6')).toThrow()
  })

  test('illegal sequence', () => {
    const hexchess = new Hexchess()

    expect(() => hexchess.apply('b1f11')).toThrow()
  })
})

describe('applyUnsafe', () => {
  test('captures pieces illegally', () => {
    const hexchess = Hexchess.init()

    hexchess.applyUnsafe({ from: 'f5', to: 'f7' })

    expect(hexchess.toString()).toBe('b/qbk/n1b1n/r5r/ppppPpppp/11/11/4P1P4/3P1B1P3/2P2B2P2/1PRNQBKNRP1 b f6 0 1')
  })

  test('string', () => {
    const hexchess = Hexchess.init()

    hexchess.applyUnsafe('g4g5')

    expect(hexchess.toString()).toBe('b/qbk/n1b1n/r5r/ppppppppp/11/5PP4/4P6/3P1B1P3/2P2B2P2/1PRNQBKNRP1 b - 0 1')
  })

  test('return instance', () => {
    const hexchess = Hexchess.init()

    expect(hexchess.applyUnsafe('g4g5')).toBe(hexchess)
  })

  test('piece not found', () => {
    const hexchess = new Hexchess()

    expect(() => hexchess.applyUnsafe({ from: 'a1', to: 'a2' })).toThrow()
  })

  test('illegal promotion', () => {
    const hexchess = Hexchess.from('1/3/2P2/7/9/11/11/11/11/11/11 w - 0 1')

    expect(() => hexchess.applyUnsafe({ from: 'f9', to: 'f10', promotion: 'q' })).toThrow()
  })
})

describe('clear', () => {
  test('creates empty board', () => {
    const hexchess = Hexchess.init()
    hexchess.turn = 'b'
    hexchess.ep = 'b2'
    hexchess.halfmove = 1
    hexchess.fullmove = 2

    hexchess.clear()

    expect(hexchess.toString()).toEqual(emptyPosition)
  })

  test('return instance', () => {
    const hexchess = Hexchess.init()

    expect(hexchess.clear()).toBe(hexchess)
  })
})

test('color', () => {
  const hexchess = new Hexchess('1/3/5/7/9/11/11/p9P/11/11/11 w - 0 1')

  expect(hexchess.color('b')).toEqual(['a4'])
  expect(hexchess.color('w')).toEqual(['l4'])
})

describe('currentMoves', () => {
  test('current turn only', () => {
    const hexchess = new Hexchess('1/3/5/7/9/11/5P5/11/11/11/11 w - 0 1')

    expect(hexchess.currentMoves()).toEqual([
      { from: 'f5', to: 'f6' },
      { from: 'f5', to: 'f7' },
    ])

    hexchess.turn = 'b'

    expect(hexchess.currentMoves()).toEqual([])
  })
})

describe('empty', () => {
  test('creates empty board', () => {
    const hexchess = Hexchess.empty()

    expect(hexchess.toString()).toBe(emptyPosition)
  })
})

describe('findKing', () => {
  test('black', () => {
    const hexchess = Hexchess.init()

    expect(hexchess.findKing('b')).toBe('g10')
  })

  test('white', () => {
    const hexchess = Hexchess.init()

    expect(hexchess.findKing('w')).toBe('g1')
  })

  test('void', () => {
    const hexchess = new Hexchess('1/3/5/7/9/11/11/11/11/11/11 w - 0 1')

    expect(hexchess.findKing('b')).toBe(null)
    expect(hexchess.findKing('w')).toBe(null)
  })
})

describe('from', () => {
  test('creates game by fen', () => {
    const hexchess = Hexchess.from('1/3/5/7/9/5p5/11/11/11/11/11 w - 0 1')

    expect(hexchess.board.f6).toBe('p')
  })
})

describe('init', () => {
  test('creates initial board', () => {
    const hexchess = Hexchess.init()

    expect(hexchess.toString()).toBe(initialPosition)
  })

  test('create instance with applied moves', () => {
    const hexchess = new Hexchess(initialPosition)
    const output = hexchess.apply('g4g5').toString()

    expect(Hexchess.init('g4g5').toString()).toBe(output)
  })

  test('does not init illegal sequences', () => {
    expect(() => Hexchess.init('b1f11')).toThrow()
  })
})

describe('isCheck', () => {
  test('no king', () => {
    const hexchess = new Hexchess()

    expect(hexchess.isCheck()).toBe(false)
  })

  test('in check', () => {
    const hexchess = new Hexchess('K/3/5/7/9/5r5/11/11/11/11/11 w - 0 1')

    expect(hexchess.isCheck()).toBe(true)
  })
})

describe('isCheckmate', () => {
  test('checkmate', () => {
    const hexchess = new Hexchess('K/3/5/3q3/2q6/11/11/11/11/11/11 b - 0 1')

    expect(hexchess.isCheckmate()).toBe(false)

    hexchess.apply('d7f9')

    expect(hexchess.isCheckmate()).toBe(true)
  })
})

describe('isStalemate', () => {
  test('stalemate', () => {
    const hexchess = new Hexchess('k/1P1/5/3K3/9/11/11/11/11/11/11 w - 0 1')

    expect(hexchess.isStalemate()).toBe(false)

    hexchess.apply('f8f9')

    expect(hexchess.isStalemate()).toBe(true)
  })
})

describe('isThreatened', () => {
  test('unattacked position is not threatened', () => {
    const hexchess = new Hexchess()
    hexchess.board.g10 = 'K'

    expect(hexchess.isThreatened('g10')).toBe(false)
  })

  test('threatened by enemy piece', () => {
    const hexchess = new Hexchess()
    hexchess.board.g10 = 'K'
    hexchess.board.g1 = 'r'

    expect(hexchess.isThreatened('g10')).toBe(true)
  })

  test('not threatened by friendly piece', () => {
    const hexchess = new Hexchess()
    hexchess.board.f6 = 'Q'
    hexchess.board.f7 = 'K'

    expect(hexchess.isThreatened('f7')).toBe(false)
  })

  test('position is threatened while attacking or defending', () => {
    const hexchess = new Hexchess()
    hexchess.board.f6 = 'K'
    hexchess.board.f7 = 'q'

    hexchess.turn = 'b'
    expect(hexchess.isThreatened('f6')).toBe(true)

    hexchess.turn = 'w'
    expect(hexchess.isThreatened('f6')).toBe(true)
  })

  test('unoccupied position is not threatened', () => {
    const hexchess = new Hexchess()

    expect(hexchess.isThreatened('f6')).toBe(false)
  })
})

describe('moves', () => {
  test('returns legal moves', () => {
    const hexchess = new Hexchess('1/3/5/7/4r4/5K5/11/11/11/11/11 w - 0 1')

    expect(hexchess.moves('f6')).toEqual([
      { from: 'f6', to: 'f7' },
      { from: 'f6', to: 'g5' },
      { from: 'f6', to: 'g4' },
      { from: 'f6', to: 'e4' },
      { from: 'f6', to: 'e5' },
    ])
  })
})

describe('movesUnsafe', () => {
  test('returns self-check moves', () => {
    const hexchess = new Hexchess('1/3/5/7/4r4/5K5/11/11/11/11/11 w - 0 1')

    expect(hexchess.movesUnsafe('f6')).toEqual([
      { from: 'f6', to: 'f7' },
      { from: 'f6', to: 'g7' },
      { from: 'f6', to: 'g6' },
      { from: 'f6', to: 'h5' },
      { from: 'f6', to: 'g5' },
      { from: 'f6', to: 'g4' },
      { from: 'f6', to: 'f5' },
      { from: 'f6', to: 'e4' },
      { from: 'f6', to: 'e5' },
      { from: 'f6', to: 'd5' },
      { from: 'f6', to: 'e6' },
      { from: 'f6', to: 'e7' },
    ])
  })

  test('unoccupied position', () => {
    const hexchess = new Hexchess()

    expect(hexchess.movesUnsafe('a1')).toEqual([])
  })
})

describe('reset', () => {
  test('creates reset board', () => {
    const hexchess = new Hexchess()
    hexchess.turn = 'b'
    hexchess.ep = 'b2'
    hexchess.halfmove = 1
    hexchess.fullmove = 2

    hexchess.reset()

    expect(hexchess.toString()).toEqual(initialPosition)
  })

  test('return instance', () => {
    const hexchess = new Hexchess()

    expect(hexchess.reset()).toBe(hexchess)
  })
})

describe('toString', () => {
  test('empty', () => {
    const hexchess = new Hexchess()

    expect(hexchess.toString()).toBe(emptyPosition)
  })

  test('initial', () => {
    const hexchess = Hexchess.init()

    expect(hexchess.toString()).toBe(initialPosition)
  })

  test('with en passant', () => {
    const hexchess = Hexchess.init()
    hexchess.apply('g4g6')
    expect(hexchess.toString()).toBe('b/qbk/n1b1n/r5r/ppppppppp/6P4/5P5/4P6/3P1B1P3/2P2B2P2/1PRNQBKNRP1 b g5 0 1')
  })
})
