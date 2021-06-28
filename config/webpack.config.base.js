const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const isDev = process.env.NODE_ENV !== 'production';

const webpackConfig = {
	target: 'node',
	entry: {
		server: path.join(__dirname, '../src/index.js')
	},
	output: {
		filename: '[name].bundle.js',
		path: path.join(__dirname, '../dist')
	},
	module: {
		rules: [
			{
				test: /\.js/,
				use: {
					loader: 'babel-loader'
				},
				include: path.join(__dirname, '../src')
			}
		]
	},
	resolve: {
		modules: [path.join(__dirname, 'src/index.js'), 'node_modules'],
		extensions: ['.js', '.json'],
		alias: {
			'@': path.join(__dirname, '../src')
		},
		fallback: {
			console: false,
			global: false,
			process: false,
			__filename: false,
			__dirname: false,
			path: false
		}
	},
	externalsPresets: { node: true },
	externals: [nodeExternals()],
	plugins: [
		// new CleanWebpackPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
			__DEV__: isDev
		})
	]
};

module.exports = webpackConfig;
