import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';

import routes from './routes';
import setup from './setup';
import { nav } from './reducers/reducers';

require("./stylesheets/main.scss");
setup();

let store = createStore(nav);

let domElement = document.getElementById("literate-crypto-app");

render(routes(), domElement);
