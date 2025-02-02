import { Hexchess } from '@/hexchess'

export function stringifyCommand(params: string[]) {
  const [json] = params

  if (typeof json !== 'string') {
    throw 'missing required <json> parameter'
  }

  const hexchess = new Hexchess
  const data = JSON.parse(json)
  hexchess.board = data.board
  hexchess.ep = data.ep
  hexchess.turn = data.turn
  hexchess.halfmove = data.halfmove
  hexchess.fullmove = data.fullmove

  return hexchess.toString()
}
