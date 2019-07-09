const path = require('path')

module.exports = {
  entry: './src/jamo.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules|dist/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'jamo.js',
    library: 'jamo',
    libraryExport: 'default',
    libraryTarget: 'umd'
  }
}
