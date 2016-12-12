import { createStore, combineReducers, applyMiddleware } from 'redux'
import logger from 'redux-logger';

import thunk from './middlewares/thunk';
import promise from './middlewares/promise';
import movies from './modules/movies';
import currentMovie from './modules/currentMovie';

const reducers = combineReducers({
  movies,
  currentMovie,
});

export default createStore(reducers, {}, applyMiddleware(
  thunk,
  promise,
  logger(),
));
