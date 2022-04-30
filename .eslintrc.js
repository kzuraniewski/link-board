module.exports = {
	plugins: ['prettier', 'react', '@typescript-eslint'],
	extends: [
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier/@typescript-eslint',
	],
	rules: {
		'prettier/prettier': 'error',
		'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.tsx'] }],
	},
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
				paths: ['src'],
			},
		},
	},
};
