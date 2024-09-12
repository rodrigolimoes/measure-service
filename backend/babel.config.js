const getPath =
	path =>
	([, name]) => {
		return `${path}${name}`;
	};

module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				targets: {
					node: 18
				}
			}
		],
		'@babel/preset-typescript'
	],
	plugins: [
		[
			require.resolve('babel-plugin-module-resolver'),
			{
				root: ['./src'],
				alias: {
					'@': getPath('./'),
					'@src': getPath('./src')
				}
			}
		],
		['@babel/plugin-proposal-decorators', { version: 'legacy' }],
		[
			'@babel/plugin-proposal-class-properties',
			{
				legacy: true
			}
		]
	],
	ignore: ['**/*.spec.ts']
};
