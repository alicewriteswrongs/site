var path = require('path')
var webpack = require('webpack')

var shared = require(path.resolve('./webpack.config.shared.js'))

module.exports = Object.assign({}, shared, {
  entry: [ 'babel-polyfill', './src/app' ],
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
    new webpack.optimize.DedupePlugin()
  ],
  devtool: 'source-map'
})
