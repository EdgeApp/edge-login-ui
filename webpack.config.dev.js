var path = require('path');
var webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [
		'webpack-dev-server/client?http://localhost:8002', // WebpackDevServer host and port
		'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.bundle.js',
        publicPath: '/assets/'
    },
    resolve: {
        extensions: ['', '.scss', '.css', '.js', '.json'],
        modulesDirectories: [
            'node_modules',
            path.resolve(__dirname, './node_modules')
        ]
    },    
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('bundle.css', { allChunks: true })
    ],
    module: {
        preLoaders: [
            { test: /\.json$/, exclude: /node_modules/, loader: 'json' },
        ],
		loaders: [
			{
			  test: /\.js$/,
			  loaders: ['react-hot', 'babel'],
			  include: path.join(__dirname, 'src')
            }, {
               test: /(\.scss|\.css)$/,
               loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass')
            }
		]
    },
    postcss: [autoprefixer],
    sassLoader: {
      data: '@import "theme/_config.scss";',
      includePaths: [path.resolve(__dirname, './src')]
    },    
};
