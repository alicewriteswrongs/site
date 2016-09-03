import React from 'react';

import { Markdown } from '../lib/markdown';
import { linksToRoutes } from '../lib/link_utils';

const pathRegex = /blog\/?$/;

const blogLinks = linksToRoutes('blog');

export const BlogPage = (props: Object) => {
  const {
    location: { pathname },
    children,
    route: { childRoutes }
  } = props;

  return (
    <div className="blog-page">
      { pathname.match(pathRegex) ? blogLinks(childRoutes) : children }
    </div>
  );
};

export const BlogPost = (post) => {
  const BlogPost = () => <Markdown md={post.body} />;
  return BlogPost;
};
