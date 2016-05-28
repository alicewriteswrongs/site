import React from 'react';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';

import Nav from './components/Nav';
import MatasanoExercises from './components/MatasanoExercises';
import MatasanoExercise from './components/MatasanoExercise';
let matasano = require('json!./data/matasano.json');

const matasanoExercises = () => (
  Object.keys(matasano).map( key => (
    <Route key={key} path={key} component={MatasanoExercise} />
  ))
);

export default function routes () {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={Nav}>
        <Route path="matasano" component={MatasanoExercises}>
          {matasanoExercises()}
        </Route>
      </Route>
    </Router>
  );
}
