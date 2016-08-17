// @flow
import React from 'react';
import { markdown } from '../../shared/markdown';

// class MatasanoExercise extends React.Component {
//   static propTypes = {
//     title:    React.PropTypes.string,
//     body:     React.PropTypes.string,
//     matasano: React.PropTypes.object,
//     route:    Object,
//   }

//   getBody = () => {
//     const { matasano } = this.props;
//     return matasano[this.props.route.path].body
//   };

//   render() {
//     return markdown(this.getBody());
//   }
// }

// const mapStateToProps = state => ({
//   matasano: state.matasano
// });

// export default connect(mapStateToProps)(MatasanoExercise);

const MatasanoExercise = (key, matasano) => {
  console.log(key, matasano);

  return () => markdown(matasano.body);
};

export default MatasanoExercise;
