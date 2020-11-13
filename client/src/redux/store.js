import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
const initialState = {};
const store = createStore(
  reducers,
  initialState,
  compose(applyMiddleware(thunk),
  typeof window === 'object' &&
    typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ?
      window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
);

export default store;
