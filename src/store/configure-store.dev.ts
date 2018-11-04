import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from '../reducers';

const enhancer = compose(
  applyMiddleware(thunkMiddleware, createLogger({
    collapsed: true,
  })),
);

export default (preloadedState) => {
  const store = createStore(
    reducers,
    preloadedState,
    enhancer,
  );

  return store;
};
