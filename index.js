#!/usr/bin/env node
import { Hexchess } from './dist/index.mjs'
import { program } from 'commander'

program
  .name('Hexchess')
  .description('A TypeScript library for Gliński\'s hexagonal chess')

program
  .command('apply <fen> <san>')
  .description('Apply legal moves to a position')
  .action((fen, san) => {
    const hexchess = new Hexchess(fen)
    hexchess.apply(san)
    console.log(hexchess.toString())
  })

program
  .command('is-checkmate <fen>')
  .description('Test if the board is in checkmate')
  .action(fen => {
    const hexchess = new Hexchess(fen)
    console.log(hexchess.isCheckmate())
  })

program
  .command('is-stalemate <fen>')
  .description('Test if the board is in stalemate')
  .action(fen => {
    const hexchess = new Hexchess(fen)
    console.log(hexchess.isStalemate())
  })

program
  .command('parse <fen>')
  .description('Parse FEN string to JSON')
  .action(fen => {
    console.log(JSON.stringify(new Hexchess(fen)))
  })

program
  .command('stringify <json>')
  .description('Stringify JSON to FEN string')
  .action(json => {
    const obj = JSON.parse(json)
    const hexchess = new Hexchess()
    hexchess.board = obj.board
    hexchess.enPassant = obj.enPassant
    hexchess.turn = obj.turn
    hexchess.halfmove = obj.halfmove
    hexchess.fullmove = obj.fullmove
    console.log(hexchess.toString())
  })

program.parse()
