# Changelog

## 1.7.1

- Fix illegal move sequences

## 1.7.0

- Add `empty` and `from` static helpers
- Expand `init` signature to accept string of moves from the starting position

## 1.6.0

- Improve return types to enable method chaining
- Added support for string moves to `applyUnsafe`

## 1.5.0

- Exposed utils for advanced use, [see docs here &rarr;](https://github.com/scottbedard/hexchess.ts?tab=readme-ov-file#advanced-usage)
  - `createBoard`
  - `getColor`
  - `parseBoard`
  - `parseMove`
  - `stringifyBoard`
  - `stringifyMove` 

## 1.4.0

- Add `Move` support to `apply` method

## 1.3.1

- Added `-h` and `--help` option to CLI commands
- Removed trailing `undefined` from graph

## 1.3.0

- Add `moves` command to CLI

## 1.2.3

- Minor performance and bundle size improvement

## 1.2.2

- Add `-s, --silent` option to CLI

## 1.2.1

- Removed third party dependency from CLI

## 1.2.0

- Command line interface added, [see docs here &rarr;](https://github.com/scottbedard/hexchess.ts?tab=readme-ov-file#cli)
- Renamed `enPassant` property to `ep`

## 1.1.2

- Fix stale en passant values

## 1.1.1

- Fix walk continuing beyond capture

## 1.1.0

- Add `clear` method to remove all state from board
- Add `reset` method to set board to an initial game state
- Expose `emptyPosition`, `initialPosition`, and `positions` constants

## 1.0.1

- Include type definitions in published package

## 1.0.0

- First stable release of library, now in use on [https://hexchess.club](https://hexchess.club)

## 1.0.0-beta.1

Finish initial conversion from wasm package. There have been many API changes, [see documentation here](https://github.com/scottbedard/hexchess.ts)

> **Note:** For versions earlier than 1.x, see [`scottbedard/hexchess.rs`](https://github.com/scottbedard/hexchess.rs)
