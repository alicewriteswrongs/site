// @flow
import React from 'react';
import {
  Router,
  browserHistory,
} from 'react-router';
import { matasano, blogPosts } from './data';
import { generateRoutes } from './lib/routing';

const mathJax = () => {
  if ( window.MathJax !== undefined ) {
    window.MathJax.Hub.Typeset();
  }
};

export const routes = () => (
  <Router history={browserHistory} onUpdate={mathJax}>
    { generateRoutes(matasano, blogPosts) }
  </Router>
);
