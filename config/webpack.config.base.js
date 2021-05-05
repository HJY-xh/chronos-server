const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-nodeExternals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const webpackConfig = {
	target: 'node',
	entry: {
		server: path.join(__dirname, '../src/index.js'),
	},
	output: {
		filename: '[name].bundle.js',
		path: path.join(__dirname, '../dist'),
	},
	module: {
		rules: [
			{
				test: /\.js/,
				use: {
					loader: 'babel-loader',
				},
				include: path.join(__dirname, '../src'),
			},
		],
	},
	resolve: {
		modules: [path.join(__dirname, 'src/index.js'), 'node_modules'],
		extensions: ['.js', '.json'],
		alis: {
			'@': path.join(__dirname, '../src'),
		},
		fallback: {
			console: true,
			global: true,
			process: true,
			__filename: true,
			__dirname: true,
			path: true,
		},
	},
	externals: [nodeExternals()],
	plugins: [
		new CleanWebpackPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV':
				process.env.NODE_ENV === 'production'
					? JSON.stringify('production')
					: JSON.stringify('development'),
		}),
	],
};

module.exports = webpackConfig;
