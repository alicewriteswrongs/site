// @flow
import React from 'react'
import { Link } from 'react-router'

const Home = () => (
  <div className='single-column home'>
    <h1 className="announce">
      Alice Pote
    </h1>
    <p>
      I'm a software engineer in Boston. I like front-end stuff, cryptography, and
      functional programming.
    </p>
    <p>
      { 'This site contains my ' }
      <Link to='/blog'>blog</Link>
      { " and some " }
      <Link to='/projects'>projects</Link>
      { " I've worked on." }
    </p>
    <div className="showcase">
    </div>

  </div>
)

export default Home
