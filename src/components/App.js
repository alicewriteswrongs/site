import React from 'react'
import { connect } from 'react-redux'
import R from 'ramda'

import { setNavShowState } from '../actions/actions'
import Nav from './Nav'

const setNavShowStateHelper = R.curry((dispatch, bool) => (
  dispatch(setNavShowState(bool))
))

const App = props => (
  <div>
    <Nav {...props} />
    <div className='page-content'>
      <div className="single-column-wrapper">
        { props.children }
      </div>
    </div>
  </div>
)

const mapStateToProps = state => ({
  navOpen: state.navOpen
})

const mapDispatchToProps = dispatch => ({
  setNavShowState: setNavShowStateHelper(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
