import type { positions } from '@/constants'

export type Board = Record<Position, Piece | null>

export type Color = 'b' | 'w'

export type Direction = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11

export type Move = {
  from: Position
  promotion?: PromotionPiece
  to: Position
}

export type Piece = 'p' | 'r' | 'n' | 'b' | 'q' | 'k' | 'P' | 'R' | 'N' | 'B' | 'Q' | 'K'

export type Position = typeof positions[number]

export type PromotionPiece = 'q' | 'r' | 'b' | 'n'

export type Vec<
  T extends number,
  U = number,
  V extends unknown[] = []
> = V['length'] extends T ? V : Vec<T, U, [U, ...V]>
