// @flow
import React from 'react';
import { markdown } from '../lib/markdown';
import { linksToRoutes } from '../lib/link_utils';

const pathRegex = /matasano\/?$/;

const mlinks = linksToRoutes('matasano');

export const MatasanoExercises = (props: Object) => {
  const {
    location: { pathname },
    children,
    route: { childRoutes }
  } = props;

  return (
    <div>
      { pathname.match(pathRegex) ? mlinks(childRoutes) : children }
    </div>
  );
};

export const MatasanoExercise = (matasano: Object) => {
  const MatasanoExercise = () => markdown(matasano.body);
  return MatasanoExercise;
};
