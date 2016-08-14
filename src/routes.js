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
import MatasanoExercises from './components/MatasanoExercises';
import MatasanoExercise from './components/MatasanoExercise';
import Home from './components/Home';

const matasanoExercises = R.map(key => (
  <Route key={key} path={key} component={MatasanoExercise} />
));

export function routes(matasano: Object) {
  return (
    <Router history={browserHistory}>
      { subRoutes(matasano) }
    </Router>
  );
}

function subRoutes(matasano: Object) {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="matasano" component={MatasanoExercises}>
        { matasanoExercises(Object.keys(matasano)) }
      </Route>
    </Route>
  );
}

export function routeArray(matasanoExercises: Object) {
  return(reactRouterToArray(subRoutes(matasanoExercises)));
}
