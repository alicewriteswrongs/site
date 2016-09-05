import React from 'react';
import R from 'ramda';

import { Markdown } from '../lib/markdown';
import { linksToRoutes } from '../lib/link_utils';
import { blogPosts } from '../data';

const pathRegex = /blog\/?$/;

const ui = R.map(i => <ui>{ i }</ui>);

const blinks = linksToRoutes('blog');

const formatLinkProps = R.map(key => ({ path: key, label: blogPosts[key].title }));

const childrenToKeys = R.map(child => child.path);

const linksToChildren = R.compose(ui, blinks, formatLinkProps, childrenToKeys);

const blogLinks = children => (
  <div className="link-list">
    { linksToChildren(children) }
  </div>
);

export const BlogPage = (props: Object) => {
  const {
    location: { pathname },
    children,
    route: { childRoutes }
  } = props;

  return (
    <div className="single-column">
      { pathname.match(pathRegex) ? blogLinks(childRoutes) : children }
    </div>
  );
};

export const BlogPost = (post) => {
  const BlogPost = () => <Markdown md={post.body} />;
  return BlogPost;
};
