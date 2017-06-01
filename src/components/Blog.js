import React from 'react'
import R from 'ramda'
import moment from 'moment'

import { Markdown } from '../lib/markdown'
import {
  linksToRoutes,
  linkProps
} from '../lib/link_utils'
import { blogPosts } from '../data'
import { listify } from '../lib/helpers'
import { Link } from 'react-router'

export const blogPostLinks = R.compose(
  listify, linksToRoutes('blog'), linkProps
)

export const blogLinkData = linkProps(blogPosts)

export const BlogPost = post => {
  const BlogPost = () => <Markdown md={post.body} />
  return BlogPost
}

const blogRegex = /blog\/?$/

const links = R.compose(
  R.reverse,
  R.values,
  R.mapObjIndexed((post, k) => (
    <div className='blog-post-link' key={k}>
      <Link to={`/blog/${k}`}>
        { post.title }
      </Link>
      <div className='post-date'>
        { moment(post.date).format('MM/YY/YYYY') }
      </div>
    </div>
  ))
)

export const BlogPage = ({children, location: {pathname}}) => {
  if (!pathname.match(blogRegex)) {
    return (
      <div className='single-column'>
        { children }
      </div>
    )
  }

  return (
    <div className='blog-index single-column'>
      <h2>
        Writing
      </h2>
      { links(blogPosts) }
    </div>
  )
}
