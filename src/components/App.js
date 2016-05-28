import React from 'react';
import { Link } from 'react-router';

class App extends React.Component {
  render () {
    return (
      <div>
        <Nav />
        { this.props.children }
      </div>
    );
  }
}

export default App;
