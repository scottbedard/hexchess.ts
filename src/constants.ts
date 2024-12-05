import type { Vec } from '@/types'

/**
 * Board coordinates with their corresponding FEN position.
 */
export const position = [
  'f11',
  'e10',
  'f10',
  'g10',
  'd9',
  'e9',
  'f9',
  'g9',
  'h9',
  'c8',
  'd8',
  'e8',
  'f8',
  'g8',
  'h8',
  'i8',
  'b7',
  'c7',
  'd7',
  'e7',
  'f7',
  'g7',
  'h7',
  'i7',
  'k7',
  'a6',
  'b6',
  'c6',
  'd6',
  'e6',
  'f6',
  'g6',
  'h6',
  'i6',
  'k6',
  'l6',
  'a5',
  'b5',
  'c5',
  'd5',
  'e5',
  'f5',
  'g5',
  'h5',
  'i5',
  'k5',
  'l5',
  'a4',
  'b4',
  'c4',
  'd4',
  'e4',
  'f4',
  'g4',
  'h4',
  'i4',
  'k4',
  'l4',
  'a3',
  'b3',
  'c3',
  'd3',
  'e3',
  'f3',
  'g3',
  'h3',
  'i3',
  'k3',
  'l3',
  'a2',
  'b2',
  'c2',
  'd2',
  'e2',
  'f2',
  'g2',
  'h2',
  'i2',
  'k2',
  'l2',
  'a1',
  'b1',
  'c1',
  'd1',
  'e1',
  'f1',
  'g1',
  'h1',
  'i1',
  'k1',
  'l1',
] as const

/**
 * This array describes the relationship of positions relative to one another.
 * Think of these like the hands of a clock, with the selected position at the center.
 * The first sibling is at 12 o'clock, the second is at 1 o'clock, and so on.
 */
export const board: Record<
  typeof position[number],
  Vec<12, typeof position[number] | undefined>
