import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import {
  Router,
  browserHistory
} from 'react-router'

import { matasano, blogPosts } from './data'
import { generateRoutes } from './lib/routing'
import setup from './setup'
import configureStore from './store'
import {
  setNavShowState,
  setMatasanoContents,
  setBlogContents
} from './actions/actions'

require('./stylesheets/main.scss')
setup()

let store = configureStore()
store.dispatch(setMatasanoContents(matasano))
store.dispatch(setBlogContents(blogPosts))

browserHistory.listen(() => store.dispatch(setNavShowState(false)))

let domElement = document.getElementById('app')

const onRouteUpdate = () => {
  if (window.MathJax !== undefined) {
    window.MathJax.Hub.Typeset()
  }
}

render(
  <Provider store={store}>
    <Router history={browserHistory} onUpdate={onRouteUpdate}>
      { generateRoutes(matasano, blogPosts) }
    </Router>
  </Provider>,
  domElement
)
