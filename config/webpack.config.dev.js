const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

const webpackConfig = merge(baseConfig, {
	mode: 'development',
	devtool: 'eval-source-map',
	stats: {
		children: false,
		module: false,
	},
});

module.exports = webpackConfig;
