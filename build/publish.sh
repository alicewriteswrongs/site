#!/bin/bash

npm run build

node ./create_static_routes.js

node ./gh-pages.js
