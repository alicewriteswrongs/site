import React from 'react'
import { Link } from 'react-router'
import R from 'ramda'

export const linkToRoute = R.curry((parentPath, routeProps) => (
  <Link to={`/${parentPath}/${routeProps.path}`} key={routeProps.path}>
    {routeProps.label}
  </Link>
))

export const linkProps = R.compose(
  R.values, R.mapObjIndexed((v, k) => (
    { path: k, label: v.title }
  ))
)

export const linksToRoutes = parentPath => (
  R.map(linkToRoute(parentPath))
)
