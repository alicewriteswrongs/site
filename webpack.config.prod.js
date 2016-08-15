var webpack = require('webpack');
var path = require('path');

var shared = require(path.resolve("./webpack.config.shared.js"));

module.exports = Object.assign({}, shared, {
  entry: ["babel-polyfill", "./src/app" ],
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin(),
  ],
  devtool: 'source-map'
});
