var path = require('path');

var shared = require(path.resolve("./webpack.config.shared.js"));

module.exports = Object.assign({}, shared, {
  entry: [ "./src/app" ],
});
