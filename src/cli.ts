import { applyCommand, applySummary } from './commands/apply'
import { currentMovesCommand, currentMovesSummary } from './commands/current-moves'
import { isCheckmateCommand, isCheckmateSummary } from './commands/is-checkmate'
import { isStalemateCommand, isStalemateSummary } from './commands/is-stalemate'
import { movesCommand, movesSummary } from './commands/moves'
import { parseCommand, parseSummary } from './commands/parse'
import { stringifyCommand, stringifySummary } from './commands/stringify'

export default function run(args: string[]): string | undefined {
  const help = args.includes('-h') || args.includes('--help')

  if (args.length === 0 || (args.length === 1 && help)) {
    return `@bedard/hexchess - major.minor.patch

Commands:
  apply <fen> <moves>     ${applySummary}
  current-moves <fen>     ${currentMovesSummary}
  is-checkmate <fen>      ${isCheckmateSummary}
  is-stalemate <fen>      ${isStalemateSummary}
  moves <fen> <position>  ${movesSummary}
  parse <fen>             ${parseSummary}
  stringify <json>        ${stringifySummary}

Options:
  -h, --help              display help for command
  -s, --silent            silence error messages`
  }

  // parse command and parameters
  const [command, ...params] = args

  switch (command) {
    case 'apply': return applyCommand(params, help)
    case 'current-moves': return currentMovesCommand(params, help)
    case 'is-checkmate': return isCheckmateCommand(params, help)
    case 'is-stalemate': return isStalemateCommand(params, help)
    case 'moves': return movesCommand(params, help)
    case 'parse': return parseCommand(params, help)
    case 'stringify': return stringifyCommand(params, help)
  }

  throw 'unknown command'
}
