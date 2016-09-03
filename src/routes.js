// @flow
import React from 'react';
import {
  Router,
  browserHistory,
} from 'react-router';
import { matasano, blogPosts } from './data';
import { generateRoutes } from './lib/routing';

import reactRouterToArray from 'react-router-to-array';

const mathJax = () => {
  if ( window.MathJax !== undefined ) {
    window.MathJax.Hub.Typeset();
  }
};

export const routes = () => {
  let router = <Router history={browserHistory} onUpdate={mathJax}>
    { generateRoutes(matasano, blogPosts) }
  </Router>

  console.log(reactRouterToArray(router));
  return router;
};
