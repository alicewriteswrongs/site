import entries from 'object.entries';
import hljs from 'highlight.js';

import 'react-mdl/extra/material';
import 'style!css!react-mdl/extra/material.css';

export default function setup () {
  if (!Object.entries) {
    entries.shim();
  }
}

hljs.initHighlightingOnLoad();
