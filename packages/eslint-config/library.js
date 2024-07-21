module.exports = {
  extends: ['./base'],
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    // Allows for the use of imports
    ecmaFeatures: {
      jsx: false, // No need for JSX in a Discord.js bot
    },
  },
  plugins: ['@typescript-eslint', 'import', 'node', 'promise', 'jsdoc'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:node/recommended',
    'plugin:promise/recommended',
    'plugin:jsdoc/recommended',
  ],
  rules: {
    // Customize your rules here
    'no-unused-vars': 'off', // Handled by TypeScript
    '@typescript-eslint/no-unused-vars': ['error'],
    'import/order': ['error', { 'newlines-between': 'always' }],
    'node/no-unsupported-features/es-syntax': 'off', // Allows for import/export syntax
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Disables the need to define return types
    'jsdoc/check-alignment': 'warn', // Warns for proper alignment in JSDoc
    'jsdoc/check-indentation': 'warn', // Warns for proper indentation in JSDoc
    'jsdoc/newline-after-description': 'warn', // Enforces a newline after description in JSDoc
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true, // Always try to resolve types
        project: './tsconfig.json',
      },
    },
  },
  env: {
    node: true,
    es6: true,
  },
}
