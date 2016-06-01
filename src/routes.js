import React from 'react';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';

import App from './components/App';
import MatasanoExercises from './components/MatasanoExercises';
import MatasanoExercise from './components/MatasanoExercise';

const matasanoExercises = entries => (
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
