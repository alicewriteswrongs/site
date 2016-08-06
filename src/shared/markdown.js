import React from 'react';

export const markdown = (md: string): React$Element<string> => {
  return (
    <div
      className="markdown"
      dangerouslySetInnerHTML={{ __html: md }}
    />
  );
};
