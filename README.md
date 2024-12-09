# [`hexchess.ts`](https://github.com/scottbedard/hexchess.ts)

[![Build](https://github.com/scottbedard/hexchess.ts/actions/workflows/build.yml/badge.svg)](https://github.com/scottbedard/hexchess.ts/actions/workflows/build.yml)
[![Coverage](https://codecov.io/gh/scottbedard/hexchess.ts/graph/badge.svg?token=VW6bvs4YU5)](https://codecov.io/gh/scottbedard/hexchess.ts)
[![NPM](https://img.shields.io/npm/v/%40bedard%2Fhexchess)](https://www.npmjs.com/package/@bedard/hexchess)
[![Bundlephobia](https://img.shields.io/bundlephobia/minzip/%40bedard%2Fhexchess?label=size)](https://bundlephobia.com/package/@bedard/hexchess)
[![License](https://img.shields.io/badge/license-MIT-blue)](https://github.com/scottbedard/hexchess.ts/blob/main/LICENSE)

A TypeScript library for [Gliński's hexagonal chess](https://en.wikipedia.org/wiki/Hexagonal_chess#Gli%C5%84ski's_hexagonal_chess), and the brain of [hexchess.club](https://hexchess.club).

<p align="center">
  <a href="https://hexchess.club">
    <img src="assets/hexchess.svg" width="500" />
  </a>
</p>

## Installation

Install this package via npm

```
npm install @bedard/hexchess
```

A bundled version is also available, with the library exposed as `Hexchess`.

```html
<script src="https://unpkg.com/@bedard/hexchess.ts"></script>
```

## Basic usage

Instantiate a `Hexchess` class with an initial [FEN](https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation). Note that since castling is not permitted, that section of the FEN is omitted. If no FEN is provided, the board will be empty.

```ts
import { Hexchess } from '@bedard/hexchess'

const hexchess = new Hexchess()
```

#### `apply`

Execute a whitespace-separated series of moves.

```ts
const hexchess = Hexchess.init()

hexchess.apply('g4g5 e7e6 f5f6 e6f6 g5f6')

hexchess.toString() // 'b/qbk/n1b1n/r5r/ppppppppp/11/5PP4/4P6/3P1B1P3/2P2B2P2/1PRNQBKNRP1 b - 0 1'
```

#### `applyUnsafe`

Apply a single move, regardless of turn or legality.

```ts
const hexchess = Hexchess.init()

hexchess.applyUnsafe({ from: 'f5', to: 'f7' })

// 'b/qbk/n1b1n/r5r/ppppPpppp/11/11/4P1P4/3P1B1P3/2P2B2P2/1PRNQBKNRP1 b f6 0 1'
```

#### `color`

Get all positions occupied by a color.

```ts
const hexchess = new Hexchess('1/3/5/7/9/11/11/p9P/11/11/11 w - 0 1')

hexchess.getColors('b') // ['a4']
```

#### `currentMoves`

Get all current legal moves.

```ts
const hexchess = new Hexchess('1/3/5/7/9/11/5P5/11/11/11/11 w - 0 1')

hexchess.currentMoves() // [{ from: 'f5', to: 'f6' }, { from: 'f5', to: 'f7' }]
```

#### `findKing`

Return a king's position.

```ts
const hexchess = Hexchess.init()

hexchess.findKing('b') // g10
```

#### `isCheck`

Test if the board is in check.

```ts
const hexchess = new Hexchess('K/3/5/7/9/5r5/11/11/11/11/11 w - 0 1')

hexchess.isCheck() // true
```

#### `isCheckmate`

Test if the board is in checkmate.

```ts
const hexchess = new Hexchess('K/3/2q2/3q3/9/11/11/11/11/11/11 w - 1 2')

hexchess.isCheckmate() // true
```

#### `isStalemate`

Test if the board is in stalemate.

```ts
const hexchess = new Hexchess('k/1P1/2K2/7/9/11/11/11/11/11/11 b - 1 1')

hexchess.isStalemate() // true
```

#### `isThreatened`

Test if a position is threatened.

```ts
const hexchess = new Hexchess('K/3/5/7/9/5r5/11/11/11/11/11 w - 0 1')

hexchess.isThreatened('f11') // true
```

#### `moves`

Get legal moves from a position.

```ts
const hexchess = Hexchess.init()

hexchess.moves('f6') // [{ from: 'f6', to: 'f7' }]
```

#### `movesUnsafe`

Get array of moves, including ones that result in self-check.

```ts
const hexchess = new Hexchess('1/3/5/7/4r4/5K5/11/11/11/11/11 w - 0 1')

hexchess.movesUnsafe() // [{ from: 'f6', to: 'f7' }, { from: 'f6', to: 'g7' }, ...]
```

#### `toString`

Convert a `Hexchess` instance to a string.

```ts
const hexchess = new Hexchess()

hexchess.toString() // '1/3/5/7/9/11/11/11/11/11/11 w - 0 1'
```

## License

[MIT](https://github.com/scottbedard/hexchess.ts/blob/main/LICENSE)

Copyright (c) 2024-present, Scott Bedard
