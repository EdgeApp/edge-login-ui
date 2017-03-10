module.exports = {
  entry: {
    abcui: './src/abcui.js'
  },
  output: {
    filename: 'assets/[name].js',
    libraryTarget: "commonjs",
    library: "[name]"
  },

  module: {
    loaders: [
      { test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: { presets: [ 'es2015', 'react' ] }
      },
      { test: /\.jsx$/,
        exclude: /node_modules/,
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
