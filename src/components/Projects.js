import React from 'react'
import R from 'ramda'

const project = (projectData, idx) => (
  <div className='project' key={idx}>
    <div className='title'>
      { projectData.title }
    </div>
    <div className='description'>
      { projectData.description }
    </div>
  </div>
)

const projectData = [
  {
    title: 'Boston Displacement Mapping Project',
    description: 'A map highlighting stories of displacement in Boston. Implemented with React + Redux + Leaflet.js.',
    project_url: "http://www.bostondisplacement.org/maps/tenant-stories/",
    source_code: "https://github.com/AntiEvictionBoston/Maps",
    technologies: ['JS', 'es6', 'webpack', 'react'],
  },
  {
    title: 'Matasano Exercises',
    description: 'A Placeholder',
    project_url: "/projects/matasano",
    technologies: ['golang', 'cryptography'],
  },
  {
    title: 'fp.js',
    description: 'A tiny functional programming library in JavaScript which I implemented mostly on a plane.',
    source_code: "https://github.com/aliceriot/fp.js",
    technologies: ['JS', 'es6', 'fp'],
  },
  {
    title: 'Lucy Parsons Center Schedule',
    description: 'A Rails app I wrote for a non-profit bookstore, allowing volunteers to coordinate shifts and training on a schedule.',
    technologies: ['react', 'rails', 'heroku'],
    source_code: "https://github.com/LucyParsonsCenter/shifts",
  },
  {
    title: 'Data Structures in C',
    description: 'Another Placeholder',
    technologies: ['C', 'algorithms'],
  },
  {
    title: 'Pocket Guide to Email Encryption',
    description: 'Another Placeholder',
    technologies: ['svg', 'pdf'],
  }
]

const projects = () => (
  <div className='projects single-column grid'>
    { R.addIndex(R.map)(project, projectData) }
  </div>
)

const Projects = ({ children }) => (
  R.isNil(children) ? projects() : children
)

export default Projects
