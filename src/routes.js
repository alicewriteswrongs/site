// @flow
import React from 'react';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';

import App from './components/App';
import MatasanoExercises from './components/MatasanoExercises';
import MatasanoExercise from './components/MatasanoExercise';
import type { MatasanoExercise } from './types';

const matasanoExercises = (entries: MatasanoExercise[]) => (
  Object.keys(entries).map( key => (
    <Route key={key} path={key} component={MatasanoExercise} />
  ))
);

export default function routes (matasano) {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="matasano" component={MatasanoExercises}>
          {matasanoExercises(matasano)}
        </Route>
      </Route>
    </Router>
  );
}
