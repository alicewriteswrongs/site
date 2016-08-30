// @flow
import React from 'react';
import { Link } from 'react-router';
import R from 'ramda';

const linkToRoute = R.curry((parentPath, route) => (
  <Link to={`/${parentPath}/${route.path}`} key={route.path}>
    {route.path}
  </Link>
));

export const linksToRoutes = (parentPath: string) => (
  R.map(linkToRoute(parentPath))
);


