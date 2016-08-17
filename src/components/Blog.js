// @flow
import React from 'react';

export const BlogPage = () => (
  <span>blog</span>
);

export const BlogPost = post => {
  const BlogPost = () => markdown(post.body);
  return BlogPost;
};
