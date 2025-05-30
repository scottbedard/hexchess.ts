import { expect, test } from 'vitest'
import { Hexchess } from '@/index'

test('white rook', () => {
  const hexchess = new Hexchess('p/3/5/7/9/P4R5/11/11/11/11/11')

  expect(hexchess.moves('f6')).toEqual([
    { from: 'f6', to: 'f7' },
    { from: 'f6', to: 'f8' },
    { from: 'f6', to: 'f9' },
    { from: 'f6', to: 'f10' },
    { from: 'f6', to: 'f11' }, // f11 is hostile
    { from: 'f6', to: 'g6' },
    { from: 'f6', to: 'h6' },
    { from: 'f6', to: 'i6' },
    { from: 'f6', to: 'k6' },
    { from: 'f6', to: 'l6' },
    { from: 'f6', to: 'g5' },
    { from: 'f6', to: 'h4' },
    { from: 'f6', to: 'i3' },
    { from: 'f6', to: 'k2' },
    { from: 'f6', to: 'l1' },
    { from: 'f6', to: 'f5' },
    { from: 'f6', to: 'f4' },
    { from: 'f6', to: 'f3' },
    { from: 'f6', to: 'f2' },
    { from: 'f6', to: 'f1' },
    { from: 'f6', to: 'e5' },
    { from: 'f6', to: 'd4' },
    { from: 'f6', to: 'c3' },
    { from: 'f6', to: 'b2' },
    { from: 'f6', to: 'a1' },
    { from: 'f6', to: 'e6' },
    { from: 'f6', to: 'd6' },
    { from: 'f6', to: 'c6' },
    { from: 'f6', to: 'b6' },
    // a6 is friendly
  ])
})

test('black rook', () => {
  const hexchess = new Hexchess('P/3/5/7/9/p4r5/11/11/11/11/11')

  expect(hexchess.moves('f6')).toEqual([
    { from: 'f6', to: 'f7' },
    { from: 'f6', to: 'f8' },
    { from: 'f6', to: 'f9' },
    { from: 'f6', to: 'f10' },
    { from: 'f6', to: 'f11' }, // f11 is hostile
    { from: 'f6', to: 'g6' },
    { from: 'f6', to: 'h6' },
    { from: 'f6', to: 'i6' },
    { from: 'f6', to: 'k6' },
    { from: 'f6', to: 'l6' },
    { from: 'f6', to: 'g5' },
    { from: 'f6', to: 'h4' },
    { from: 'f6', to: 'i3' },
    { from: 'f6', to: 'k2' },
    { from: 'f6', to: 'l1' },
    { from: 'f6', to: 'f5' },
    { from: 'f6', to: 'f4' },
    { from: 'f6', to: 'f3' },
    { from: 'f6', to: 'f2' },
    { from: 'f6', to: 'f1' },
    { from: 'f6', to: 'e5' },
    { from: 'f6', to: 'd4' },
    { from: 'f6', to: 'c3' },
    { from: 'f6', to: 'b2' },
    { from: 'f6', to: 'a1' },
    { from: 'f6', to: 'e6' },
    { from: 'f6', to: 'd6' },
    { from: 'f6', to: 'c6' },
    { from: 'f6', to: 'b6' },
    // a6 is friendly
  ])
})
