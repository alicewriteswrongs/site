import React from 'react'
import { Link } from 'react-router'
import R from 'ramda'

const linkToRoute = R.curry((parentPath, routeProps) => (
  <Link to={`/${parentPath}/${routeProps.path}`} key={routeProps.path}>
    {routeProps.label}
  </Link>
))

export const linksToRoutes = parentPath => (
  R.map(linkToRoute(parentPath))
)
