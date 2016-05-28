import React from 'react';
import { Link } from 'react-router';

class Nav extends React.Component {
  links = () => {
    return Object.entries({
      "/": "Home",
      "/about": "About",
      "/matasano": "Matasano Exercises"
    }).map( ([path, label]) => (
      <li key={path}>
        <Link to={path}>{label}</Link>
      </li>
    ));
  }

  render () {
    return (
      <div className="literate-crypto-nav-wrapper">
        <nav className="literate-crypto-nav">
          <ul className="nav-link-list">
            { this.links() }
          </ul>
        </nav>
        <ul className="nav-link-dropdown">
          { this.links() }
        </ul>
      </div>
    );
  }
}

export default Nav;
