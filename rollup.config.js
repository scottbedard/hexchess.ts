import { defineConfig } from 'rollup'
import { minify } from 'rollup-plugin-esbuild-minify'
import pkg from './package.json' with { type: 'json' }
import typescript from '@rollup/plugin-typescript'

export default defineConfig({
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'es',
    },
    {
      file: pkg.unpkg,
      format: 'iife',
      name: 'Hexchess',
      plugins: [
        minify(),
      ],
      sourcemap: true,
    },
  ],
  plugins: [
    typescript(),
  ],
})
