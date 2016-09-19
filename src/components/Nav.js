import React from 'react'
import { Link } from 'react-router'
import R from 'ramda'
import ReactPageClick from 'react-page-click';

const navRecords = [
  { path: '/', label: 'Home', regex: /\/$/ },
  { path: '/about', label: 'About', regex: /about\/?$/ },
  { path: '/matasano', label: 'Matasano Exercises', regex: /matasano\/?/ },
  { path: '/blog', label: 'Blog', regex: /blog\/?/ }
]

const navLink = rec => (
  <li key={rec.path} className={rec.active}>
    <Link to={rec.path}>{rec.label}</Link>
  </li>
)

let setActive = R.curry((cur, record) => (
  Object.assign({}, record, { active: cur.match(record.regex) ? 'active' : '' })
))

const navLinks = R.curry((current) => (
  R.pipe(R.map(setActive(current)), R.map(navLink))(navRecords)
))

const liSep = R.curry((sep, item, index) => [item, <li key={index}>{sep}</li>])

const separatedLinks = R.addIndex(R.chain)(liSep('/'))

const desktopLinks = R.pipe(separatedLinks, R.dropLast(1))

const sidebar = (setNavShowState, pathname, open) => {
  if (open) {
    return (
      <ReactPageClick notify={() => setNavShowState(false)}>
        <div className='nav-link-sidebar open'>
          { navLinks(pathname) }
        </div>
      </ReactPageClick>
    );
  }
  return <div className='nav-link-sidebar closed'>
  </div>
};

const Nav = ({
  location: { pathname },
  navOpen,
  setNavShowState
}) => (
  <div className='literate-crypto-nav-wrapper'>
    <nav className='literate-crypto-nav'>
      <ul className='nav-link-list'>
        { desktopLinks(navLinks(pathname)) }
      </ul>
      <div
        className='nav-link-sidebar-switch'
        onClick={() => setNavShowState(!navOpen)}
      />
    </nav>
    { sidebar(setNavShowState, pathname, navOpen) }
  </div>
)

export default Nav
