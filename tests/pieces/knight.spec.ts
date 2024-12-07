import { Hexchess } from '@/index'
import { describe, expect, test } from 'vitest'

test('knight', () => {
  const hexchess = new Hexchess('P/3/5/7/9/5n5/11/11/11/11/11')
  const moves = hexchess.moves('f6')

  expect(moves).toEqual([
    { from: 'f6', to: 'g8' },
    { from: 'f6', to: 'h7' },
    { from: 'f6', to: 'i5' },
    { from: 'f6', to: 'i4' },
    { from: 'f6', to: 'h3' },
    { from: 'f6', to: 'g3' },
    { from: 'f6', to: 'e3' },
    { from: 'f6', to: 'd3' },
    { from: 'f6', to: 'c4' },
    { from: 'f6', to: 'c5' },
    { from: 'f6', to: 'd7' },
    { from: 'f6', to: 'e8' },
  ])
})

test('white knight', () => {
  const hexchess = new Hexchess('P/3/5/2P1p2/9/5N5/11/11/11/11/11')
  const moves = hexchess.moves('f6')

  expect(moves).toEqual([
    { from: 'f6', to: 'g8' }, // g8 is hostile
    { from: 'f6', to: 'h7' },
    { from: 'f6', to: 'i5' },
    { from: 'f6', to: 'i4' },
    { from: 'f6', to: 'h3' },
    { from: 'f6', to: 'g3' },
    { from: 'f6', to: 'e3' },
    { from: 'f6', to: 'd3' },
    { from: 'f6', to: 'c4' },
    { from: 'f6', to: 'c5' },
    { from: 'f6', to: 'd7' },
    // e8 is friendly
  ])
})

test('black knight', () => {
  const hexchess = new Hexchess('P/3/5/2P1p2/9/5n5/11/11/11/11/11')
  const moves = hexchess.moves('f6')

  expect(moves).toEqual([
    // g8 is friendly
    { from: 'f6', to: 'h7' },
    { from: 'f6', to: 'i5' },
    { from: 'f6', to: 'i4' },
    { from: 'f6', to: 'h3' },
    { from: 'f6', to: 'g3' },
    { from: 'f6', to: 'e3' },
    { from: 'f6', to: 'd3' },
    { from: 'f6', to: 'c4' },
    { from: 'f6', to: 'c5' },
    { from: 'f6', to: 'd7' },
    { from: 'f6', to: 'e8' }, // e8 is hostile
  ])
})
