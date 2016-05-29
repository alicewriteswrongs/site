#!/usr/bin/env node

require('babel-register');
var fs = require('fs');
var path = require('path');
var routes = require('../src/routes');

console.log(routes());
