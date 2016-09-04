#!/bin/bash

rm -rf dist/*

rake

npm run build

npm run build_routes

cd dist

node ./create_static_routes.js

rm ./create_static_routes.js

cd ..

cp -R ./images dist/

node ./build/rss.js > dist/rss.xml

node ./build/gh-pages.js

rm -rf dist/*
