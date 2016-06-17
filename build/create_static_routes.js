#!/usr/bin/env node

require('babel-register');
var fs = require('fs');
var path = require('path');
var react = require('react');
var reactDOM = require('react-dom');
var router = require('react-router');

var routeArray = require('../src/routes').routeArray;

var matasanoPath = path.join(__dirname, '../src/data/matasano.json')
var matasanoContents = JSON.parse(fs.readFileSync(matasanoPath));
var matasanoRoutes = routeArray(matasanoContents);

console.log(matasanoRoutes);
