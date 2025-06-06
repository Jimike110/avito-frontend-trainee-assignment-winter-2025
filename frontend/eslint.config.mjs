import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

// Remove whitespace from global keys
const cleanGlobals = (obj) =>
  Object.fromEntries(Object.entries(obj).map(([k, v]) => [k.trim(), v]));

export default [
  {
    ignores: ['dist', 'node_modules'],
  },
  js.configs.recommended,
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
      },
      globals: {
        ...cleanGlobals(globals.browser),
        ...cleanGlobals(globals.node),
      },
    },
  },
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
    },
  },
];
