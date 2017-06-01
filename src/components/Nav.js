import React from 'react'
import { Link } from 'react-router'
import R from 'ramda'

const navRecords = [
  { path: '/', label: 'Home', regex: /\/$/ },
  { path: '/blog', label: 'Blog', regex: /blog\/?/ },
  { path: '/about', label: 'About', regex: /about\/?$/ },
  { path: '/projects', label: 'Projects', regex: /projects\/?/ }
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

const Nav = ({
  location: { pathname },
  navOpen,
  setNavShowState
}) => (
  <nav className='nav'>
    <ul className={`nav-link-list ${navOpen ? 'open' : 'closed'}`}>
      { desktopLinks(navLinks(pathname)) }
    </ul>
  </nav>
)

export default Nav
