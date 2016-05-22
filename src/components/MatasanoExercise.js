import React from 'react';

import MarkdownWrapper from '../shared/MarkdownWrapper.js';
let matasano = require('json!../data/matasano.json');

class MatasanoExercise extends MarkdownWrapper {
  getBody = () => (
    matasano[this.props.params.exercise].body
  );

  render () {
    return (
      this.renderHTML(this.getBody)
    );
  }
}

export default MatasanoExercise;
