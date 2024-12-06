import { expect, test } from 'vitest'
import { Hexchess } from '@/index'

test('white bishop', () => {
  const hexchess = new Hexchess('1/3/5/1p3P1/9/5B5/11/11/11/11/11')

  expect(hexchess.moves('f6')).toEqual([
    { from: 'f6', 'to': 'g7' },
    // h8 is friendly
    { from: 'f6', 'to': 'h5' },
    { from: 'f6', 'to': 'k4' },
    { from: 'f6', 'to': 'g4' },
    { from: 'f6', 'to': 'h2' },
    { from: 'f6', 'to': 'e4' },
    { from: 'f6', 'to': 'd2' },
    { from: 'f6', 'to': 'd5' },
    { from: 'f6', 'to': 'b4' },
    { from: 'f6', 'to': 'e7' },
    { from: 'f6', 'to': 'd8' }, // d8 is hostile
  ])
})

test('black bishop', () => {
  const hexchess = new Hexchess('1/3/5/1p3P1/9/5b5/11/11/11/11/11')

  expect(hexchess.moves('f6')).toEqual([
    { from: 'f6', 'to': 'g7' },
    { from: 'f6', 'to': 'h8' }, // h8 is hostile
    { from: 'f6', 'to': 'h5' },
    { from: 'f6', 'to': 'k4' },
    { from: 'f6', 'to': 'g4' },
    { from: 'f6', 'to': 'h2' },
    { from: 'f6', 'to': 'e4' },
    { from: 'f6', 'to': 'd2' },
    { from: 'f6', 'to': 'd5' },
    { from: 'f6', 'to': 'b4' },
    { from: 'f6', 'to': 'e7' },
    // d8 is friendly
  ])
})
