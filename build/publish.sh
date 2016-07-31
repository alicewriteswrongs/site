#!/bin/bash

npm run build

node ./build/create_static_routes.js

node ./build/gh-pages.js

rm -rf dist/*
