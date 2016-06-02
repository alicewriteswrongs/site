#!/usr/bin/env node

require('babel-register');
var fs = require('fs');
var path = require('path');
var react = require('react');
var reactDOM = require('react-dom');
var router = require('react-router');

var routes = require('../src/routes').default;

var matasanoPath = path.join(__dirname, '../src/data/matasano.json')
var matasanoContents = JSON.parse(fs.readFileSync(matasanoPath));
var matasanoRoutes = router.createRoutes(routes(matasanoContents));

var routeOutput = reactDOM.render(routes(matasanoContents), react.DOM.div());
// console.log(routeOutput)

