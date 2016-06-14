// @flow
import entries from 'object.entries';
import hljs from 'highlight.js';

export default function setup () {
  if (!Object.entries) {
    entries.shim();
  }
}

hljs.initHighlightingOnLoad();
