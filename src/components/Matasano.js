import React from 'react'
import R from 'ramda'

import { Markdown, Page, IndexPage } from '../lib/markdown'
import { linksToRoutes, linkProps } from '../lib/link_utils'
import { matasano } from '../data'
import { listify } from '../lib/helpers'

const pathRegex = /matasano\/?$/

const matasanoLinks = R.compose(
  listify, linksToRoutes('matasano'), linkProps
)

export const MatasanoExercises = props => (
  <IndexPage
    indexRegex={/matasano\/?$/}
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
