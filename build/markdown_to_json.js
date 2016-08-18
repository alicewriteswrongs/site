#!/usr/bin/env node

var fs = require('fs');
var fm = require('front-matter');
var Remarkable = require('remarkable');
var hljs = require('highlight.js');
var path = require('path');

function highlight (str, lang) {
  if ((lang !== null) && hljs.getLanguage(lang)) {
    try {
      return hljs.highlight(lang, str).value
    } catch (_error) {
      console.error(_error)
    }
  }
  try {
    return hljs.highlightAuto(str).value
  } catch (_error) {
    console.error(_error)
  }
  return ''
}

var md = new Remarkable({
  highlight: highlight,
  linkify:   true,
});

if ( process.argv.length === 2 ) {
  console.log("not enough arguments, give me a path to read from, a path to write to, and a filename to write.");
  exit(1);
} else {
  var markdownCollection = {};
  var dir = path.resolve(process.argv[2]);
  if ( ! fs.existsSync(dir) ) {
    exit(1);
  }
  fs.readdirSync(process.argv[2]).forEach(file => {
    var filePath = path.join(dir, file);
    var fileContents = String(fs.readFileSync(filePath));
    var contents = fm(fileContents);

    markdownCollection[contents.attributes.key] = {
      title: contents.attributes.title,
      body: md.render(contents.body),
      date: contents.attributes.date,
    };
  });

  fs.writeFileSync(path.resolve(process.argv[3]), JSON.stringify(markdownCollection));
}

