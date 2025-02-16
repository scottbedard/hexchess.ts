import { stringifyMove } from '@/board'
import { Hexchess } from '@/hexchess'

export const currentMovesSummary = 'get CSV of all current legal moves'

export function currentMovesCommand(params: string[], help: boolean): string | undefined {
  if (help) {
    return `@bedard/hexchess - major.minor.patch

Command:
  current-moves <fen>   ${currentMovesSummary}

Parameters:
  <fen>                 string representation of game`
  }

  const [fen] = params

  if (typeof fen !== 'string') {
    throw 'missing required <fen> parameter'
  }

  return Hexchess
    .from(fen)
    .currentMoves()
    .map(stringifyMove)
    .join(',')
}
