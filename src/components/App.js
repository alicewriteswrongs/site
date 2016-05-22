import React from 'react';

class App extends React.Component {
  render () {
    return (
      <div>
        wow
        {this.props.children}
      </div>
    );
  }
}

export default App;
