import type { coordinate } from '@/constants'

export type Position = typeof coordinate[keyof typeof coordinate]

export type Vec<
  T extends number,
  U = number,
  V extends unknown[] = []
> = V['length'] extends T ? V : Vec<T, U, [U, ...V]>
