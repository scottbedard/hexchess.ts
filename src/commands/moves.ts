import { Hexchess } from '@/hexchess'
import { isPosition, stringifyMove } from '@/board'

export const movesSummary = 'get CSV of all legal moves from a position'

export function movesCommand(params: string[], help: boolean) {
  if (help) {
    return `@bedard/hexchess - major.minor.patch

Command:
  moves <fen> <position>  ${movesSummary}

Parameters:
  <fen>       string representation of game
  <position>  board coordinate`
  }

  const [fen, position] = params

  if (typeof fen !== 'string' || typeof position !== 'string') {
    throw 'missing required <fen> or <position> parameters'
  }

  const hexchess = new Hexchess(fen)

  if (!isPosition(position)) {
    throw 'invalid position'
  }

  return hexchess.moves(position).map(stringifyMove).join(',')
}
