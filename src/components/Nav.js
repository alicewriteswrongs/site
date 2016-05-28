import React from 'react';
import {
  Layout,
  Header,
  Navigation,
  Drawer
} from 'react-mdl';
import { Link } from 'react-router';

class App extends React.Component {
  render () {
    return (
      <Layout>
        <Header transparent title="LC">
        </Header>
        { this.props.children }
      </Layout>
    );
  }
}

export default App;
