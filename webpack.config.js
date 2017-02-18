const path              = require('path')
const webpack           = require('webpack')
const autoprefixer      = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: {
    abcuiloader: './src/index.web.jsx',
    abcui: './src/abcui.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.[name].js',
    publicPath: path.join(__dirname, 'dist'),
    libraryTarget: "var",
    library: "[name]"
  },
  resolve: {
    extensions: ['', '.scss', '.css', '.js', '.jsx', '.json'],
    modulesDirectories: [
      'node_modules',
      path.resolve(__dirname, './node_modules'),
      path.resolve('./src')
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
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */'vendor', /* filename= */'vendor.bundle.js'),
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
    }),
    new HtmlWebpackPlugin({
      filename: 'sample-iframe.html',
      template: 'src/sample/sample-iframe.html'
    })
  ],
  module: {
    preLoaders: [
    ],
    loaders: [
      { test: /\.json$/, loader: 'json-loader' },
      {
        test: /\.jsx?$/,
        exclude: [/native/, /\.rn\.js$/],
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
      }, {
        test: /(\.scss|\.css)$/,
        include: [/node_modules\/react-toolbox\//, /src\//],
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass')
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        include: /src\/img/,
        loader: 'file-loader'
      }

    ]
  }
}

// #<{(|eslint-disable no-var |)}>#
//
// var fs = require('fs');
// var path = require('path');
// var webpack = require('webpack');
//
// module.exports = {
//   entry: {
//     abcui: './src/abcui.js'
//   },
//   output: {
//     filename: 'assets/js/[name].js',
//     // Export the library as a global var:
//     libraryTarget: "var",
//     // Name of the global var:
//     library: "[name]"
//   },
//
//   module: {
//     loaders: [
//       { test: /\.js$/,
//         exclude: /node_modules/,
//         loader: 'babel',
//         query: { presets: [ 'es2015', 'react' ] }
//       },
//       { test: /\.jsx$/,
//         exclude: /node_modules/,
//         loader: 'babel',
//         query: { presets: [ 'es2015', 'react' ] }
//       },
//       {
//         test: /\.json$/,
//         loader: 'json'
//       }
//     ]
//   },
// }
