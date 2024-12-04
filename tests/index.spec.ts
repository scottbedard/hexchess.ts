import { expect, test } from 'vitest'
import { hello } from '@/index'

test('adds 1 + 2 to equal 3', () => {
  hello(5)
})