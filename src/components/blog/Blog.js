import React from 'react';

export const BlogPage = () => (
  <span>blog</span>
);

export const BlogPost = post => (
  () => markdown(post.body)
);
