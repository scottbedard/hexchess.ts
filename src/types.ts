import type { positions } from '@/constants'

declare const tag: unique symbol

export type Board = Record<Position, Piece | null>

export type Color = 'b' | 'w'

export type Direction = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11

export type Move = {
  from: Position
  to: Position
  promotion?: Promotion
}

export type Opaque<T, Token> = T & { [tag]: [T, Token] }

export type Piece = 'p' | 'r' | 'n' | 'b' | 'q' | 'k' | 'P' | 'R' | 'N' | 'B' | 'Q' | 'K'

export type Position = typeof positions[number]

export type Promotion = Exclude<Piece, 'p' | 'P' | 'k' | 'K'>

export type Vec<
  T extends number,
  U = number,
  V extends unknown[] = []
> = V['length'] extends T ? V : Vec<T, U, [U, ...V]>