> = {
  a1: [
    'a2',
    'b3',
    'b2',
    'c2',
    'b1',
    ,
    ,
    ,
    ,
    ,
    ,
    ,
  ],
  a2: [
    'a3',
    'b4',
    'b3',
    'c3',
    'b2',
    'b1',
    'a1',
    ,
    ,
    ,
    ,
    ,
  ],
  a3: [
    'a4',
    'b5',
    'b4',
    'c4',
    'b3',
    'b2',
    'a2',
    ,
    ,
    ,
    ,
    ,
  ],
  a4: [
    'a5',
    'b6',
    'b5',
    'c5',
    'b4',
    'b3',
    'a3',
    ,
    ,
    ,
    ,
    ,
  ],
  a5: [
    'a6',
    'b7',
    'b6',
    'c6',
    'b5',
    'b4',
    'a4',
    ,
    ,
    ,
    ,
    ,
  ],
  a6: [
    ,
    ,
    'b7',
    'c7',
    'b6',
    'b5',
    'a5',
    ,
    ,
    ,
    ,
    ,
  ],
  b1: [
    'b2',
    'c3',
    'c2',
    'd2',
    'c1',
    ,
    ,
    ,
    ,
    ,
    'a1',
    'a2',
  ],
  b2: [
    'b3',
    'c4',
    'c3',
    'd3',
    'c2',
    'c1',
    'b1',
    ,
    'a1',
    ,
    'a2',
    'a3',
  ],
  b3: [
    'b4',
    'c5',
    'c4',
    'd4',
    'c3',
    'c2',
    'b2',
    'a1',
    'a2',
    ,
    'a3',
    'a4',
  ],
  b4: [
    'b5',
    'c6',
    'c5',
    'd5',
    'c4',
    'c3',
    'b3',
    'a2',
    'a3',
    ,
    'a4',
    'a5',
  ],
  b5: [
    'b6',
    'c7',
    'c6',
    'd6',
    'c5',
    'c4',
    'b4',
    'a3',
    'a4',
    ,
    'a5',
    'a6',
  ],
  b6: [
    'b7',
    'c8',
    'c7',
    'd7',
    'c6',
    'c5',
    'b5',
    'a4',
    'a5',
    ,
    'a6',
    ,
  ],
  b7: [
    ,
    ,
    'c8',
    'd8',
    'c7',
    'c6',
    'b6',
    'a5',
    'a6',
    ,
    ,
    ,
  ],
  c1: [
    'c2',
    'd3',
    'd2',
    'e2',
    'd1',
    ,
    ,
    ,
    ,
    ,
    'b1',
    'b2',
  ],
  c2: [
    'c3',
    'd4',
    'd3',
    'e3',
    'd2',
    'd1',
    'c1',
    ,
    'b1',
    'a1',
    'b2',
    'b3',
  ],
  c3: [
    'c4',
    'd5',
    'd4',
    'e4',
    'd3',
    'd2',
    'c2',
    'b1',
    'b2',
    'a2',
    'b3',
    'b4',
  ],
  c4: [
    'c5',
    'd6',
    'd5',
    'e5',
    'd4',
    'd3',
    'c3',
    'b2',
    'b3',
    'a3',
    'b4',
    'b5',
  ],
  c5: [
    'c6',
    'd7',
    'd6',
    'e6',
    'd5',
    'd4',
    'c4',
    'b3',
    'b4',
    'a4',
    'b5',
    'b6',
  ],
  c6: [
    'c7',
    'd8',
    'd7',
    'e7',
    'd6',
    'd5',
    'c5',
    'b4',
    'b5',
    'a5',
    'b6',
    'b7',
  ],
  c7: [
    'c8',
    'd9',
    'd8',
    'e8',
    'd7',
    'd6',
    'c6',
    'b5',
    'b6',
    'a6',
    'b7',
    ,
  ],
  c8: [
    ,
    ,
    'd9',
    'e9',
    'd8',
    'd7',
    'c7',
    'b6',
    'b7',
    ,
    ,
    ,
  ],
  d1: [
    'd2',
    'e3',
    'e2',
    'f2',
    'e1',
    ,
    ,
    ,
    ,
    ,
    'c1',
    'c2',
  ],
  d2: [
    'd3',
    'e4',
    'e3',
    'f3',
    'e2',
    'e1',
    'd1',
    ,
    'c1',
    'b1',
    'c2',
    'c3',
  ],
  d3: [
    'd4',
    'e5',
    'e4',
    'f4',
    'e3',
    'e2',
    'd2',
    'c1',
    'c2',
    'b2',
    'c3',
    'c4',
  ],
  d4: [
    'd5',
    'e6',
    'e5',
    'f5',
    'e4',
    'e3',
    'd3',
    'c2',
    'c3',
    'b3',
    'c4',
    'c5',
  ],
  d5: [
    'd6',
    'e7',
    'e6',
    'f6',
    'e5',
    'e4',
    'd4',
    'c3',
    'c4',
    'b4',
    'c5',
    'c6',
  ],
  d6: [
    'd7',
    'e8',
    'e7',
    'f7',
    'e6',
    'e5',
    'd5',
    'c4',
    'c5',
    'b5',
    'c6',
    'c7',
  ],
  d7: [
    'd8',
    'e9',
    'e8',
    'f8',
    'e7',
    'e6',
    'd6',
    'c5',
    'c6',
    'b6',
    'c7',
    'c8',
  ],
  d8: [
    'd9',
    'e10',
    'e9',
    'f9',
    'e8',
    'e7',
    'd7',
    'c6',
    'c7',
    'b7',
    'c8',
    ,
  ],
  d9: [
    ,
    ,
    'e10',
    'f10',
    'e9',
    'e8',
    'd8',
    'c7',
    'c8',
    ,
    ,
    ,
  ],
  e1: [
    'e2',
    'f3',
    'f2',
    'g1',
    'f1',
    ,
    ,
    ,
    ,
    ,
    'd1',
    'd2',
  ],
  e2: [
    'e3',
    'f4',
    'f3',
    'g2',
    'f2',
    'f1',
    'e1',
    ,
    'd1',
    'c1',
    'd2',
    'd3',
  ],
  e3: [
    'e4',
    'f5',
    'f4',
    'g3',
    'f3',
    'f2',
    'e2',
    'd1',
    'd2',
    'c2',
    'd3',
    'd4',
  ],
  e4: [
    'e5',
    'f6',
    'f5',
    'g4',
    'f4',
    'f3',
    'e3',
    'd2',
    'd3',
    'c3',
    'd4',
    'd5',
  ],
  e5: [
    'e6',
    'f7',
    'f6',
    'g5',
    'f5',
    'f4',
    'e4',
    'd3',
    'd4',
    'c4',
    'd5',
    'd6',
  ],
  e6: [
    'e7',
    'f8',
    'f7',
    'g6',
    'f6',
    'f5',
    'e5',
    'd4',
    'd5',
    'c5',
    'd6',
    'd7',
  ],
  e7: [
    'e8',
    'f9',
    'f8',
    'g7',
    'f7',
    'f6',
    'e6',
    'd5',
    'd6',
    'c6',
    'd7',
    'd8',
  ],
  e8: [
    'e9',
    'f10',
    'f9',
    'g8',
    'f8',
    'f7',
    'e7',
    'd6',
    'd7',
    'c7',
    'd8',
    'd9',
  ],
  e9: [
    'e10',
    'f11',
    'f10',
    'g9',
    'f9',
    'f8',
    'e8',
    'd7',
    'd8',
    'c8',
    'd9',
    ,
  ],
  e10: [
    ,
    ,
    'f11',
    'g10',
    'f10',
    'f9',
    'e9',
    'd8',
    'd9',
    ,
    ,
    ,
  ],
  f1: [
    'f2',
    'g2',
    'g1',
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    'e1',
    'e2',
  ],
  f2: [
    'f3',
    'g3',
    'g2',
    'h1',
    'g1',
    ,
    'f1',
    ,
    'e1',
    'd1',
    'e2',
    'e3',
  ],
  f3: [
    'f4',
    'g4',
    'g3',
    'h2',
    'g2',
    'g1',
    'f2',
    'e1',
    'e2',
    'd2',
    'e3',
    'e4',
  ],
  f4: [
    'f5',
    'g5',
    'g4',
    'h3',
    'g3',
    'g2',
    'f3',
    'e2',
    'e3',
    'd3',
    'e4',
    'e5',
  ],
  f5: [
    'f6',
    'g6',
    'g5',
    'h4',
    'g4',
    'g3',
    'f4',
    'e3',
    'e4',
    'd4',
    'e5',
    'e6',
  ],
  f6: [
    'f7',
    'g7',
    'g6',
    'h5',
    'g5',
    'g4',
    'f5',
    'e4',
    'e5',
    'd5',
    'e6',
    'e7',
  ],
  f7: [
    'f8',
    'g8',
    'g7',
    'h6',
    'g6',
    'g5',
    'f6',
    'e5',
    'e6',
    'd6',
    'e7',
    'e8',
  ],
  f8: [
    'f9',
    'g9',
    'g8',
    'h7',
    'g7',
    'g6',
    'f7',
    'e6',
    'e7',
    'd7',
    'e8',
    'e9',
  ],
  f9: [
    'f10',
    'g10',
    'g9',
    'h8',
    'g8',
    'g7',
    'f8',
    'e7',
    'e8',
    'd8',
    'e9',
    'e10',
  ],
  f10: [
    'f11',
    ,
    'g10',
    'h9',
    'g9',
    'g8',
    'f9',
    'e8',
    'e9',
    'd9',
    'e10',
    ,
  ],
  f11: [
    ,
    ,
    ,
    ,
    'g10',
    'g9',
    'f10',
    'e9',
    'e10',
    ,
    ,
    ,
  ],
  g1: [
    'g2',
    'h2',
    'h1',
    ,
    ,
    ,
    ,
    ,
    'f1',
    'e1',
    'f2',
    'f3',
  ],
  g2: [
    'g3',
    'h3',
    'h2',
    'i1',
    'h1',
    ,
    'g1',
    'f1',
    'f2',
    'e2',
    'f3',
    'f4',
  ],
  g3: [
    'g4',
    'h4',
    'h3',
    'i2',
    'h2',
    'h1',
    'g2',
    'f2',
    'f3',
    'e3',
    'f4',
    'f5',
  ],
  g4: [
    'g5',
    'h5',
    'h4',
    'i3',
    'h3',
    'h2',
    'g3',
    'f3',
    'f4',
    'e4',
    'f5',
    'f6',
  ],
  g5: [
    'g6',
    'h6',
    'h5',
    'i4',
    'h4',
    'h3',
    'g4',
    'f4',
    'f5',
    'e5',
    'f6',
    'f7',
  ],
  g6: [
    'g7',
    'h7',
    'h6',
    'i5',
    'h5',
    'h4',
    'g5',
    'f5',
    'f6',
    'e6',
    'f7',
    'f8',
  ],
  g7: [
    'g8',
    'h8',
    'h7',
    'i6',
    'h6',
    'h5',
    'g6',
    'f6',
    'f7',
    'e7',
    'f8',
    'f9',
  ],
  g8: [
    'g9',
    'h9',
    'h8',
    'i7',
    'h7',
    'h6',
    'g7',
    'f7',
    'f8',
    'e8',
    'f9',
    'f10',
  ],
  g9: [
    'g10',
    ,
    'h9',
    'i8',
    'h8',
    'h7',
    'g8',
    'f8',
    'f9',
    'e9',
    'f10',
    'f11',
  ],
  g10: [
    ,
    ,
    ,
    ,
    'h9',
    'h8',
    'g9',
    'f9',
    'f10',
    'e10',
    'f11',
    ,
  ],
  h1: [
    'h2',
    'i2',
    'i1',
    ,
    ,
    ,
    ,
    ,
    'g1',
    'f2',
    'g2',
    'g3',
  ],
  h2: [
    'h3',
    'i3',
    'i2',
    'k1',
    'i1',
    ,
    'h1',
    'g1',
    'g2',
    'f3',
    'g3',
    'g4',
  ],
  h3: [
    'h4',
    'i4',
    'i3',
    'k2',
    'i2',
    'i1',
    'h2',
    'g2',
    'g3',
    'f4',
    'g4',
    'g5',
  ],
  h4: [
    'h5',
    'i5',
    'i4',
    'k3',
    'i3',
    'i2',
    'h3',
    'g3',
    'g4',
    'f5',
    'g5',
    'g6',
  ],
  h5: [
    'h6',
    'i6',
    'i5',
    'k4',
    'i4',
    'i3',
    'h4',
    'g4',
    'g5',
    'f6',
    'g6',
    'g7',
  ],
  h6: [
    'h7',
    'i7',
    'i6',
    'k5',
    'i5',
    'i4',
    'h5',
    'g5',
    'g6',
    'f7',
    'g7',
    'g8',
  ],
  h7: [
    'h8',
    'i8',
    'i7',
    'k6',
    'i6',
    'i5',
    'h6',
    'g6',
    'g7',
    'f8',
    'g8',
    'g9',
  ],
  h8: [
    'h9',
    ,
    'i8',
    'k7',
    'i7',
    'i6',
    'h7',
    'g7',
    'g8',
    'f9',
    'g9',
    'g10',
  ],
  h9: [
    ,
    ,
    ,
    ,
    'i8',
    'i7',
    'h8',
    'g8',
    'g9',
    'f10',
    'g10',
    ,
  ],
  i1: [
    'i2',
    'k2',
    'k1',
    ,
    ,
    ,
    ,
    ,
    'h1',
    'g2',
    'h2',
    'h3',
  ],
  i2: [
    'i3',
    'k3',
    'k2',
    'l1',
    'k1',
    ,
    'i1',
    'h1',
    'h2',
    'g3',
    'h3',
    'h4',
  ],
  i3: [
    'i4',
    'k4',
    'k3',
    'l2',
    'k2',
    'k1',
    'i2',
    'h2',
    'h3',
    'g4',
    'h4',
    'h5',
  ],
  i4: [
    'i5',
    'k5',
    'k4',
    'l3',
    'k3',
    'k2',
    'i3',
    'h3',
    'h4',
    'g5',
    'h5',
    'h6',
  ],
  i5: [
    'i6',
    'k6',
    'k5',
    'l4',
    'k4',
    'k3',
    'i4',
    'h4',
    'h5',
    'g6',
    'h6',
    'h7',
  ],
  i6: [
    'i7',
    'k7',
    'k6',
    'l5',
    'k5',
    'k4',
    'i5',
    'h5',
    'h6',
    'g7',
    'h7',
    'h8',
  ],
  i7: [
    'i8',
    ,
    'k7',
    'l6',
    'k6',
    'k5',
    'i6',
    'h6',
    'h7',
    'g8',
    'h8',
    'h9',
  ],
  i8: [
    ,
    ,
    ,
    ,
    'k7',
    'k6',
    'i7',
    'h7',
    'h8',
    'g9',
    'h9',
    ,
  ],
  k1: [
    'k2',
    'l2',
    'l1',
    ,
    ,
    ,
    ,
    ,
    'i1',
    'h2',
    'i2',
    'i3',
  ],
  k2: [
    'k3',
    'l3',
    'l2',
    ,
    'l1',
    ,
    'k1',
    'i1',
    'i2',
    'h3',
    'i3',
    'i4',
  ],
  k3: [
    'k4',
    'l4',
    'l3',
    ,
    'l2',
    'l1',
    'k2',
    'i2',
    'i3',
    'h4',
    'i4',
    'i5',
  ],
  k4: [
    'k5',
    'l5',
    'l4',
    ,
    'l3',
    'l2',
    'k3',
    'i3',
    'i4',
    'h5',
    'i5',
    'i6',
  ],
  k5: [
    'k6',
    'l6',
    'l5',
    ,
    'l4',
    'l3',
    'k4',
    'i4',
    'i5',
    'h6',
    'i6',
    'i7',
  ],
  k6: [
    'k7',
    ,
    'l6',
    ,
    'l5',
    'l4',
    'k5',
    'i5',
    'i6',
    'h7',
    'i7',
    'i8',
  ],
  k7: [
    ,
    ,
    ,
    ,
    'l6',
    'l5',
    'k6',
    'i6',
    'i7',
    'h8',
    'i8',
    ,
  ],
  l1: [
    'l2',
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    'k1',
    'i2',
    'k2',
    'k3',
  ],
  l2: [
    'l3',
    ,
    ,
    ,
    ,
    ,
    'l1',
    'k1',
    'k2',
    'i3',
    'k3',
    'k4',
  ],
  l3: [
    'l4',
    ,
    ,
    ,
    ,
    ,
    'l2',
    'k2',
    'k3',
    'i4',
    'k4',
    'k5',
  ],
  l4: [
    'l5',
    ,
    ,
    ,
    ,
    ,
    'l3',
    'k3',
    'k4',
    'i5',
    'k5',
    'k6',
  ],
  l5: [
    'l6',
    ,
    ,
    ,
    ,
    ,
    'l4',
    'k4',
    'k5',
    'i6',
    'k6',
    'k7',
  ],
  l6: [
    ,
    ,
    ,
    ,
    ,
    ,
    'l5',
    'k5',
    'k6',
    'i7',
    'k7',
    ,
  ],
} as const