var webpack = require('webpack');

module.exports = [
  {
    target: 'node',
    devtool: 'source-map',
    entry: './src/main/Logger.js',
    output: {
      path: '.',
      filename: 'index.js',
      libraryTarget: 'commonjs2'
    },
    module: {
      loaders: [
        {test: /\.js$/, loader: 'babel', exclude: /node_modules/},
      ]
    }
  }
];
