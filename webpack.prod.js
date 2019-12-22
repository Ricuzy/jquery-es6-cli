process.env.NODE_ENV = 'production';
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const { getIP } = require('./config/util');
const copyWebpackPlugin = require('copy-webpack-plugin');

let publicPath, projectName;

projectPath = process.cwd().split('/');

projectName = projectPath[projectPath.length - 1];

if (process.argv.join().indexOf('--prod') !== -1)  {
	publicPath = `//s1.xmcdn.com/lib/${projectName}/last/dist/`;
}else {
	publicPath = `//static2.pp.ximalaya.com/lib/${projectName}/last/dist/`;
}

module.exports = merge(common, {
	mode: 'production',
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: publicPath,
		filename: 'js/[name].[hash:6].js'
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
        new copyWebpackPlugin([
            {
                from: 'assets/*',
                to: './'
            },
            {
                from: 'vendor/*',
                to: './'
            }
        ]),
	]
});