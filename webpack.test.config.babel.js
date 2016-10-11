import glob from 'glob';

export default {
  target: 'node',
  entry: {
    index: glob.sync('./src/**/*.spec.js')
  },
  output: {
    path: './target/test',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel'}
    ]
  }
};
