/* eslint-env mocha */
import assert from 'assert'
import {
  setNavShowState,
  SET_NAV_SHOW_STATE,

  setMatasanoContents,
  SET_MATASANO_CONTENTS,

  setBlogContents,
  SET_BLOG_CONTENTS
} from './actions'

describe('redux action creators', () => {
  describe('should create actions', () => {
    [true, false].forEach(bool => {
      it(`setNavState action to ${bool}`, () => {
        let action = setNavShowState(bool)
        assert.deepEqual(action, {
          type: SET_NAV_SHOW_STATE, payload: bool
        })
      })
    })

    it('setMatasanoContents action', () => {
      let object = { contents: 'Some Stuff' }
      let action = setMatasanoContents(object)
      assert.deepEqual(action, {
        type: SET_MATASANO_CONTENTS, payload: object
      })
    })

    it('setBlogContents action', () => {
      let object = { contents: 'Some Stuff' }
      let action = setBlogContents(object)
      assert.deepEqual(action, {
        type: SET_BLOG_CONTENTS, payload: object
      })
    })
  })
})
