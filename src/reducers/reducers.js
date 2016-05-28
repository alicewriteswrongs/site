import {
  SET_NAV_OPEN,
  SET_NAV_CLOSED
} from '../actions/actions';

export function nav (state = {nav_open: false}, action) {
  switch (action.type) {
  case SET_NAV_OPEN:
    return { ...state, nav_open: true };
  case SET_NAV_CLOSED:
    return { ...state, nav_open: false };
  default:
    return state;
  }
}
