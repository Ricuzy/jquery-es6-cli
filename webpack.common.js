const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production';


const Config = require('./Config');

let HtmlPlugins = [];

let Entries = {};

Config.pages.forEach((page) => {
	const htmlPlugin = new HtmlWebpackPlugin({
		title: `${page}`,   // html文件的title
		filename: `./pages/${page}.html`, // 打包后的html文件
		template: path.resolve(__dirname, `./pages/${page}.html`), //要使用的html模板文件
		chunks: [page],
		inject: true,
		cache: true
	});
	HtmlPlugins.push(htmlPlugin);
	Entries[page] = `./js/${page}/index.js`;
});

module.exports = {
	entry: Entries,
	
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					query: {
						presets: ['env', 'stage-2'],
						plugins: [
							'transform-runtime'
						]
					},
				}
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'sass-loader',
				],
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10000,
							name: devMode ? '../assets/[name].[ext]' : 'assets/[name].[ext]'
						}
					}
				]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "css/[name].css"
		}),
		...HtmlPlugins
	],
}