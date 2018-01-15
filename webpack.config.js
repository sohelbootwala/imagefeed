var webpack = require('webpack')
var path = require('path')

module.exports = {
	entry: {
		app: './src/app.js'
	},
	output: {
		filename: 'build/bundle.js',
		sourceNapFilename: 'build/bundle.map'
	},
	devtool: '#source-map',
	module: {
		loaders: [
				{
					loaders: 'babel',
					exclude: /(node_modules)/,
					query: {
						presets: ['react', 'es2015']
					}
				}
			]
	}
}