import React from 'react'
import R from 'ramda'

export const listify = R.map(i => <li>{ i }</li>)
