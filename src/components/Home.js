// @flow
import React from 'react';

export default class Home extends React.Component {
  render() {
    return (
      <div className="home two-column">
        <div className="main-column">
        </div>
        <div className="sidebar">
          <span>
            Recent Posts
          </span>
          <span>
            Recent Projects
          </span>
        </div>
      </div>
    );
  }
}
