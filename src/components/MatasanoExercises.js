// @flow
import React from 'react';
import { Link } from 'react-router';

class MatasanoExercises extends React.Component {
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

export default MatasanoExercises;
