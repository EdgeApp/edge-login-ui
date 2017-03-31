module.exports = {
  entry: {
    abcui: './src/abcui.js'
  },
  output: {
    filename: 'assets/[name].js',
    libraryTarget: 'umd',
    library: '[name]'
  },

  module: {
    loaders: [
      { test: /\.js$/,
        exclude: [/node_modules/, /airbitz-core-js\/dist/],
        loader: 'babel',
        query: { presets: [ 'es2015', 'react' ] }
      },
      { test: /\.jsx$/,
        exclude: [/node_modules/, /airbitz-core-js\/dist/],
        loader: 'babel',
        query: { presets: [ 'es2015', 'react' ] }
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  }
}
