import { Hexchess } from '@/hexchess'

export function applyCommand(params: string[]): string | undefined {
  const [fen, moves] = params

  if (typeof fen !== 'string' || typeof moves !== 'string') {
    throw 'missing required <fen> or <moves> parameter'
  }

  const hexchess = new Hexchess(fen)

  hexchess.apply(moves)

  return hexchess.toString()
}
