import { describe, expect, test } from 'vitest'
import { Hexchess } from '@/hexchess'
import { initialPosition } from '@/constants'
import cli from '@/cli'

test('home screen', () => {
  const output = cli([])
  expect(output.includes('@bedard/hexchess')).toBe(true)
})

describe('apply', () => {
  test('missing params', () => {
    expect(() => cli(['apply', initialPosition])).toThrowError()
  })

  test('success', () => {
    const output = cli(['apply', initialPosition, 'c2c4'])
    expect(output).toBe('b/qbk/n1b1n/r5r/ppppppppp/11/5P5/2P1P1P4/3P1B1P3/5B2P2/1PRNQBKNRP1 b c3 0 1')
  })

  test('help', () => {
    const output = cli(['apply', '-h'])
    expect(typeof output).toBe('string')
  })
})

describe('current-moves', () => {
  test('missing params', () => {
    expect(() => cli(['current-moves'])).toThrowError()
  })

  test('success', () => {
    const output = cli(['current-moves', initialPosition])
    expect(output).toBe('f5f6,e4e5,e4e6,g4g5,g4g6,d3d4,d3d5,f3h2,f3d2,h3h4,h3h5,c2c3,c2c4,f2g3,f2h4,f2i5,f2k6,f2e3,f2d4,f2c5,f2b6,i2i3,i2i4,b1b2,b1b3,c1d2,c1e3,c1f4,d1f4,d1g2,d1b2,d1c3,e1e2,e1e3,e1d2,e1c3,e1b4,e1a5,f1g2,f1e2,g1g2,g1h2,h1i3,h1k2,h1e2,h1f4,i1h2,i1g3,i1f4,k1k2,k1k3')
  })
})

describe('is-checkmate', () => {
  test('missing params', () => {
    expect(() => cli(['is-checkmate'])).toThrowError()
  })

  test('success', () => {
    const output = cli(['is-checkmate', 'K/3/2q2/3q3/9/11/11/11/11/11/11 w - 1 2'])
    expect(output).toBe('true')
  })

  test('help', () => {
    const output = cli(['is-checkmate', '-h'])
    expect(typeof output).toBe('string')
  })
})

describe('is-stalemate', () => {
  test('missing params', () => {
    expect(() => cli(['is-stalemate'])).toThrowError()
  })

  test('success', () => {
    const output = cli(['is-stalemate', 'k/1P1/2K2/7/9/11/11/11/11/11/11 b - 1 1'])
    expect(output).toBe('true')
  })

  test('help', () => {
    const output = cli(['is-stalemate', '-h'])
    expect(typeof output).toBe('string')
  })
})

describe('moves', () => {
  test('missing params', () => {
    expect(() => cli(['moves'])).toThrowError()
  })

  test('invalid position', () => {
    expect(() => cli(['moves', initialPosition, 'whoops'])).toThrowError()
  })

  test('success', () => {
    const output = cli(['moves', initialPosition, 'e4'])
    expect(output).toBe('e4e5,e4e6')
  })

  test('help', () => {
    const output = cli(['moves', '-h'])
    expect(typeof output).toBe('string')
  })
})

describe('parse', () => {
  test('missing params', () => {
    expect(() => cli(['parse'])).toThrowError()
  })

  test('success', () => {
    const output = cli(['parse', initialPosition])
    expect(output).toEqual(JSON.stringify(new Hexchess(initialPosition)))
  })

  test('help', () => {
    const output = cli(['parse', '-h'])
    expect(typeof output).toBe('string')
  })
})

describe('stringify', () => {
  test('missing params', () => {
    expect(() => cli(['stringify'])).toThrowError()
  })

  test('success', () => {
    const output = cli(['stringify', JSON.stringify(new Hexchess(initialPosition))])
    expect(output).toBe(initialPosition)
  })

  test('help', () => {
    const output = cli(['stringify', '-h'])
    expect(typeof output).toBe('string')
  })
})

test('unknown command', () => {
  expect(() => cli(['whoops'])).toThrowError()
})
