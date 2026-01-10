import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';
import pluginReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import { configs as tseslintConfigs } from 'typescript-eslint';

export default defineConfig([
    { ignores: ['dist', 'server/'] },

    // Recommended React rules
    pluginReact.configs.flat.recommended,
    pluginReact.configs.flat['jsx-runtime'],

    {
        extends: [
            js.configs.recommended,
            importPlugin.flatConfigs.recommended,
            importPlugin.flatConfigs.typescript,
            ...tseslintConfigs.recommended,
        ],
        files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        settings: {
            react: {
                version: 'detect',
            },
            'import/resolver': {
                typescript: {
                    project: ['./tsconfig.json', './tsconfig.app.json', './tsconfig.node.json'],
                    alwaysTryTypes: true,
                },
                node: true, // this loads <rootdir>/node_modules to resolve modules
            },
        },
        plugins: {
            js,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            react: pluginReact,
            'no-relative-import-paths': noRelativeImportPaths,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,

            '@typescript-eslint/no-empty-object-type': 'off',
            '@typescript-eslint/no-unused-vars': [
                'error',
                { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
            ],
            'no-console': ['warn', { allow: ['warn', 'error'] }],

            camelcase: 'error',
            'no-param-reassign': 'error',

            'react/self-closing-comp': 'error',
            'react/jsx-no-useless-fragment': 'error',
            'react/prop-types': 'off',

            'import/order': [
                'error',
                {
                    groups: [
                        'builtin',
                        'external',
                        'internal',
                        'parent',
                        'sibling',
                        'index',
                        'object',
                        'type',
                    ],
                    pathGroups: [
                        {
                            pattern: '@(react|react-native)',
                            group: 'external',
                            position: 'before',
                        },
                        {
                            pattern: 'components/**',
                            group: 'internal',
                        },
                        {
                            pattern: 'features/**',
                            group: 'internal',
                        },
                        {
                            pattern: 'infrastructure/**',
                            group: 'internal',
                        },
                    ],
                    pathGroupsExcludedImportTypes: ['react'],
                    'newlines-between': 'always',
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true,
                    },
                },
            ],

            'no-relative-import-paths/no-relative-import-paths': [
                'error',
                {
                    allowSameFolder: true,
                    rootDir: 'src',
                    prefix: '@src',
                },
            ],
        },
    },

    eslintConfigPrettier,
]);
