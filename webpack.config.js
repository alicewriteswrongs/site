var path = require('path');
var webpack = require('webpack');

var srcPath = path.join(__dirname, 'src');
var isProduction = function () {
  return process.env.NODE_ENV === 'production';
};

function getJSLoaders () {
  return isProduction() ? ['babel-loader'] : ['react-hot', 'babel-loader'];
}

function getPlugins() {
  var plugins = [];

  plugins.push(new webpack.NoErrorsPlugin());
  if (isProduction()) { // prod plugins
    plugins.push(new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    }));
  }
  else {
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }
  return plugins;
}

function entryPoints () {
  if (isProduction()) {
    return { main: [path.join(srcPath, 'app.js')] };
  }
  else {
    return [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      path.join(srcPath, 'app.js')
    ];
  }
}

module.exports = {
  debug: !isProduction(),
  devtool: 'eval',
  entry: entryPoints(),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: getPlugins(),
  module: {
    loaders: [
      {test: /\.jsx$/, exclude: /node_modules/, loaders: getJSLoaders()},
      {test: /\.js$/, exclude: /node_modules/, loaders: getJSLoaders()},
      {test: /\.scss$/, loader: "style!css!sass" },
      {test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$/, loader: "file"}
    ]
  }
};
