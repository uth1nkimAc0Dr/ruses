/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
    'plugin:prettier/recommended', //v1
    'prettier', //v1
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    curly: ['error', 'all'],
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true,
        semi: true,
        endOfLine: 'auto',
      },
    ],
  },
};
