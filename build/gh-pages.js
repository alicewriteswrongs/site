var ghpages = require('gh-pages')
var path = require('path')

var dist = path.join(__dirname, '../dist')

ghpages.publish(dist, {
  message: 'built website',
  branch: 'master',
  repo: 'git@github.com:aliceriot/aliceriot.github.io.git'
}, e => console.log(e))
