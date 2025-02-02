import { Hexchess } from '@/hexchess'

export const isStalemateSummary = 'test if the board is in stalemate '

export function isStalemateCommand(params: string[], help: boolean) {
  if (help) {
    return `@bedard/hexchess - major.minor.patch

Command:
  is-stalemate <fen>  ${isStalemateSummary}

Parameters:
  <fen>   string representation of game`
  }

  const [fen] = params

  if (typeof fen !== 'string') {
    throw 'missing required <fen> parameter'
  }

  const hexchess = new Hexchess(fen)

  return hexchess.isStalemate() ? 'true' : 'false'
}
