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

fs.mkdir(path.join(dist, 'matasano'));

matasanoRoutes.forEach(route => {
  let fullPath = routePath(route);
  console.log(fullPath);

  if ( fs.existsSync(fullPath) && fs.lstatSync(fullPath).isDirectory() ) {
    console.log(fullPath);
    let copyPath = fullPath + "/index.html"
    cp.sync('index.html', copyPath);
  } else {
    // console.log(fullPath);
    cp.sync('index.html', fullPath);
  }
});
