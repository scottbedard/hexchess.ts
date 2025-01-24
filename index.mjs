#!/usr/bin/env node
import cli from './dist/cli.mjs'

console.log(cli(process.argv.slice(2)))
