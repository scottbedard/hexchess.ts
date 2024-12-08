/** Hexchess game board */
export type Board = Record<Position, Piece | null>

/** Piece color character */
export type Color = 'b' | 'w'

export type Direction = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11

/** Parsed move */
export type Move = {
  from: Position
  promotion?: PromotionPiece
  to: Position
}

/** Piece characters, uppercase is white and lowercase is black */
export type Piece = 'p' | 'r' | 'n' | 'b' | 'q' | 'k' | 'P' | 'R' | 'N' | 'B' | 'Q' | 'K'

/** Unique board positions */
export type Position = 'f11' | 'e10' | 'f10' | 'g10' | 'd9' | 'e9' | 'f9' | 'g9' | 'h9' | 'c8' | 'd8' | 'e8' | 'f8' | 'g8' | 'h8' | 'i8' | 'b7' | 'c7' | 'd7' | 'e7' | 'f7' | 'g7' | 'h7' | 'i7' | 'k7' | 'a6' | 'b6' | 'c6' | 'd6' | 'e6' | 'f6' | 'g6' | 'h6' | 'i6' | 'k6' | 'l6' | 'a5' | 'b5' | 'c5' | 'd5' | 'e5' | 'f5' | 'g5' | 'h5' | 'i5' | 'k5' | 'l5' | 'a4' | 'b4' | 'c4' | 'd4' | 'e4' | 'f4' | 'g4' | 'h4' | 'i4' | 'k4' | 'l4' | 'a3' | 'b3' | 'c3' | 'd3' | 'e3' | 'f3' | 'g3' | 'h3' | 'i3' | 'k3' | 'l3' | 'a2' | 'b2' | 'c2' | 'd2' | 'e2' | 'f2' | 'g2' | 'h2' | 'i2' | 'k2' | 'l2' | 'a1' | 'b1' | 'c1' | 'd1' | 'e1' | 'f1' | 'g1' | 'h1' | 'i1' | 'k1' | 'l1'

export type PromotionPiece = 'q' | 'r' | 'b' | 'n'

export type Vec<
  T extends number,
  U = number,
  V extends unknown[] = []
> = V['length'] extends T ? V : Vec<T, U, [U, ...V]>
