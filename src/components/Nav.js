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

  dropdownClass = () => {
    const { state: { nav_open } } = this.props;
    return nav_open ? "open" : "closed";
  }

  toggleShowDropdown = () => {
    const {
      state: { nav_open },
      setNavShowState
    } = this.props;
    setNavShowState(!nav_open);
  }

  render () {
    return (
      <div className="literate-crypto-nav-wrapper">
        <nav className="literate-crypto-nav">
          <ul className="nav-link-list">
            { this.links() }
          </ul>
          <div 
            className="nav-link-dropdown-switch"
            onClick={this.toggleShowDropdown}
          >
            <i className="fa fa-bars fa-2x"></i>
          </div>
        </nav>
        <ul className={`nav-link-sidebar ${this.dropdownClass()}`}>
          { this.links() }
        </ul>
      </div>
    );
  }
}

export default Nav;
