module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ['airbnb-base', 'plugin:@next/next/recommended', 'prettier'],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'unused-imports'],
  ignorePatterns: ['baseType.ts'],
  rules: {
    'no-unused-vars': [
      'error',
      { vars: 'all', args: 'none', ignoreRestSiblings: false },
    ],
    'unused-imports/no-unused-imports-ts': ['error'],
    'react/no-unknown-property': ['warn', { ignore: ['css'] }],
    '@typescript-eslint/no-inferrable-types': 'warn',
    'no-useless-escape': 'warn',
    'arrow-body-style': 'off',
    'import/extensions': 'off',
    'no-extra-boolean-cast': 'off',
    'no-empty': 'warn',
    'no-restricted-globals': 'off',
    'no-alert': 'off',
    'no-unneeded-ternary': 'off',
    'consistent-return': 'off',
    'no-plusplus': 'off',
    'no-nested-ternary': 'warn',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
