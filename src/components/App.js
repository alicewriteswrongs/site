// @flow
import React from 'react';
import { connect } from 'react-redux';
import { setNavShowState } from '../actions/actions';

import Nav from './Nav';

class App extends React.Component {
  props: {
    dispatch: Function,
    children: React$Element<*>
  };

  setNavShowState = bool => {
    const { dispatch } = this.props;
    dispatch(setNavShowState(bool));
  };

  render() {
    return (
      <div>
        <Nav 
          setNavShowState={this.setNavShowState}
          {...this.props}
        />
        <div className="literate-crypto-content">
          { this.props.children }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  navOpen: state.navOpen,
  matasano: state.matasano,
});

export default connect(mapStateToProps)(App);
