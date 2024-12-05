import type { positions } from '@/constants'

declare const tag: unique symbol

export type Color = 'b' | 'w'

export type Direction = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11

export type Opaque<T, Token> = T & { [tag]: [T, Token] }

export type Position = typeof positions[number]

export type Vec<
  T extends number,
  U = number,
  V extends unknown[] = []
> = V['length'] extends T ? V : Vec<T, U, [U, ...V]>
