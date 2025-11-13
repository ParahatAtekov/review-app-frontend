// frontend/eslint.config.mjs
import js from '@eslint/js';
import ts from 'typescript-eslint';
import nextPlugin from '@next/eslint-plugin-next';
import tailwind from 'eslint-plugin-tailwindcss';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default ts.config(
  // ── Core ───────────────────────────────────────────────────────
  js.configs.recommended,
  ...ts.configs.recommended,
  nextPlugin.configs['core-web-vitals'],

  // ── React ───────────────────────────────────────────────────────
  {
    plugins: { react, 'react-hooks': reactHooks },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
    settings: { react: { version: 'detect' } },
  },

  // ── Tailwind ───────────────────────────────────────────────────
  ...tailwind.configs['flat/recommended'],

  // ── Prettier (must be **last**) ───────────────────────────────
  prettierConfig, // disables style-rule conflicts
  {
    plugins: { prettier: prettierPlugin },
    rules: { 'prettier/prettier': 'error' },
  },

  // ── TasteQuest Design System ───────────────────────────────────
  {
    rules: {
      // Enforce only our palette
      'no-restricted-syntax': [
        'error',
        {
          selector: `JSXAttribute[name.name=/^(bg|text|border)-/]:not([value.value=/^(primary|secondary|accent|neutral|white|black)$/])`,
          message:
            'Use Tailwind color classes: primary, secondary, accent, neutral, white, black',
        },
      ],

      // Tailwind class ordering
      'tailwindcss/classnames-order': 'warn',

      // General best-practices
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },

  // ── Ignore ─────────────────────────────────────────────────────
  { ignores: ['node_modules/**', '.next/**', 'out/**', '**/*.d.ts'] }
);
