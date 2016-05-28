import React from 'react';
import { Link } from 'react-router';

class Nav extends React.Component {
  render () {
    return (
      <nav>
        <ul className="nav-link-list">
          <li><Link to="/">Home</Link></li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
