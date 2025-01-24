#!/usr/bin/env node
import cli from './dist/cli.mjs'

const output = cli(process.argv.slice(2))

if (output) {
  console.log(output)
}
