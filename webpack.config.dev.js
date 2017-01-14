var path = require('path');
var webpack = require('webpack');

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
    plugins: [
        new webpack.HotModuleReplacementPlugin()
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
			},
			{ test: /\.css$/, loader: "style-loader!css-loader" }
		]
    }
};
