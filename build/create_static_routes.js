var fs = require('fs');
var path = require('path');
var cp = require('cp');

const routing  = require('../src/lib/routing');

let dist = path.join(__dirname, '../dist');

let routePath = route => path.join(".", route);

let topLevelDirs = [
  'matasano',
  'blog',
];

topLevelDirs.forEach(dir => {
  if ( ! fs.existsSync(path.join(__dirname, dir)) ) {
    fs.mkdirSync(path.join(".", dir));
  }
});

routing.routeArray().forEach(route => {
  let fullPath = routePath(route);
  let copyPath = fullPath + "/index.html"
  if ( fs.existsSync(fullPath) && fs.lstatSync(fullPath).isDirectory() ) {
    cp.sync('../index-production.html', copyPath);
  } else {
    fs.mkdirSync(fullPath);
    cp.sync('../index-production.html', copyPath);
  }
});
