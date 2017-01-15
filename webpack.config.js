var path = require('path');
var webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
	devtool: 'cheap-module-source-map',
    entry: [
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.bundle.js',
        publicPath: '/'
    },
    resolve: {
     extensions: ['', '.scss', '.css', '.js', '.json'],
      modulesDirectories: [
       'node_modules',
        path.resolve(__dirname, './node_modules')
      ]
    },

    postcss: [autoprefixer],
    sassLoader: {
      data: '@import "theme/_config.scss";',
      includePaths: [path.resolve(__dirname, './src')]
    },    
    plugins: [
      new ExtractTextPlugin('bundle.css', { allChunks: true }),
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
      { test: /\.json$/, loader: "json-loader" },
			{
			  test: /\.js$/,
        exclude: [/native/,/\.rn\.js$/],
			  loaders: ['babel'],
			  include: path.join(__dirname, 'src')
      }, {
        test: /(\.scss|\.css)$/,
        include: /node_modules\/react-toolbox\//,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass')
      }      
		]
    }
};
