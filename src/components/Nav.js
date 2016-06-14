// @flow
import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

class Nav extends React.Component {
  static contextTypes = {
    router:  React.PropTypes.object
  };

  currentRoute: Function = () => this.props.location.pathname;

  links: Function = (): React$Element[] => {
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
  };

  desktopLinks: Function = (): Array<any> => {
    let sep = k => <li key={k}>/</li>;
    return this.links().reduce( (cur, next) => (
      _.isArray(cur) ? cur.concat(sep(cur), next) : [cur].concat(sep(cur), next)
    ));
  };

  dropdownClass: Function = (): string => {
    const { navOpen } = this.props;
    return navOpen ? "open" : "closed";
  };

  toggleShowDropdown: Function = (): void => {
    const {
      navOpen,
      setNavShowState
    } = this.props;
    setNavShowState(!navOpen);
  };

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
        <div className={`nav-link-sidebar ${this.dropdownClass()}`}>
          <ul>
            { this.links() }
          </ul>
        </div>
      </div>
    );
  }
}

export default Nav;
