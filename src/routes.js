// @flow
import React from 'react';
import {
  Router,
  Route,
  browserHistory,
  IndexRedirect,
  IndexRoute,
} from 'react-router';
import reactRouterToArray from 'react-router-to-array';

import App from './components/App';
import MatasanoExercises from './components/MatasanoExercises';
import MatasanoExercise from './components/MatasanoExercise';
import Home from './components/Home';

const matasanoExercises = (entries: Object) => (
  Object.keys(entries).map( key => (
    <Route key={key} path={key} component={MatasanoExercise} />
  ))
);

export function routes(matasano: Object) {
  return (
    <Router history={browserHistory}>
      { subRoutes(matasano) }
    </Router>
  );
}

function subRoutes(matasano: Object) {
  return (
    <Route path="/">
      <IndexRedirect to="/literate-crypto" />
      <Route path="/literate-crypto" component={App}>
        <IndexRoute component={Home} />
        <Route path="matasano" component={MatasanoExercises}>
          {matasanoExercises(matasano)}
        </Route>
      </Route>
    </Route>
  );
}

export function routeArray(matasanoExercises: Object) {
  return(reactRouterToArray(subRoutes(matasanoExercises)));
}
