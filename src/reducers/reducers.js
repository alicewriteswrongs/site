// @flow
import {
  SET_NAV_SHOW_STATE,
  SET_MATASANO_CONTENTS,
  Action,
} from '../actions/actions';

export const initialState = {
  navOpen: false,
  matasano: {}
};
type State = {
  navOpen: boolean;
  matasano: {};
};

export function nav (state: State = initialState, action: Action) {
  switch (action.type) {
  case SET_NAV_SHOW_STATE:
    return { ...state, navOpen: action.payload };
  case SET_MATASANO_CONTENTS:
    return { ...state, matasano: action.payload };
  default:
    return state;
  }
}
