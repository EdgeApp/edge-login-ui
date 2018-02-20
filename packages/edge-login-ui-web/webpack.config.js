const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const production = process.env.NODE_ENV === 'production'

// Only include these plugins in production builds:
const productionPlugins = production
  ? [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
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
  ]
  : []

// Only include these plugins in production builds:
module.exports = {
  devtool: production ? 'cheap-module-source-map' : 'inline-source-map',
  devServer: {
    contentBase: false,
    publicPath: '/',
    port: 8002
  },

  entry: './src/index.js',

  output: {
    path: path.join(__dirname, 'assets'),
    filename: 'app.[name].js',
    publicPath: './'
  },

  resolve: {
    extensions: ['.scss', '.css', '.js', '.jsx', '.json'],
    modules: [
      'node_modules',
      path.resolve(__dirname, './node_modules'),
      path.resolve('./src')
    ]
  },

  plugins: [
    new ExtractTextPlugin('bundle.css', { allChunks: true }),
    ...productionPlugins,
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html'
    })
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.join(__dirname, 'src'),
        use: production
          ? ['babel-loader']
          : ['react-hot-loader', 'babel-loader']
      },
      {
        test: /\.(css|scss)$/,
        include: [path.join(__dirname, 'src'), /node_modules\/react-toolbox\//],
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                localIdentName: '[name]__[local]___[hash:base64:5]',
                modules: true,
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [autoprefixer]
              }
            },
            {
              loader: 'sass-loader',
              options: {
                data: '@import "theme/_config.scss";',
                includePaths: [path.resolve(__dirname, './src')]
              }
            }
          ]
        })
      },
      {
        test: /\.(gif|jpe?g|png|svg)$/i,
        include: path.join(__dirname, 'src'),
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      }
    ]
  }
}
