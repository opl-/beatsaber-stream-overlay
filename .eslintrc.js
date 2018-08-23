// http://eslint.org/docs/user-guide/configuring
const path = require('path');

module.exports = {
	root: true,
	parser: 'babel-eslint',
	parserOptions: {
		sourceType: 'module',
	},
	env: {
		browser: true,
	},
	extends: 'airbnb-base',
	// required to lint *.vue files
	plugins: [
		'html',
	],
	// check if imports actually resolve
	settings: {
		'import/resolver': {
			webpack: {
				config: path.resolve(__dirname, 'build/webpack.base.conf.js'),
			},
		},
	},
	rules: {
		// don't require .vue extension when importing
		'import/extensions': ['error', 'always', {
			js: 'never',
			vue: 'never',
		}],
		// custom properties because airbnb is not perfect
		'space-before-function-paren': ['error', {
			anonymous: 'never',
			named: 'never',
			asyncArrow: 'always',
		}],
		'no-plusplus': 'off',
		'no-nested-ternary': 'off',
		indent: ['error', 'tab'],
		'object-curly-spacing': ['error', 'never'],
		'no-tabs': 'off',
		'no-console': 'off',
		'no-shadow': ['error', {
			builtinGlobals: true,
			allow: ['err'],
		}],
		'consistent-return': 'off',
		'class-methods-use-this': 'off',
		'max-len': ['error', 200, 4, {
			ignoreUrls: true,
			ignoreComments: false,
			ignoreRegExpLiterals: true,
			ignoreStrings: true,
			ignoreTemplateLiterals: true,
		}],
		'no-param-reassign': 'off',
		'no-throw-literal': 'off',
		// allow debugger during development
		'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
	},
};
