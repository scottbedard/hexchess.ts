import { Hexchess } from '@/hexchess'

export const applySummary = 'apply whitespace separated moves to a position'

export function applyCommand(params: string[], help: boolean): string | undefined {
  if (help) {
    return `@bedard/hexchess - major.minor.patch

Command:
  apply <fen> <moves>   ${applySummary}

Parameters:
  <fen>                 string representation of game
  <moves>               whitespace separated list of moves`
  }

  const [fen, moves] = params

  if (typeof fen !== 'string' || typeof moves !== 'string') {
    throw 'missing required <fen> or <moves> parameter'
  }

  const hexchess = new Hexchess(fen)

  hexchess.apply(moves)

  return hexchess.toString()
}
