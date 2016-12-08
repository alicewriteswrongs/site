import React from 'react'
import R from 'ramda'

export const listify = R.addIndex(R.map)((v, i) => <li key={i}>{ v }</li>)
