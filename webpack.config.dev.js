var webpack = require('webpack');
var path = require('path');

var shared = require(path.resolve("./webpack.config.shared.js"));

module.exports = Object.assign({}, shared, {
  context: __dirname,
   entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/app'
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.definePlugin({
      'process.env': {
        'NODE_ENV': '"development"'
      }
    })
  ],
  devtool: 'source-map',
});
