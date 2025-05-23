import { describe, expect, test } from 'vitest'
import { Hexchess } from '@/index'

describe('advance', () => {
  test('black', () => {
    const hexchess = new Hexchess('1/3/5/7/ppppppppp/11/11/11/11/11/11 w - 0 1')

    expect(hexchess.moves('b7')).toEqual([{ from: 'b7', to: 'b6' }, { from: 'b7', to: 'b5' }])
    expect(hexchess.moves('c7')).toEqual([{ from: 'c7', to: 'c6' }, { from: 'c7', to: 'c5' }])
    expect(hexchess.moves('d7')).toEqual([{ from: 'd7', to: 'd6' }, { from: 'd7', to: 'd5' }])
    expect(hexchess.moves('e7')).toEqual([{ from: 'e7', to: 'e6' }, { from: 'e7', to: 'e5' }])
    expect(hexchess.moves('f7')).toEqual([{ from: 'f7', to: 'f6' }, { from: 'f7', to: 'f5' }])
    expect(hexchess.moves('g7')).toEqual([{ from: 'g7', to: 'g6' }, { from: 'g7', to: 'g5' }])
    expect(hexchess.moves('h7')).toEqual([{ from: 'h7', to: 'h6' }, { from: 'h7', to: 'h5' }])
    expect(hexchess.moves('i7')).toEqual([{ from: 'i7', to: 'i6' }, { from: 'i7', to: 'i5' }])
    expect(hexchess.moves('k7')).toEqual([{ from: 'k7', to: 'k6' }, { from: 'k7', to: 'k5' }])
  })

  test('black (blocked friendly)', () => {
    const hexchess = new Hexchess('1/3/5/7/4p4/5p5/11/11/11/11/11 w - 0 1')

    expect(hexchess.moves('f7')).toEqual([])
  })

  test('black (blocked friendly double)', () => {
    const hexchess = new Hexchess('1/3/5/7/4p4/11/5p5/11/11/11/11 w - 0 1')

    expect(hexchess.moves('f7')).toEqual([{ from: 'f7', to: 'f6' }])
  })

  test('black (blocked enemy)', () => {
    const hexchess = new Hexchess('1/3/5/7/4p4/5P5/11/11/11/11/11 w - 0 1')

    expect(hexchess.moves('f7')).toEqual([])
  })

  test('black (blocked enemy double)', () => {
    const hexchess = new Hexchess('1/3/5/7/4p4/11/5P5/11/11/11/11 w - 0 1')

    expect(hexchess.moves('f7')).toEqual([{ from: 'f7', to: 'f6' }])
  })

  test('white', () => {
    const hexchess = new Hexchess('1/3/5/7/9/11/5P5/4P1P4/3P3P3/2P5P2/1P7P1 w - 0 1')

    expect(hexchess.moves('b1')).toEqual([{ from: 'b1', to: 'b2' }, { from: 'b1', to: 'b3' }])
    expect(hexchess.moves('c2')).toEqual([{ from: 'c2', to: 'c3' }, { from: 'c2', to: 'c4' }])
    expect(hexchess.moves('d3')).toEqual([{ from: 'd3', to: 'd4' }, { from: 'd3', to: 'd5' }])
    expect(hexchess.moves('e4')).toEqual([{ from: 'e4', to: 'e5' }, { from: 'e4', to: 'e6' }])
    expect(hexchess.moves('f5')).toEqual([{ from: 'f5', to: 'f6' }, { from: 'f5', to: 'f7' }])
    expect(hexchess.moves('g4')).toEqual([{ from: 'g4', to: 'g5' }, { from: 'g4', to: 'g6' }])
    expect(hexchess.moves('h3')).toEqual([{ from: 'h3', to: 'h4' }, { from: 'h3', to: 'h5' }])
    expect(hexchess.moves('i2')).toEqual([{ from: 'i2', to: 'i3' }, { from: 'i2', to: 'i4' }])
    expect(hexchess.moves('k1')).toEqual([{ from: 'k1', to: 'k2' }, { from: 'k1', to: 'k3' }])
  })

  test('white (blocked friendly)', () => {
    const hexchess = new Hexchess('1/3/5/7/4P4/5P5/11/11/11/11/11 w - 0 1')

    expect(hexchess.moves('f5')).toEqual([])
  })

  test('white (blocked friendly double)', () => {
    const hexchess = new Hexchess('1/3/5/7/4P4/11/5P5/11/11/11/11 w - 0 1')

    expect(hexchess.moves('f5')).toEqual([{ from: 'f5', to: 'f6' }])
  })

  test('white (blocked enemy)', () => {
    const hexchess = new Hexchess('1/3/5/7/4p4/5P5/11/11/11/11/11 w - 0 1')

    expect(hexchess.moves('f5')).toEqual([])
  })

  test('white (blocked enemy double)', () => {
    const hexchess = new Hexchess('1/3/5/7/4p4/11/5P5/11/11/11/11 w - 0 1')

    expect(hexchess.moves('f5')).toEqual([{ from: 'f5', to: 'f6' }])
  })
})

