import React from 'react';

let matasano = require('json!../data/matasano.json');

class MatasanoExercise extends React.Component {
  static propTypes = {
    title:    React.PropTypes.string,
    body:     React.PropTypes.string,
  }

  getBody = () => (
    matasano[this.props.route.path].body
  );

  render () {
    return (
      <div 
        className="markdown"
        dangerouslySetInnerHTML={{__html: this.getBody()}}>
      </div>
    );
  }
}

export default MatasanoExercise;
