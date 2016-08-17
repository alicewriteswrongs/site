// @flow
import React from 'react';
import {
  Router,
  Route,
  browserHistory,
  IndexRoute,
} from 'react-router';
import reactRouterToArray from 'react-router-to-array';
import R from 'ramda';

import App from './components/App';
import {
  MatasanoExercises,
  GenerateMatasanoExercise,
} from './components/Matasano';
import Home from './components/Home';
import { BlogPage, BlogPost } from './components/blog/Blog';

const matasano = require('json!./data/matasano.json');
const blogPosts = require('json!./data/blog.json');

const generateRoute = R.curry((component, [key, object]) => (
  <Route key={key} path={key} component={component(object)} />
));

const mathJax = () => {
  if ( window.MathJax !== undefined ) {
    window.MathJax.Hub.Typeset();
  }
};

const matasanoRoutes = R.map(generateRoute(GenerateMatasanoExercise));

const blogRoutes = R.map(generateRoute(BlogPost));

export function generateRoutes(matasano, blog) {
  return (
    <Router history={browserHistory} onUpdate={mathJax}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="matasano" component={MatasanoExercises}>
          { matasanoRoutes(Object.entries(matasano)) }
        </Route>
        <Route path="blog" component={BlogPage}>
          { blogRoutes(Object.entries(blog)) }
        </Route>
      </Route>
    </Router>
  );
}

export const routes = () => generateRoutes(matasano, blogPosts);

export const routeArray = (matasano: Object, blog: Object) => (
  reactRouterToArray(generateRoutes(matasano, blog))
);
