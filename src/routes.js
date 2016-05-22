import React from 'react';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';

import App from './components/App';
import MarkdownWrapper from './components/MarkdownWrapper';
let matasano = require('json!./data/matasano.json');

function makeMatasanoRoutes () {
  return Object.entries(matasano).map( ([k,v]) => {
    let component = <MarkdownWrapper title={v.title} body={v.body} />
    return <Route path={k} component={component} />
  });
}

export default function routes () {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        {makeMatasanoRoutes()}
      </Route>
    </Router>
  );
}
