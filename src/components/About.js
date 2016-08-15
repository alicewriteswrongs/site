// @flow
import React from 'react';

const About = () => (
  <div className="about-page single-column">
    <h1>
      About
    </h1>
    <p>
    This site is build with React.js and Redux, with a bunch of 
    Node scripts and a Rakefile to build it and deploy it.
    </p>
    <p>
      The code can be found 
        <a href="https://github.com/aliceriot/site">
          here
        </a>
      . It's deployed on github-pages.
    </p>
  </div>
);

export default About;
