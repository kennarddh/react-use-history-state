module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'airbnb-base',
		'plugin:prettier/recommended',
		'plugin:react/recommended',
	],
	plugins: ['prettier', 'react'],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	settings: {
		'import/extensions': ['.js', '.jsx'],
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx'],
			},
		},
		react: {
			version: 'detect',
		},
	},
	rules: {
		'import/prefer-default-export': 'off',
		'linebreak-style': ['error', 'unix'],
		'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
		quotes: ['error', 'single'],
		semi: ['error', 'never'],
		'react/prop-types': 'off',
		'no-case-declarations': 'off',
		'react/jsx-curly-brace-presence': 'warn',
		'react/jsx-no-useless-fragment': 'warn',
		'import/extensions': [
			'error',
			'ignorePackages',
			{
				js: 'never',
				jsx: 'never',
			},
		],
	},
}
