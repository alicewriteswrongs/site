// @flow
import React from 'react'
import R from 'ramda'
import { Link } from 'react-router'

import { linksToRoutes } from '../lib/link_utils'
import { listify } from '../lib/helpers'
import { blogLinkData } from './Blog'

const formatBlogLinks = R.compose(listify, linksToRoutes('blog'))

const recentPosts = R.compose(
  R.reverse, R.takeLast(10)
)(blogLinkData)

const Home = () => {
  return <div className='single-column home'>
    <h1 className='announce'>
      Alice Pote
    </h1>
    <p>
      I'm a software engineer in Boston. I'm interested in Math, security, cryptography,
      front-end engineering, and functional programming.
    </p>
    <p>
      { 'This site contains my ' }
      <Link to='/blog'>blog</Link>
      { ' and some ' }
      <Link to='/projects'>projects</Link>
      { " I've worked on." }
    </p>
    <div className='showcase'>
      <div className='blog'>
        <h3>Recent Posts</h3>
        { formatBlogLinks(recentPosts) }
      </div>
      <div className='projects'>
        <h3>Projects</h3>
      </div>
    </div>

  </div>
}
// )

export default Home
