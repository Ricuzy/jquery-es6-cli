const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const webpack = require('webpack');
const { getIP } = require('./Config/util');
const config = require('./Config/index');

module.exports = merge(common, {
	mode: 'development',
	
	devtool: 'inline-source-map',
	
	output: {
		path: __dirname,
		filename: 'js/[name].js'
	},
	
	devServer: {
		historyApiFallback: true,
		hot: true,
		host: getIP(),
		port: config.port,
		overlay: true,
		compress: true,
		inline: true,
		progress: true,
		clientLogLevel: 'none',
		openPage: 'pages/index.html',
		proxy: config.proxy || {}
	},
	
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin()
	]
});