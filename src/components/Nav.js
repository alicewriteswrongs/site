// @flow
import React from 'react';
import { Link } from 'react-router';
import R from 'ramda';

type NavRecord = { path: string, label: string, regex: RegExp, active: ?string };
const navRecords = [
  { path: "/", label: "Home", regex: /\/$/ },
  { path: "/about", label: "About", regex: /about\/?$/ },
  { path: "/matasano", label: "Matasano Exercises", regex: /matasano\/?/ },
];

const navLink = (rec: NavRecord) => (
  <li key={rec.path} className={rec.active}>
    <Link to={rec.path}>{rec.label}</Link>
  </li>
);

let setActive = R.curry((cur, record) => (
  Object.assign({}, record, { active: cur.match(record.regex) ? "active" : "" })
));

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
    const { location : { pathname } } = this.props;
    return (
      <div className="literate-crypto-nav-wrapper">
        <nav className="literate-crypto-nav">
          <ul className="nav-link-list">
            { desktopLinks(navLinks(pathname)) }
          </ul>
          <div 
            className="nav-link-sidebar-switch"
            onClick={this.toggleShowDropdown}
          >
          </div>
        </nav>
        <div className={`nav-link-sidebar ${this.dropdownClass()}`}>
          <ul>
            { navLinks(pathname) }
          </ul>
        </div>
      </div>
    );
  }
}

export default Nav;
