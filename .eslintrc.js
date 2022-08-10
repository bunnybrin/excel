module.exports = {
	parser: '@babel/eslint-parser',
	parserOptions: {
		babelOptions: {
			configFile: './babel.config.json',
		},
	},

	env: {
		browser: true,
		node: true,
		es6: true,
	},
	extends: ['eslint:recommended', 'google'],
	rules: {
		'semi': 'off',
		'object-curly-spacing': ['error', 'always'],
		'require-jsdoc': 'off',
		'arrow-parens': 'off',
		'no-trailing-spaces': 'off',
		'no-tabs': 'off',
		'linebreak-style': 'off',
		'indent': 'off',
		'space-before-function-paren': [
			'error', {
				'anonymous': 'always',
				'named': 'always',
				'asyncArrow': 'always',
			}],
		'max-len': [
			'error', {
				'code': 120,
			}],
	},
};
