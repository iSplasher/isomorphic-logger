export default [
  {
    target: 'node',
    entry: './src/main/index.js',
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
