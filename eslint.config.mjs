import js from '@eslint/js';
import react from 'eslint-plugin-react';

export default [
  js.configs.recommended,
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    plugins: {
      react,
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
          tsx: true,
          ts: true
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/jsx-no-useless-fragment': ['warn', { allowExpressions: false }],
      'react/no-children-prop': 'warn',
      'react/jsx-no-undef': 'error',
      'react/no-unstable-nested-components': 'warn',
      'react/no-invalid-html-attribute': 'warn',
    },
  },
];
