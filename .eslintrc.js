module.exports = {
  plugins: ['react'],
  parser: 'babel-eslint',
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  env: {
    node: true,
  },
  rules: {
    quotes: ['error', 'single', { avoidEscape: true }],
    'comma-dangle': ['error', 'always-multiline'],
    'no-unused-vars': ['error', { varsIgnorePattern: '^_' }],
  },
  settings: {
    react: {
      version: '16.4.2',
    },
  },
};
