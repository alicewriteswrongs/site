import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

class Nav extends React.Component {
  static contextTypes = {
    router:  React.PropTypes.object
  };

  currentRoute = () => this.props.location.pathname;

  links = () => {
    let active = path => path === this.currentRoute() ? "active" : "";
    return Object.entries({
      "/": "Home",
      "/about": "About",
      "/matasano": "Matasano Exercises"
    }).map( ([path, label]) => (
      <li key={path} className={active(path)}>
        <Link to={path}>{label}</Link>
      </li>
    ));
  }

  desktopLinks = () => {
    let sep = k => <li key={k}>/</li>;
    return this.links().reduce( (cur, next) => (
      _.isArray(cur) ? cur.concat(sep(cur), next) : [cur].concat(sep(cur), next)
    ));
  };

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
            { this.desktopLinks() }
          </ul>
          <div 
            className="nav-link-sidebar-switch"
            onClick={this.toggleShowDropdown}
          >
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
