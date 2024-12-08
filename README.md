# [`hexchess.ts`](https://github.com/scottbedard/hexchess.ts)

[![Build](https://github.com/scottbedard/hexchess.ts/actions/workflows/build.yml/badge.svg)](https://github.com/scottbedard/hexchess.ts/actions/workflows/build.yml)

A TypeScript library for [Gliński's hexagonal chess](https://en.wikipedia.org/wiki/Hexagonal_chess#Gli%C5%84ski's_hexagonal_chess), and the brain of [hexchess.club](https://hexchess.club).

<p align="center">
  <a href="https://hexchess.club">
    <img src="assets/hexchess.svg" width="500" />
  </a>
</p>

## Installation

Install this package via npm

```shell
npm install @bedard/hexchess
```

## Basic usage

Instantiate a `Hexchess` class with an initial [FEN](https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation). Note that since castling is not permitted, that section of the FEN is omitted. If no FEN is provided, the board will be empty.

```ts
import { Hexchess } from '@bedard/hexchess'

const game = new Hexchess('b/qbk/n1b1n/r5r/ppppppppp/11/5P5/4P1P4/3P1B1P3/2P2B2P2/1PRNQBKNRP1 w - 0 1')
```

#### `apply`

Execute a whitespace-separated series of moves.

```ts
const game = Hexchess.init()

game.apple('g4g5 e7e6 f5f6 e6f6 g5f6')

game.toString() // 'b/qbk/n1b1n/r5r/ppppppppp/11/5PP4/4P6/3P1B1P3/2P2B2P2/1PRNQBKNRP1 b - 0 1'
```

#### `getColor`

Get array of all positions occupied by a color.

```ts
const game = new Hexchess('1/3/5/7/9/11/11/p9P/11/11/11 w - 0 1')

game.getColors('b') // ['a4']
```

## License

[MIT](https://github.com/scottbedard/hexchess.ts/blob/main/LICENSE)

Copyright (c) 2024-present, Scott Bedard
