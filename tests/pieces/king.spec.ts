import { expect, test } from 'vitest'
import { Hexchess } from '@/index'

test('king', () => {
  const hexchess = new Hexchess('P/3/5/7/9/5k5/11/11/11/11/11')
  const moves = hexchess.moves('f6')

  expect(moves).toEqual([
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

test('white king', () => {
  const hexchess = new Hexchess('P/3/5/7/3p1P3/5K5/11/11/11/11/11')
  const moves = hexchess.moves('f6')

  expect(moves).toEqual([
    { from: 'f6', to: 'f7' },
    // g7 is friendly
    { from: 'f6', to: 'g6' },
    { from: 'f6', to: 'h5' },
    { from: 'f6', to: 'g5' },
    { from: 'f6', to: 'g4' },
    { from: 'f6', to: 'f5' },
    { from: 'f6', to: 'e4' },
    { from: 'f6', to: 'e5' },
    { from: 'f6', to: 'd5' },
    { from: 'f6', to: 'e6' },
    { from: 'f6', to: 'e7' }, // e7 is hostile
  ])
})

test('black king', () => {
  const hexchess = new Hexchess('P/3/5/7/3p1P3/5k5/11/11/11/11/11')
  const moves = hexchess.moves('f6')

  expect(moves).toEqual([
    { from: 'f6', to: 'f7' },
    { from: 'f6', to: 'g7' }, // g7 is hostile
    { from: 'f6', to: 'g6' },
    { from: 'f6', to: 'h5' },
    { from: 'f6', to: 'g5' },
    { from: 'f6', to: 'g4' },
    { from: 'f6', to: 'f5' },
    { from: 'f6', to: 'e4' },
    { from: 'f6', to: 'e5' },
    { from: 'f6', to: 'd5' },
    { from: 'f6', to: 'e6' },
    // e7 is friendly
  ])
})
