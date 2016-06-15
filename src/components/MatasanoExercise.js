// @flow
import React from 'react';
import { connect } from 'react-redux';

class MatasanoExercise extends React.Component {
  static propTypes = {
    title:    React.PropTypes.string,
    body:     React.PropTypes.string,
    matasano: React.PropTypes.object,
  }

  getBody = () => {
    const { matasano } = this.props;
    return matasano[this.props.route.path].body
  };

  render () {
    return (
      <div 
        className="markdown"
        dangerouslySetInnerHTML={{ __html: this.getBody() }}>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  matasano: state.matasano
});

export default connect(mapStateToProps)(MatasanoExercise);
