import React from 'react';
import { render } from 'react-dom';
import routes from './routes';

let domElement = document.getElementById("literate-crypto-app");

render(routes(), domElement);
