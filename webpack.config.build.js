var webpack = require('webpack')
var path = require('path')
var fs = require('fs')

var shared = require(path.resolve('./webpack.config.shared.js'))

var nodeModules = {}
fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod
  })

module.exports = Object.assign({}, shared, {
  entry: './build/create_static_routes',
  target: 'node',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'create_static_routes.js'
  },
  externals: nodeModules
})
