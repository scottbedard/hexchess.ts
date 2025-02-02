import { Hexchess } from '@/hexchess'

export const stringifySummary = 'stringify JSON to FEN string'

export function stringifyCommand(params: string[], help: boolean) {
  if (help) {
    return `@bedard/hexchess - major.minor.patch

Command:
  stringify <json>  ${stringifySummary}

Parameters:
  <json>  json representation of game`
  }

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
