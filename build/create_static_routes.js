#!/usr/bin/env node

require('babel-register');
var fs = require('fs');
var path = require('path');
var cp = require('cp');

var routeArray = require('../src/routes').routeArray;

// load matasano exercises
var matasanoPath = path.join(__dirname, '../src/data/matasano.json')
var matasanoContents = JSON.parse(fs.readFileSync(matasanoPath));

// get an array of the routes we care about
var matasanoRoutes = routeArray(matasanoContents);

let routePath = route => (
  path.join(__dirname, '../dist', route)
);

matasanoRoutes.forEach(route => {
  cp.sync('index.html', routePath(route));
});
