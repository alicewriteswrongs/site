import React from 'react';

class MarkdownWrapper extends React.Component {
  static propTypes = {
    title:    React.PropTypes.string,
    body:     React.PropTypes.string,
  }

  renderHTML = rawHTML => (
    <div dangerouslySetInnerHTML={{__html: rawHTML}}></div>
  );
}

export default MarkdownWrapper;
