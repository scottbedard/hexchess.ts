import { expect, test } from 'vitest'
import { coordinate, step } from '@/index'

test('step', () => {
  expect(step(coordinate.f6, 0)).toBe(coordinate.f7)
  expect(step(coordinate.f6, 1)).toBe(coordinate.g7)
  expect(step(coordinate.f6, 2)).toBe(coordinate.g6)
  expect(step(coordinate.f6, 3)).toBe(coordinate.h5)
  expect(step(coordinate.f6, 4)).toBe(coordinate.g5)
  expect(step(coordinate.f6, 5)).toBe(coordinate.g4)
  expect(step(coordinate.f6, 6)).toBe(coordinate.f5)
  expect(step(coordinate.f6, 7)).toBe(coordinate.e4)
  expect(step(coordinate.f6, 8)).toBe(coordinate.e5)
  expect(step(coordinate.f6, 9)).toBe(coordinate.d5)
  expect(step(coordinate.f6, 10)).toBe(coordinate.e6)
  expect(step(coordinate.f6, 11)).toBe(coordinate.e7)
})