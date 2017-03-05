import React from 'react'
import R from 'ramda'

import { Markdown, IndexPage } from '../lib/markdown'
import { linksToRoutes, linkProps } from '../lib/link_utils'
import { matasano } from '../data'
import { listify } from '../lib/helpers'

const matasanoLinks = R.compose(
  listify, linksToRoutes('projects/matasano'), linkProps
)

export const MatasanoExercises = props => (
  <IndexPage
    indexRegex={/projects\/matasano\/?$/}
    pageContentName='matasano'
    linker={matasanoLinks}
    data={matasano}
    {...props}
  />
)

export const MatasanoExercise = matasano => {
  const MatasanoExercise = () => <Markdown md={matasano.body} />
  return MatasanoExercise
}
