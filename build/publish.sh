#!/bin/bash

rm -rf dist/*

rake

npm run build

node ./build/create_static_routes.js

cp -R ./images dist/

node ./build/rss.js > dist/feed.xml

node ./build/gh-pages.js

rm -rf dist/*
