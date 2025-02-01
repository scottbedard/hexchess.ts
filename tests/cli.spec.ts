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
})

describe('is-checkmate', () => {
  test('missing params', () => {
    expect(() => cli(['is-checkmate'])).toThrowError()
  })

  test('success', () => {
    const output = cli(['is-checkmate', 'K/3/2q2/3q3/9/11/11/11/11/11/11 w - 1 2'])
    expect(output).toBe('true')
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
})

describe('parse', () => {
  test('missing params', () => {
    expect(() => cli(['parse'])).toThrowError()
  })

  test('success', () => {
    const output = cli(['parse', initialPosition])
    expect(output).toEqual(JSON.stringify(new Hexchess(initialPosition)))
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
})

test('unknown command', () => {
  expect(() => cli(['whoops'])).toThrowError()
})
