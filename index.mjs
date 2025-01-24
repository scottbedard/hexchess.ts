#!/usr/bin/env node
import cli from './dist/cli.mjs'

let output = ''

try {
  output = cli(process.argv.slice(2))
} catch (err) {
  if (!process.argv.includes('--silent') && !process.argv.includes('-s')) {
    console.error(err)
  }

  process.exit(1)
}

console.log(output)
