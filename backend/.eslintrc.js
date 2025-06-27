module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['plugin:@typescript-eslint/recommended'],
  env: {
    node: true,
    es2021: true,
  },
  rules: {
    'indent': ['error', 2],
  },
  settings: {
    react: {
      version: 'detect',
    }
  },
};
