// @flow
import React from 'react';
import R from 'ramda';

import { Markdown, Page } from '../lib/markdown';
import { linksToRoutes } from '../lib/link_utils';
import { matasano } from '../data';


const pathRegex = /matasano\/?$/;

const li = R.map(e => <li>{ e }</li>);

const mlinks = linksToRoutes('matasano');

const formatLinkProps = R.map(key => ({ path: key, label: matasano[key].title }));

const childrenToKeys = R.map(child => child.path);

const linksToChildren = R.compose(li, mlinks, formatLinkProps, childrenToKeys);

const matasanoLinks = children => (
  <ul className="link-list">
    { linksToChildren(children) }
  </ul>
);

const MatasanoPage = childRoutes => (
  <div>
    <Page pageName="matasano" />
    { matasanoLinks(childRoutes) }
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
      { pathname.match(pathRegex) ? MatasanoPage(childRoutes) : children }
    </div>
  );
};

export const MatasanoExercise = (matasano: Object) => {
  const MatasanoExercise = () => <Markdown md={matasano.body} />;
  return MatasanoExercise;
};
