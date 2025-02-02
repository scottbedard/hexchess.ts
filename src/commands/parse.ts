import { Hexchess } from '@/hexchess'

export const parseSummary = 'parse FEN string to JSON'

export function parseCommand(params: string[], help: boolean) {
  if (help) {
    return `@bedard/hexchess - major.minor.patch

Command:
  parse <fen>   ${parseSummary}

Parameters:
  <fen>         string representation of game`
  }

  const [fen] = params

  if (typeof fen !== 'string') {
    throw 'missing required <fen> parameter'
  }

  return JSON.stringify(new Hexchess(fen))
}
