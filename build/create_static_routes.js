#!/usr/bin/env node

require('babel-register');
var fs = require('fs');
var path = require('path');
var routes = require('../src/routes').default;

// get the matasano JSON loaded
var matasanoPath = path.join(__dirname, '../src/data/matasano.json')

var matasanoContents = JSON.parse(fs.readFileSync(matasanoPath));

console.log(routes(matasanoContents));