describe('standard capture', () => {
  test('black', () => {
    const hexchess = new Hexchess('1/3/5/7/9/5p5/4P1P4/11/11/11/11 w - 0 1')
    const moves = hexchess.moves('f6')

    expect(moves).toEqual([
      { from: 'f6', to: 'f5' },
      { from: 'f6', to: 'g5' },
      { from: 'f6', to: 'e5' },
    ])
  })

  test('black (blocked friendly)', () => {
    const hexchess = new Hexchess('1/3/5/7/9/5p5/4p1p4/11/11/11/11 w - 0 1')

    expect(hexchess.moves('f6')).toEqual([{ from: 'f6', to: 'f5' }])
  })

  test('white', () => {
    const hexchess = new Hexchess('1/3/5/7/9/4pPp4/11/11/11/11/11 w - 0 1')
    const moves = hexchess.moves('f6')

    expect(moves).toEqual([
      { from: 'f6', to: 'f7' },
      { from: 'f6', to: 'e6' },
      { from: 'f6', to: 'g6' },
    ])
  })

  test('white (blocked friendly)', () => {
    const hexchess = new Hexchess('1/3/5/7/9/4PPP4/11/11/11/11/11 w - 0 1')

    expect(hexchess.moves('f6')).toEqual([{ from: 'f6', to: 'f7' }])
  })
})

describe('en passant', () => {
  test('black (portside)', () => {
    const hexchess = new Hexchess('1/3/5/7/4P4/4p6/11/11/11/11/11 b f6 0 1')

    expect(hexchess.moves('e6')).toEqual([
      { from: 'e6', to: 'e5' },
      { from: 'e6', to: 'f6' }, // en passant
    ])
  })

  test('black (portside out of turn)', () => {
    const hexchess = new Hexchess('1/3/5/7/4P4/4p6/11/11/11/11/11 w f6 0 1')

    expect(hexchess.moves('e6')).toEqual([
      { from: 'e6', to: 'e5' },
      // f6 is out of turn
    ])
  })

  test('black (starboard)', () => {
    const hexchess = new Hexchess('1/3/5/7/4P4/6p4/11/11/11/11/11 b f6 0 1')

    expect(hexchess.moves('g6')).toEqual([
      { from: 'g6', to: 'g5' },
      { from: 'g6', to: 'f6' }, // en passant
    ])
  })

  test('black (starboard out of turn)', () => {
    const hexchess = new Hexchess('1/3/5/7/4P4/6p4/11/11/11/11/11 w f6 0 1')

    expect(hexchess.moves('g6')).toEqual([
      { from: 'g6', to: 'g5' },
      // f6 is out of turn
    ])
  })

  test('en passant unsets on next move', () => {
    const hexchess = new Hexchess('1/3/5/7/8p/11/11/11/11/11/1P9 w - 0 1')

    hexchess.apply('b1b3')

    expect(hexchess.ep).toEqual('b2')

    hexchess.apply('k7k6')

    expect(hexchess.ep).toEqual(null)
  })
})

describe('promotion', () => {
  test('black', () => {
    const hexchess = new Hexchess('1/3/5/7/9/11/11/11/11/5p5/11 w - 0 1')

    expect(hexchess.moves('f2')).toEqual([
      { from: 'f2', to: 'f1', promotion: 'q' },
      { from: 'f2', to: 'f1', promotion: 'r' },
      { from: 'f2', to: 'f1', promotion: 'b' },
      { from: 'f2', to: 'f1', promotion: 'n' },
    ])
  })

  test('black (capture portside)', () => {
    const hexchess = new Hexchess('1/3/5/7/9/11/11/11/11/5p5/4rrK4 w - 0 1')

    expect(hexchess.moves('f2')).toEqual([
      { from: 'f2', to: 'g1', promotion: 'q' },
      { from: 'f2', to: 'g1', promotion: 'r' },
      { from: 'f2', to: 'g1', promotion: 'b' },
      { from: 'f2', to: 'g1', promotion: 'n' },
    ])
  })

  test('black (capture starboard)', () => {
    const hexchess = new Hexchess('1/3/5/7/9/11/11/11/11/5p5/4Krr4 w - 0 1')

    expect(hexchess.moves('f2')).toEqual([
      { from: 'f2', to: 'e1', promotion: 'q' },
      { from: 'f2', to: 'e1', promotion: 'r' },
      { from: 'f2', to: 'e1', promotion: 'b' },
      { from: 'f2', to: 'e1', promotion: 'n' },
    ])
  })

  test('white', () => {
    const hexchess = new Hexchess('1/1P1/5/7/9/11/11/11/11/11/11 w - 0 1')

    expect(hexchess.moves('f10')).toEqual([
      { from: 'f10', to: 'f11', promotion: 'q' },
      { from: 'f10', to: 'f11', promotion: 'r' },
      { from: 'f10', to: 'f11', promotion: 'b' },
      { from: 'f10', to: 'f11', promotion: 'n' },
    ])
  })

  test('white (capture portside)', () => {
    const hexchess = new Hexchess('R/kPR/5/7/9/11/11/11/11/11/11 w - 0 1')

    expect(hexchess.moves('f10')).toEqual([
      { from: 'f10', to: 'e10', promotion: 'q' },
      { from: 'f10', to: 'e10', promotion: 'r' },
      { from: 'f10', to: 'e10', promotion: 'b' },
      { from: 'f10', to: 'e10', promotion: 'n' },
    ])
  })

  test('white (capture starboard)', () => {
    const hexchess = new Hexchess('R/RPk/5/7/9/11/11/11/11/11/11 w - 0 1')

    expect(hexchess.moves('f10')).toEqual([
      { from: 'f10', to: 'g10', promotion: 'q' },
      { from: 'f10', to: 'g10', promotion: 'r' },
      { from: 'f10', to: 'g10', promotion: 'b' },
      { from: 'f10', to: 'g10', promotion: 'n' },
    ])
  })
})
