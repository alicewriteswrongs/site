import React from 'react';
import { render } from 'react-dom';

import routes from './routes';
import setup from './setup';
import configureStore from './store';

require("./stylesheets/main.scss");
setup();

let store = configureStore();

let domElement = document.getElementById("literate-crypto-app");

render(routes(), domElement);
