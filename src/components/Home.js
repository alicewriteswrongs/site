// @flow
import React from 'react';

const Home = () => (
  <div className="home two-column">
    <div className="main-column">
      <h1>
        Alice Pote
      </h1>
      <p>
        I'm a software engineer. I like front-end stuff, cryptography, and
        functional programming.
      </p>
      <p>
        This site contains my blog, projects I've worked on
      </p>

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

export default Home;
