#!/usr/bin/env node

require('babel-register');
var fs = require('fs');
var path = require('path');
var cp = require('cp');

var routeArray = require('../src/lib/routing').routeArray;

var util = require("./util");

// get an array of the routes we care about
let siteRoutes = routeArray(util.matasanoContents, util.blogContents);

let dist = path.join(__dirname, '../dist');

let routePath = route => path.join(dist, route);

let topLevelDirs = [
  'matasano',
  'blog',
];

topLevelDirs.forEach(dir => {
  if ( ! fs.existsSync(path.join(dist, dir)) ) {
    fs.mkdirSync(path.join(dist, dir));
  }
});

siteRoutes.forEach(route => {
  let fullPath = routePath(route.replace("/literate-crypto", ""));

  let copyPath = fullPath + "/index.html"
  if ( fs.existsSync(fullPath) && fs.lstatSync(fullPath).isDirectory() ) {
    cp.sync('index-production.html', copyPath);
  } else {
    fs.mkdirSync(fullPath);
    cp.sync('index-production.html', copyPath);
  }
});
