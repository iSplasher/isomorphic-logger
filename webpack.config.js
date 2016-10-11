var webpack = require('webpack');

module.exports = [
  {
    target: 'node',
    entry: './src/main/server.js',
    output: {
      path: '.',
      filename: 'server.js',
      libraryTarget: 'commonjs2'
    },
    node: {
      __dirname: false
    },
    module: {
      loaders: [
        {test: /\.js$/, loader: 'babel', exclude: /node_modules/},
      ]
    }
  },
  {
    target: 'web',
    entry: './src/main/client.js',
    output: {
      path: '.',
      filename: 'client.js',
      libraryTarget: 'commonjs2'
    },
    module: {
      loaders: [
        {test: /\.js$/, loader: 'babel', exclude: /node_modules/},
      ]
    }
  }
];
