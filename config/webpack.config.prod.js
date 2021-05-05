const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const TerserPlugin = require('terser-webpack-plugin');

const webpackConfig = merge(baseConfig, {
	mode: 'production',
	status: {
		children: false,
		warning: false,
	},
	optimization: {
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					warning: true,
					compress: {
						warning: false,
						drop_console: false,
						dead_code: true,
						drop_debugger: true,
					},
					mangle: true,
				},
				parallel: true,
			}),
		],
		splitChunks: {
			cacheGroups: {
				commons: {
					name: 'commons',
					chunks: 'initial',
					minChunks: 3,
					enforce: true,
				},
			},
		},
	},
});

module.exports = webpackConfig;
