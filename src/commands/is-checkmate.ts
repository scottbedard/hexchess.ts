import { Hexchess } from '@/hexchess'

export function isCheckmateCommand(params: string[]) {
  const [fen] = params

  if (typeof fen !== 'string') {
    throw 'missing required <fen> parameter'
  }

  const hexchess = new Hexchess(fen)

  return hexchess.isCheckmate() ? 'true' : 'false'
}
