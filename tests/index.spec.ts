import { expect, test } from 'vitest'
import { double } from '@/index'

test('double', () => {
  expect(double(2)).toBe(4)
})