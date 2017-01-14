var path = require('path');
var webpack = require('webpack');

module.exports = {
	devtool: 'cheap-module-source-map',
    entry: [
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.bundle.js',
        publicPath: '/assets/'
    },
    plugins: [
	    new webpack.optimize.OccurenceOrderPlugin(),
	    new webpack.optimize.DedupePlugin(),
	    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js"),
	    new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			minimize: true,
			sourceMap: true,
			compress: {
				drop_console: true
			},
			mangle: {
				except: ['$super', '$', 'exports', 'require', '$q', '$ocLazyLoad']
			}
		})
    ],
    module: {
        preLoaders: [
            { test: /\.json$/, exclude: /node_modules/, loader: 'json' },
        ],
		loaders: [
			{
			  test: /\.js$/,
			  loaders: ['babel'],
			  include: path.join(__dirname, 'src')
			},
			{ test: /\.css$/, loader: "style-loader!css-loader" }
		]
    }
};
