// @flow
import React from 'react';

import { markdown } from '../shared/markdown';
import { linksToRoutes } from '../shared/routing';

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

export const BlogPost = (post: Object) => {
  const BlogPost = () => markdown(post.body);
  return BlogPost;
};
