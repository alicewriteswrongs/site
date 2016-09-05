# Website

[![Build
Status](https://travis-ci.org/aliceriot/literate-crypto.svg?branch=master)](https://travis-ci.org/aliceriot/literate-crypto)

This is my personal website. It's hosted
[here](https://aliceriot.github.io/).

It's a static site built with React, Redux, React-Router, and a bunch of
node scripts to build + deploy things.


There's a Rakefile to automate building markdown files from the Go source
(you need to already have
[mark_set_go](https://github.com/aliceriot/mark_set_go) installed). It
takes the formatted Markdown, renders it to HTML, and then saves it all to
JSON (for easy use in JS).

I started the site to document my progress in learning Go by doing the
Matasano crypto problemset, and ended up moving over my blog and a couple
of other things.

## Building and deploying

### Development

To develop the site do:

```
docker-compose up
```

in the project directory. This starts the webpack hot-reload dev server in
a docker container. There are also some dev-related scripts in
`package.json`:

```sh
npm run test    # run the tests
npm run lint    # run the linter
```

### Building

To build Markdown files from the Golang source code and build JSON from
all the Markdown do:

```
rake
```

This will write markdown files in `matasano` and will write JSON in
`src/data/`. For various pages the rendered (and highlighted) Markdown is
pulled out of those JSON files.

### Deploying

To deploy the website do:

```
npm run publish
```

This builds the JavaScript bundles for the site (`bundle.js`) and the
static routing script (`create_static_routes.js`). Then it runs the static
routing script, copies in the images, deploys to
[](https://github.com/aliceriot/aliceriot.github.io) using
[gh-pages](https://github.com/tschaub/gh-pages), and then cleans out the
build directory.
