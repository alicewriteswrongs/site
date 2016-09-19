import React from 'react'
import R from 'ramda'

import { Markdown } from '../lib/markdown'
import { linksToRoutes } from '../lib/link_utils'
import { blogPosts } from '../data'

const pathRegex = /blog\/?$/

const li = R.map(i => <li>{ i }</li>)

const blinks = linksToRoutes('blog')

const formatLinkProps = R.map(key => ({ path: key, label: blogPosts[key].title }))

const childrenToKeys = R.map(child => child.path)

const linksToChildren = R.compose(li, blinks, formatLinkProps, childrenToKeys)

const blogLinks = children => (
  <div>
    <Page pageName='blog' />
    <div className='link-list'>
      { linksToChildren(children) }
    </div>
  </div>
)

export const BlogPage = props => {
  const {
    location: { pathname },
    children,
    route: { childRoutes }
  } = props

  return (
    <div className='single-column'>
      { pathname.match(pathRegex) ? blogLinks(childRoutes) : children }
    </div>
  )
}

export const BlogPost = post => {
  const BlogPost = () => <Markdown md={post.body} />
  return BlogPost
}
