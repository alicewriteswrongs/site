import React from 'react'
import R from 'ramda'

import { Markdown, IndexPage } from '../lib/markdown'
import { linksToRoutes, linkProps } from '../lib/link_utils'
import { blogPosts } from '../data'
import { listify } from '../lib/helpers'

export const blogPostLinks = R.compose(
  listify, linksToRoutes('blog'), linkProps
)

export const blogLinkData = linkProps(blogPosts)

export const BlogPage = props => (
  <IndexPage
    indexRegex={/blog\/?$/}
    pageContentName='blog'
    linker={blogPostLinks}
    data={blogPosts}
    {...props}
  />
)

export const BlogPost = post => {
  const BlogPost = () => <Markdown md={post.body} />
  return BlogPost
}
