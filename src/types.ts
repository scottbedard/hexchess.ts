import type { position } from '@/constants'

export type Color = 'b' | 'w'

export type Direction = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11

export type Position = typeof position[number]

export type Vec<
  T extends number,
  U = number,
  V extends unknown[] = []
> = V['length'] extends T ? V : Vec<T, U, [U, ...V]>
