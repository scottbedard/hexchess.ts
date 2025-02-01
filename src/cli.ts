import { Hexchess } from './hexchess'
import { isPosition, stringifyMove } from './board'

export default function run(args: string[]): string | undefined {
  //
  // home screen
  //
  if (args.length === 0) {
    return `@bedard/hexchess - major.minor.patch

Commands:
  apply <fen> <moves>     Apply legal moves to a position
  is-checkmate <fen>      Test if the board is in checkmate
  is-stalemate <fen>      Test if the board is in stalemate
  moves <fen> <position>  Get CSV of all legal moves from a position
  parse <fen>             Parse FEN string to JSON
  stringify <json>        Stringify JSON to FEN string

Options:
  -s, --silent          Disable error logging`
  }

  // parse command and parameters
  const [command, ...params] = args

  //
  // apply
  //
  if (command === 'apply') {
    const [fen, moves] = params

    if (typeof fen !== 'string' || typeof moves !== 'string') {
      throw new Error('apply command requires <fen> and <moves> parameter')
    }

    const hexchess = new Hexchess(fen)

    hexchess.apply(moves)

    return hexchess.toString()
  }

  //
  // is-checkmate
  //
  if (command === 'is-checkmate') {
    const [fen] = params

    if (typeof fen !== 'string') {
      throw new Error('is-checkmate command requires <fen> parameter')
    }

    const hexchess = new Hexchess(fen)

    return hexchess.isCheckmate() ? 'true' : 'false'
  }

  //
  // is-stalemate
  //
  if (command === 'is-stalemate') {
    const [fen] = params

    if (typeof fen !== 'string') {
      throw new Error('is-stalemate command requires <fen> parameter')
    }

    const hexchess = new Hexchess(fen)

    return hexchess.isStalemate() ? 'true' : 'false'
  }

  //
  // move
  //
  if (command === 'moves') {
    const [fen, position] = params

    if (typeof fen !== 'string' || typeof position !== 'string') {
      throw new Error('moves command requires <fen> and <position> parameters')
    }

    const hexchess = new Hexchess(fen)

    if (!isPosition(position)) {
      throw new Error('invalid position')
    }

    return hexchess.moves(position).map(stringifyMove).join(',')
  }

  //
  // parse
  //
  if (command === 'parse') {
    const [fen] = params

    if (typeof fen !== 'string') {
      throw new Error('parse command requires <fen> parameter')
    }

    return JSON.stringify(new Hexchess(fen))
  }

  //
  // stringify
  //
  if (command === 'stringify') {
    const [json] = params

    if (typeof json !== 'string') {
      throw new Error('stringify command requires <json> parameter')
    }

    const hexchess = new Hexchess
    const data = JSON.parse(json)
    hexchess.board = data.board
    hexchess.ep = data.ep
    hexchess.turn = data.turn
    hexchess.halfmove = data.halfmove
    hexchess.fullmove = data.fullmove

    return hexchess.toString()
  }

  throw new Error('Unknown command')
}
