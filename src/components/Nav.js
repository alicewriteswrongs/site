// @flow
import React from 'react';
import { Link } from 'react-router';
import R from 'ramda';

const navRecords = [
  { path: "/",
    label: "Home",
    regex: /\/?$/,
  },
  {
    path: "/about",
    label: "About",
    regex: /about\/?$/,
  }, 
  {
    path: "/matasano",
    label: "Matasano Exercises",
    regex: /matasano\/?$/,
  }
];

const navLink = navRecord => (
  <li key={navRecord.path} className={navRecord.active}>
    <Link to={navRecord.path}>{navRecord.label}</Link>
  </li>
);

let setActive = R.curry((cur, record) => {
  if ( cur.match(record.regex) ) {
    return Object.assign({}, record, {
      active: 'active'
    });
  } else {
    return Object.assign({}, record, {
      active: ''
    });
  }
});

const navLinks = R.curry((current) => (
  R.pipe(R.map(setActive(current)), R.map(navLink))(navRecords)
));

const liSep = R.curry((sep, item, index) => [item, <li key={index}>{sep}</li>]);
const separatedLinks = R.addIndex(R.chain)(liSep("/"));
const desktopLinks = R.pipe(separatedLinks, R.dropLast(1));

class Nav extends React.Component {
  props: {
    location:         Object,
    navOpen:          boolean,
    setNavShowState:  (b: boolean) => void,
  };

  static contextTypes = {
    router:  React.PropTypes.object
  };

  currentRoute: Function = () => this.props.location.pathname;

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

  render() {
    return (
      <div className="literate-crypto-nav-wrapper">
        <nav className="literate-crypto-nav">
          <ul className="nav-link-list">
            { desktopLinks(navLinks(this.currentRoute())) }
          </ul>
          <div 
            className="nav-link-sidebar-switch"
            onClick={this.toggleShowDropdown}
          >
          </div>
        </nav>
        <div className={`nav-link-sidebar ${this.dropdownClass()}`}>
          <ul>
            { navLinks(this.currentRoute()) }
          </ul>
        </div>
      </div>
    );
  }
}

export default Nav;
