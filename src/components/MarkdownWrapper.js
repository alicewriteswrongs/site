import React from 'react';
import Markdown from 'remarkable';
import hljs from 'highlight.js';

class MarkdownWrapper extends React.Component {
  constructor (props) {
    super(props);
    this.md = new Markdown('full');
  }

  render () {
    return (
      <div dangerouslySetInnerHTML={{__html: this.md.render('# A TITLE\n ```js\nthis.props\n```')}}></div>
    );
  }
}

export default MarkdownWrapper;
