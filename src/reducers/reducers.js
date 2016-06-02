import {
  SET_NAV_SHOW_STATE,
  SET_MATASANO_CONTENTS,
} from '../actions/actions';

export const initialState = {
  nav_open: false,
  matasano: {}
};

export function nav (state = initialState, action) {
  switch (action.type) {
  case SET_NAV_SHOW_STATE:
    return { ...state, nav_open: action.payload };
  case SET_MATASANO_CONTENTS:
    return { ...state, matasano: action.payload };
  default:
    return state;
  }
}
