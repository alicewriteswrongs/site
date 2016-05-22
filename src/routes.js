import React from 'react';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';

import App from './components/App';
let matasano = require('json!./data/matasano.json');

function makeMatasanoRoutes () {
}

export default function routes () {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
      </Route>
    </Router>
  );
}
