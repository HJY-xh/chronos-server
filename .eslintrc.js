module.exports = {
	env: {
		commonjs: true,
		es2021: true,
		node: true
	},
	plugins: ['prettier'],
	extends: ['eslint:recommended', 'prettier', 'prettier/prettier'],
	parserOptions: {
		ecmaVersion: 12
	},
	rules: {
		// 'prettier/prettier': 'error',
		'comma-dangle': 'off'
	}
};
