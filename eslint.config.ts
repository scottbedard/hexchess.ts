import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin-ts'

export default tseslint.config(
  {
    ignores: [
      'dist',
    ],
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    plugins: {
      '@stylistic/ts': stylistic
    },
    rules: {
      '@stylistic/ts/indent': ['error', 2],
      'no-sparse-arrays': 'off',
    }
  },
)
