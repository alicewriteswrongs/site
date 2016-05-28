import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { setNavShowState } from '../actions/actions';

import Nav from './Nav';

class App extends React.Component {

  setNavShowState = bool => {
    const { dispatch } = this.props;
    dispatch(setNavShowState(bool));
  }

  render () {
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

const mapStateToProps = state => ({state: state});

export default connect(mapStateToProps)(App);
