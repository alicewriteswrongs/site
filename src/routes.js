// @flow
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import App from './components/App';
import MatasanoExercises from './components/MatasanoExercises';
import MatasanoExercise from './components/MatasanoExercise';
import type { MatasanoRecord } from './types';

const matasanoExercises = (entries: Object) => (
  Object.keys(entries).map( key => (
    <Route key={key} path={key} component={MatasanoExercise} />
  ))
);

export default function routes(matasano: Object) {
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
