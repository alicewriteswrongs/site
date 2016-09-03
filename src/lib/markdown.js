import React from 'react';
import { pages } from '../data';

export const Markdown = ({ md }) => {
  return (
    <div
      className="markdown"
      dangerouslySetInnerHTML={{ __html: md }}
    />
  );
};

export const Page = ({ pageName }) => <Markdown md={pages[pageName].body} />
