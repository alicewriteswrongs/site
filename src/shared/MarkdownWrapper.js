import React from 'react';

class MarkdownWrapper extends React.Component {
  static propTypes = {
    title:    React.PropTypes.string,
    body:     React.PropTypes.string,
  }

  render () {
    return (
      <div dangerouslySetInnerHTML={{__html: this.body}}></div>
    );
  }
}

export default MarkdownWrapper;
