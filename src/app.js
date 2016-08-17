import "babel-polyfill";
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';

import { routes } from './routes';
import setup from './setup';
import configureStore from './store';
import {
  setNavShowState,
  setMatasanoContents,
  setBlogContents,
} from './actions/actions';

let matasano = require('json!./data/matasano.json');
let blogPosts = require('json!./data/blog.json');

require("./stylesheets/main.scss");
setup();

let store = configureStore();
store.dispatch(setMatasanoContents(matasano));
store.dispatch(setBlogContents(blogPosts));

browserHistory.listen(() => store.dispatch(setNavShowState(false)));

let domElement = document.getElementById("literate-crypto-app");

render(
  <Provider store={store}>
    { routes() }
  </Provider>,
  domElement
);
