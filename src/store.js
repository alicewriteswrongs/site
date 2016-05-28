import { createStore, compose } from 'redux';
import { nav, initialState } from './reducers/reducers';

export default function configureStore() {
  const store = createStore(nav, initialState, compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));
  return store;
}
