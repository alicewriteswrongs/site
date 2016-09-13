import React from 'react'
import R from 'ramda'
import { Route, IndexRoute } from 'react-router'
import reactRouterToArray from 'react-router-to-array'
import _ from 'lodash'

import { matasano, blogPosts } from '../data'
import {
  MatasanoExercises,
  MatasanoExercise
} from '../components/Matasano'
import Home from '../components/Home'
import { BlogPage, BlogPost } from '../components/Blog'
import About from '../components/About'
import App from '../components/App'

const generateRoute = R.curry((component, [key, object]) => (
  <Route key={key} path={key} component={component(object)} />
))

const matasanoRoutes = R.map(generateRoute(MatasanoExercise))

const blogRoutes = R.map(generateRoute(BlogPost))

export function generateRoutes (matasano, blog) {
  return (
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path='about' component={About} />
      <Route path='matasano' component={MatasanoExercises}>
        { matasanoRoutes(_.entries(matasano)) }
      </Route>
      <Route path='blog' component={BlogPage}>
        { blogRoutes(_.entries(blog)) }
      </Route>
    </Route>
  )
}

export const routeArray = () => (
  reactRouterToArray(generateRoutes(matasano, blogPosts))
)
