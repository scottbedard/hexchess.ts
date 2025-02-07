# [`@bedard/hexchess`](https://github.com/scottbedard/hexchess.ts)

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

Install this package via NPM.

```
npm install @bedard/hexchess
```

[View package &rarr;](https://www.npmjs.com/package/@bedard/hexchess)

A bundled version is also available via CDN, with the library exposed globally as `Hexchess`.

```html
<script src="https://unpkg.com/@bedard/hexchess"></script>
```

[View source &rarr;](https://unpkg.com/@bedard/hexchess)

## CLI

The following command line interface is available via `node index.mjs`

```
@bedard/hexchess - 1.7.0

Commands:
  apply <fen> <moves>     apply whitespace separated moves to a position
  is-checkmate <fen>      test if board is in checkmate
  is-stalemate <fen>      test if board is in stalemate 
  moves <fen> <position>  get CSV of all legal moves from a position
  parse <fen>             parse FEN string to JSON
  stringify <json>        stringify JSON to FEN string

Options:
  -h, --help              display help for command
  -s, --silent            silence error messages
```

## Basic usage

Instantiate a `Hexchess` class with an initial [FEN](https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation). Note that since castling is not permitted, that section of the FEN is omitted. If no FEN is provided, the board will be empty. The following static methods are also available to construct games in a particular state.

```ts
import { Hexchess } from '@bedard/hexchess'

// create new game in the starting position
Hexchess.init()

// create new game with initial moves applied
Hexchess.init('g4g5 e7e6')

// create game with an empty board
Hexchess.empty()

// create game from an arbitrary position
Hexchess.from('b/qbk/n1b1n/r5r/ppppppppp/11/5P5/4P1P4/3P1B1P3/2P2B2P2/1PRNQBKNRP1 w - 0 1')
```

#### `apply`

Execute a whitespace separated sequence of moves, or a single `Move` object.

```ts
const hexchess = Hexchess.init()

hexchess.apply('g4g5 e7e6 f5f6 e6f6')

hexchess.apply({ from: 'g5', to: 'f6' })

hexchess.toString() // 'b/qbk/n1b1n/r5r/ppppppppp/11/5PP4/4P6/3P1B1P3/2P2B2P2/1PRNQBKNRP1 b - 0 1'
```

#### `applyUnsafe`

Apply a single move, regardless of turn or legality.

```ts
const hexchess = Hexchess.init()

hexchess.applyUnsafe({ from: 'f5', to: 'f7' })

// 'b/qbk/n1b1n/r5r/ppppPpppp/11/11/4P1P4/3P1B1P3/2P2B2P2/1PRNQBKNRP1 b f6 0 1'
```

#### `clear`

Remove all pieces from the board, and set all other state to their initial values.

```ts
const hexchess = Hexchess.init()

hexchess.clear()

hexchess.toString() // '1/3/5/7/9/11/11/11/11/11/11 w - 0 1'
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

#### `reset`

Reset the board to it's starting position, and set all other state to their initial values.

```ts
const hexchess = new Hexchess()

hexchess.reset()

hexchess.toString() // 'b/qbk/n1b1n/r5r/ppppppppp/11/5P5/4P1P4/3P1B1P3/2P2B2P2/1PRNQBKNRP1 w - 0 1'
```

#### `toString`

Convert a `Hexchess` instance to a string.

```ts
const hexchess = new Hexchess()

hexchess.toString() // '1/3/5/7/9/11/11/11/11/11/11 w - 0 1'
```

## Advanced usage

Several functions are exposed for manually working with the board and pieces.

#### `createBoard`

Create an empty `Board` object.

```ts
import { createBoard } from '@bedard/hexchess'

createBoard() // { f11: null, ... }
```

#### `getColor`

Determine the `Color` of a `Piece`.

```ts
import { getColor } from '@bedard/hexchess'

getColor('P') // 'w'
```

#### `parseBoard`

Parse the board portion of a FEN to `Board` object.

```ts
import { parseBoard } from '@bedard/hexchess'

parseBoard('1/3/5/7/9/11/11/11/11/11/11') // { f11: null, ... }
```

#### `parseMove`

Parse SAN string to a `Move` object.

```ts
import { parseMove } from '@bedard/hexchess'

parseMove('f10f11q') // { from: 'f10', to: 'f11', promotion: 'q' }
```

#### `stringifyBoard`

Format `Board` object as a FEN.

```ts
import { stringifyBoard } from '@bedard/hexchess'

stringifyBoard(board) // '1/3/5/7/9/11/11/11/11/11/11'
```

#### `stringifyMove`

Format `Move` object as SAN string.

```ts
import { stringifyMove } from '@bedard/hexchess'

stringifyMove({ from: 'f10', to: 'f11', promotion: 'q' }) // 'f10f11q'
```

## License

[MIT](https://github.com/scottbedard/hexchess.ts/blob/main/LICENSE)

Copyright (c) 2024-present, Scott Bedard
