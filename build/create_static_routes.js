#!/usr/bin/env node

require('babel-register');
var fs = require('fs');
var path = require('path');
var cp = require('cp');

var routeArray = require('../src/routes').routeArray;

// load matasano exercises
let matasanoPath = path.join(__dirname, '../src/data/matasano.json')
let matasanoContents = JSON.parse(fs.readFileSync(matasanoPath));

// get an array of the routes we care about
let matasanoRoutes = routeArray(matasanoContents);

let dist = path.join(__dirname, '../dist');

let routePath = route => path.join(dist, route);

if ( ! fs.existsSync(path.join(dist, 'matasano')) ) {
  fs.mkdirSync(path.join(dist, 'matasano'));
}

matasanoRoutes.forEach(route => {
  let fullPath = routePath(route.replace("/literate-crypto", ""));

  let copyPath = fullPath + "/index.html"
  if ( fs.existsSync(fullPath) && fs.lstatSync(fullPath).isDirectory() ) {
    cp.sync('index-production.html', copyPath);
  } else {
    fs.mkdirSync(fullPath);
    cp.sync('index-production.html', copyPath);
  }
});
