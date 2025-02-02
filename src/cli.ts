import { applyCommand } from './commands/apply'
import { error } from './utils'
import { isCheckmateCommand } from './commands/is-checkmate'
import { isStalemateCommand } from './commands/is-stalemate'
import { movesCommand } from './commands/moves'
import { parseCommand } from './commands/parse'
import { stringifyCommand } from './commands/stringify'

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
  -h, --help              Display help for command
  -s, --silent            Silence error logging`
  }

  // parse command and parameters
  const [command, ...params] = args

  switch (command) {
    case 'apply': return applyCommand(params)
    case 'is-checkmate': return isCheckmateCommand(params)
    case 'is-stalemate': return isStalemateCommand(params)
    case 'moves': return movesCommand(params)
    case 'parse': return parseCommand(params)
    case 'stringify': return stringifyCommand(params)
  }

  error('Unknown command')
}
