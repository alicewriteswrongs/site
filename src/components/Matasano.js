// @flow
import React from 'react';
import { Link } from 'react-router';
import { markdown } from '../shared/markdown';

export class MatasanoExercises extends React.Component {
  props: {
    route:    Object,
    location: Object,
    children: React$Element<*>,
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  linksToChildren: Function = () => {
    return this.props.route.childRoutes.map( route => (
      <Link to={`/matasano/${route.path}`} key={route.path}>
        {route.path}
      </Link>
    ));
  };

  pathRegex = /matasano\/?$/;

  render() {
    const { location: { pathname } } = this.props;
    let body;
    if ( pathname.match(this.pathRegex) ) {
      body = this.linksToChildren();
    } else {
      body = this.props.children;
    }
    return (
      <div>
        {body}
      </div>
    );
  }
}

export const MatasanoExercise = (matasano: Object) => {
  const MatasanoExercise = () => markdown(matasano.body);
  return MatasanoExercise;
};
