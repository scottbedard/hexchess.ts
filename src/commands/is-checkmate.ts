import { Hexchess } from '@/hexchess'

export const isCheckmateSummary = 'test if board is in checkmate'

export function isCheckmateCommand(params: string[], help: boolean) {
  if (help) {
    return `@bedard/hexchess - major.minor.patch

Command:
  is-checkmate <fen>  ${isCheckmateSummary}

Parameters:
  <fen>               string representation of game`
  }

  const [fen] = params

  if (typeof fen !== 'string') {
    throw 'missing required <fen> parameter'
  }

  const hexchess = new Hexchess(fen)

  return hexchess.isCheckmate() ? 'true' : 'false'
}
