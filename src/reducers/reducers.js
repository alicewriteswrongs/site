// @flow
import {
  SET_NAV_SHOW_STATE,
  SET_MATASANO_CONTENTS,
  SET_BLOG_CONTENTS,
} from '../actions/actions';
import type { Action } from '../actions/actions';

export const initialState = {
  navOpen: false,
  matasano: {},
  blogPosts: {},
};

type State = {
  navOpen: boolean;
  matasano: {};
  blogPosts: {};
};

export function nav (state: State = initialState, action: Action) {
  switch (action.type) {
  case SET_NAV_SHOW_STATE:
    return { ...state, navOpen: action.payload };
  case SET_MATASANO_CONTENTS:
    return { ...state, matasano: action.payload };
  case SET_BLOG_CONTENTS:
    return { ...state, blogPosts: action.payload };
  default:
    return state;
  }
}
