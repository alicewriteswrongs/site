#!/usr/bin/env node

require('babel-register');
var fs = require('fs');
var path = require('path');
var routes = require('../src/routes');

// get the matasano JSON loaded
var matasano_path = path.join(__dirname, '../src/data/matasano.json')
console.log(JSON.parse(fs.readFileSync(matasano_path)))
