require('babel-register')

var fs = require('fs')
var path = require('path')

// load matasano exercises
const matasanoPath = path.join(__dirname, '../src/data/matasano.json')
const matasanoContents = JSON.parse(fs.readFileSync(matasanoPath))

// load blog posts
const blogPath = path.join(__dirname, '../src/data/blog.json')
const blogContents = JSON.parse(fs.readFileSync(blogPath))

const dist = path.join(__dirname, '../dist')

module.exports = {
  dist: dist,
  matasanoContents: matasanoContents,
  blogContents: blogContents
}
