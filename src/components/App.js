import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { setNavOpen, setNavClosed } from '../actions/actions';

import Nav from './Nav';

class App extends React.Component {
  setNavOpen = () => {
    const { dispatch } = this.props;
    dispatch(setNavOpen());
  }

  setNavClosed = () => {
    const { dispatch } = this.props;
    dispatch(setNavClosed());
  }

  render () {
    return (
      <div>
        <Nav 
          setNavClosed={this.setNavClosed}
          setNavOpen={this.setNavOpen}
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
