#!/usr/bin/env node

require('babel-register');
var fs = require('fs');
var path = require('path');
var routes = require('../src/routes');
var matasano = JSON.parse(require('../src/data/matasano.json'));

console.log(routes(matasano));
