import path from 'node:path';

import { includeIgnoreFile } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import comments from '@eslint-community/eslint-plugin-eslint-comments/configs';
import angular from 'angular-eslint';
import configPrettier from 'eslint-config-prettier';
import jest from 'eslint-plugin-jest';
import jsdoc from 'eslint-plugin-jsdoc';
import tailwind from 'eslint-plugin-tailwindcss';
import unicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const compat = new FlatCompat({
	baseDirectory: import.meta.dirname,
	recommendedConfig: eslint.configs.recommended,
});

export default tseslint.config(
	includeIgnoreFile(path.resolve(import.meta.dirname, '.gitignore')),
	{
		files: ['**/*.ts'],
		extends: [
			eslint.configs.recommended,
			...angular.configs.tsAll,
			...tseslint.configs.strictTypeChecked,
			...tseslint.configs.stylisticTypeChecked,
			comments.recommended,
			...compat.extends('plugin:import/recommended'),
			...compat.extends('plugin:import/typescript'),
			jest.configs['flat/recommended'],
			jsdoc.configs['flat/recommended-typescript-error'],
			...tailwind.configs['flat/recommended'],
			unicorn.configs['flat/recommended'],
		],
		languageOptions: {
			parserOptions: {
				projectService: true,
			},
			globals: {
				...globals.node,
			},
		},
		settings: {
			'import/resolver': {
				typescript: {
					alwaysTryTypes: true,
					project: './tsconfig.json',
				},
			},
			tailwindcss: {
				config: 'client/tailwind.config.mjs',
				whitelist: ['fas', 'fa-.*'],
			},
		},
		rules: {
			'@angular-eslint/component-selector': [
				'error',
				{
					type: 'element',
					prefix: 'app',
					style: 'kebab-case',
				},
			],
			'@angular-eslint/directive-selector': [
				'error',
				{
					type: 'attribute',
					prefix: 'app',
					style: 'camelCase',
				},
			],
			'@angular-eslint/pipe-prefix': [
				'error',
				{
					prefixes: ['app'],
				},
			],
			'@typescript-eslint/naming-convention': [
				'error',
				{
					selector: 'default',
					format: ['camelCase'],
					leadingUnderscore: 'forbid',
					trailingUnderscore: 'forbid',
				},
				{
					selector: 'typeLike',
					format: ['PascalCase'],
					leadingUnderscore: 'forbid',
					trailingUnderscore: 'forbid',
				},
				{
					selector: 'enumMember',
					format: ['PascalCase'],
				},
				{
					selector: 'parameter',
					modifiers: ['unused'],
					format: ['camelCase'],
					leadingUnderscore: 'require',
				},
				{
					selector: 'property',
					modifiers: ['readonly', 'static'],
					format: ['UPPER_CASE'],
				},
				{
					selector: 'property',
					modifiers: ['private'],
					format: ['camelCase'],
					leadingUnderscore: 'require',
				},
				{
					selector: 'variable',
					modifiers: ['const', 'exported'],
					format: ['UPPER_CASE'],
				},
				{
					selector: 'variable',
					modifiers: ['const', 'exported'],
					types: ['function'],
					format: ['camelCase'],
				},
			],
			'@typescript-eslint/no-extraneous-class': 'off',
			'import/consistent-type-specifier-style': [
				'error',
				'prefer-inline',
			],
			'import/first': 'error',
			'import/no-duplicates': [
				'error',
				{
					'prefer-inline': true,
				},
			],
			'import/order': [
				'error',
				{
					alphabetize: {
						order: 'asc',
					},
					'newlines-between': 'always',
					pathGroups: [
						{
							pattern: '@app-*/**',
							group: 'external',
							position: 'after',
						},
					],
					pathGroupsExcludedImportTypes: ['builtin'],
				},
			],
			'unicorn/no-array-reduce': 'off',
			'unicorn/no-null': 'off',
			'unicorn/prefer-top-level-await': 'off',
			'unicorn/prevent-abbreviations': 'off',
			curly: 'error',
			eqeqeq: ['error', 'always'],
			'lines-between-class-members': [
				'error',
				'always',
				{
					exceptAfterSingleLine: true,
				},
			],
			'max-classes-per-file': ['error', 1],
			'no-empty': 'error',
			'no-restricted-imports': [
				'error',
				{
					paths: ['rxjs/Rx', 'subsink/dist/subsink'],
					patterns: ['app/*', 'rxjs/internal/*'],
				},
			],
			'sort-imports': [
				'error',
				{
					ignoreDeclarationSort: true,
				},
			],
		},
	},
	{
		files: ['**/*.html'],
		extends: [
			...angular.configs.templateRecommended,
			...angular.configs.templateAccessibility,
			...tailwind.configs['flat/recommended'],
		],
		settings: {
			tailwindcss: {
				config: 'client/tailwind.config.mjs',
				whitelist: ['fas', 'fa-.*'],
			},
		},
	},
	configPrettier,
	{
		ignores: ['**/*.generated.ts', 'eslint.config.mjs'],
	},
);
