import React from 'react';
import { Link } from 'react-router';

class MatasanoExercises extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  linksToChildren = () => {
    return this.props.route.childRoutes.map( route => (
      <Link to={`/matasano/${route.path}`} key={route.path}>
        {route.path}
      </Link>
    ));
  }

  render () {
    let body;
    if ( this.props.location.pathname === "/matasano" ) {
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
