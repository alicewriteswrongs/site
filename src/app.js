import React from 'react';
import { render } from 'react-dom';

import routes from './routes';
import setup from './setup';

setup();
let domElement = document.getElementById("literate-crypto-app");

render(routes(), domElement);
