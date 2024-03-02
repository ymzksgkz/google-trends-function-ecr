module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  plugins: ['prettier', 'unused-imports'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  rules: {
    'arrow-parens': ['error', 'as-needed'],
    'prettier/prettier': 'error',
    'unused-imports/no-unused-imports': 'error'
  }
}
