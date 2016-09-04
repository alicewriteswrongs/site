// @flow
import React from 'react';
import R from 'ramda';

import { Markdown } from '../lib/markdown';
import { linksToRoutes } from '../lib/link_utils';
import { matasano } from '../data';

const pathRegex = /matasano\/?$/;

const mlinks = linksToRoutes('matasano');

const formatLinkProps = R.map(key => ({ path: key, label: matasano[key].title }));

const childrenToKeys = R.map(child => child.path);

const linksToChildren = R.compose(mlinks, formatLinkProps, childrenToKeys);

const matasanoLinks = children => (
  <div className="link-list">
    { linksToChildren(children) }
  </div>
);

export const MatasanoExercises = (props: Object) => {
  const {
    location: { pathname },
    children,
    route: { childRoutes }
  } = props;

  return (
    <div className="single-column">
      { pathname.match(pathRegex) ? matasanoLinks(childRoutes) : children }
    </div>
  );
};

export const MatasanoExercise = (matasano: Object) => {
  const MatasanoExercise = () => <Markdown md={matasano.body} />;
  return MatasanoExercise;
};
