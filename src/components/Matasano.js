// @flow
import React from 'react';
import { Markdown } from '../lib/markdown';
import { linksToRoutes } from '../lib/link_utils';
import { matasano } from '../data';
import R from 'ramda';

const pathRegex = /matasano\/?$/;

const mlinks = linksToRoutes('matasano');

const formatLinkProps = R.map(key => ({ path: key, label: matasano[key].title }));

const childrenToKeys = R.map(child => child.path);

const matasanoLinks = R.compose(linksToRoutes('matasano'), formatLinkProps, childrenToKeys);

export const MatasanoExercises = (props: Object) => {
  const {
    location: { pathname },
    children,
    route: { childRoutes }
  } = props;

  console.log(childrenToKeys(childRoutes));

  console.log(formatLinkProps(childrenToKeys(childRoutes)));

  console.log(matasanoLinks(childRoutes));

  return (
    <div>
      { pathname.match(pathRegex) ? matasanoLinks(childRoutes) : children }
    </div>
  );
};

export const MatasanoExercise = (matasano: Object) => {
  const MatasanoExercise = () => <Markdown md={matasano.body} />;
  return MatasanoExercise;
};
