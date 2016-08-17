#!/usr/bin/env node

require('babel-register');
var fs = require('fs');
var path = require('path');
var cp = require('cp');

var routeArray = require('../src/routes').routeArray;

// load matasano exercises
let matasanoPath = path.join(__dirname, '../src/data/matasano.json')
let matasanoContents = JSON.parse(fs.readFileSync(matasanoPath));

// load blog posts
let blogPath = path.join(__dirname, '../src/data/blog.json')
let blogContents = JSON.parse(fs.readFileSync(blogPath));

// get an array of the routes we care about
let siteRoutes = routeArray(matasanoContents, blogContents);

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
