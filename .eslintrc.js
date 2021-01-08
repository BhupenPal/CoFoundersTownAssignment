module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
		node: true,
	},
	extends: [
		'plugin:react/recommended',
		'airbnb',
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
	},
	plugins: [
		'react',
	],
	rules: {
		'no-param-reassign': [2, { props: false }],
		'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
		indent: [2, 'tab', { SwitchCase: 1, VariableDeclarator: 1 }],
		'no-tabs': 0,
		'react/prop-types': 0,
		'react/jsx-indent': [2, 'tab'],
		'react/jsx-indent-props': [2, 'tab'],
		'react/jsx-props-no-spreading': 0,
		'no-unused-expressions': 0,
		'react/forbid-prop-types': 0,
		'react/no-unused-prop-types': 0,
	},
};
