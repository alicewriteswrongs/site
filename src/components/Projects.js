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
    description: 'A Placeholder'
  },
  {
    title: 'Boston Displacement Mapping Project',
    description: 'A Placeholder'
  },
  {
    title: 'Boston Displacement Mapping Project',
    description: 'A Placeholder'
  },
  {
    title: 'Boston Displacement Mapping Project',
    description: 'A Placeholder'
  },
  {
    title: 'Matasano Exercises',
    description: 'Another Placeholder'
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
