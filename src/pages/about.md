---
key: about
title: about
date: "empty date"
---

# About

I'm Alice - I'm a (mostly) frontend engineer with a wide range of
interests in software things. I like cryptography, functional programming,
fiddling with JS frameworks, Linux, tiling window managers, vim, and other
nerdy stuff 😁.

I built this site to replace a Jekyll blog, because I wanted to build
a React based single-page app (mostly for fun) which would replicate all
of the functionality of Jekyll.

Blog posts and some of the pages are written in Markdown, with a series of
build scripts to turn a directory of Markdown files into JSON, which is
included in the ReactJS app via webpack. I'm using
[react-router-to-array](https://github.com/alansouzati/react-router-to-array)
and node.js to write static files for a sort of pseudo-isomorphic server
side routing. These static files are then deployed to `gh-pages`.

The app itself is ReactJS, redux, react-router, and some functional libs
(like Ramda and Sanctuary). The layout and styling for the site is built
from the ground up with just plain SCSS.

The app is also serving as a kind of monorepo - I have a couple projects
which live in the same repository, and have written build steps to publish
them on the site.

If you'd like to check out the code look
[here](https://github.com/aliceriot/site).
