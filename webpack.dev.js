const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const webpack = require('webpack');
const { getIP } = require('./Config/util');

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
		port: 8000,
		overlay: true,
		compress: true,
		inline: true,
		progress: true,
		clientLogLevel: 'none',
		openPage: 'pages/index.html',
		// proxy: {     //如果需要配置代理
		// 	'/wws-c/comment/submit': {
		// 		target: 'http://wws.test.ximalaya.com',
		// 		changeOrigin: true,
		// 		secure: false
		// 	}
		// }
	},
	
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
	]
});