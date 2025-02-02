import { Hexchess } from '@/hexchess'

export function parseCommand(params: string[]) {
  const [fen] = params

  if (typeof fen !== 'string') {
    throw 'missing required <fen> parameter'
  }

  return JSON.stringify(new Hexchess(fen))
}
