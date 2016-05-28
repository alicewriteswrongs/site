import { SET_NAV_SHOW_STATE } from '../actions/actions';

const initialNavState = {
  nav_open: false
};
export function nav (state = initialNavState, action) {
  switch (action.type) {
  case SET_NAV_SHOW_STATE:
    return { ...state, nav_open: action.payload };
  default:
    return state;
  }
}

export const initialState = {
  ...initialNavState
};
