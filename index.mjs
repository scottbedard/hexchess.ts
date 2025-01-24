#!/usr/bin/env node
import { run } from './dist/cli.mjs'

const output = run(process.argv.slice(2))

if (output) {
  console.log(output)
}
