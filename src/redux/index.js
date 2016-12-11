import { createStore, combineReducers } from 'redux'
import movies from './modules/movies'
import currentMovie from './modules/currentMovie'

const reducers = combineReducers({
  movies,
  currentMovie,
});

export default  createStore(reducers, {});
