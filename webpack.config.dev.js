var path = require('path')
var webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    bundle: 'index.web',
    abcui: 'abcui',
    devserver: [
      'webpack-dev-server/client?http://localhost:8002', // WebpackDevServer host and port
      'webpack/hot/only-dev-server' // "only" prevents reload on syntax errors
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.scss', '.css', '.js', '.jsx', '.json', '.png', '.jpg'],
    modulesDirectories: [
      'node_modules',
      path.resolve(__dirname, './node_modules'),
      path.resolve('./src')

    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('bundle.css', { allChunks: true }),
    new HtmlWebpackPlugin({
      filename: 'sample-iframe.html',
      template: 'src/sample/sample-iframe.html'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: [/native/, /\.rn\.js$/],
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'src')
      }, {
        test: /(\.scss|\.css)$/,
        loader: ExtractTextPlugin.extract('style!sass!css', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass')
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        include: /src\/img/,
        loaders: [
          'file-loader'
        ]
      }
    ]
  },
  postcss: [autoprefixer],
  sassLoader: {
    data: '@import "theme/_config.scss";',
    includePaths: [path.resolve(__dirname, './src')]
  }
}
