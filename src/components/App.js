import React from 'react';
import { Link } from 'react-router';

import Nav from './Nav';

class App extends React.Component {
  render () {
    return (
      <div>
        <Nav />
        <div className="literate-crypto-content">
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default App;
