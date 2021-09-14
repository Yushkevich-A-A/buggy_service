const standardRestrictedGlobals = require('eslint-restricted-globals');

const noRestrictedGlobals = ['error', 'isNaN', 'isFinite'].concat(standardRestrictedGlobals);
const noRestrictedGlobalsWorker = noRestrictedGlobals.filter((o) => o !== 'self');

module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    worker: true,
    serviceworker: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-restricted-syntax': [
      'error',
      'LabeledStatement',
      'WithStatement',
    ],
    'no-restricted-globals': noRestrictedGlobals,
    'no-unused-vars': 'off',
    'no-console': 'off',
    'no-plusplus': 'off',
    'no-new': 'off',
    'import/no-extraneous-dependencies': 'off',
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    'no-undef': 'off',
    'no-param-reassign': 'off',
  },
  overrides: [
    {
      files: ['*.worker.js'],
      rules: {
        'no-restricted-globals': noRestrictedGlobalsWorker,
      },
    },
  ],
};
