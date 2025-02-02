import { Hexchess } from '@/hexchess'
import { isPosition, stringifyMove } from '@/board'

export function movesCommand(params: string[]) {
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
