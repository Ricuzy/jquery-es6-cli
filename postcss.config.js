module.exports = ({ file, options, env }) => ({
	parser: file.extname === '.sss' ? 'sugarss' : false,
	plugins: {
		'postcss-import': {},
		'postcss-cssnext': {
			warnForDuplicates: false,
			browsers: ['last 2 versions', '> 5%']
		},
		cssnano: env === 'production' ? {} : false
	}
});
