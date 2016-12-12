import { getById } from '../../api/omdb';

const LOAD = 'currentMovie/LOAD';
const LOAD_SUCCESS = 'currentMovie/LOAD_SUCCESS';
const LOAD_FAILED = 'currentMovie/LOAD_FAILED';

const initialState = {
  entity: undefined,
  loading: false,
  error: undefined,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD: {
      return {
        ...state,
        loading: true,
        error: undefined,
      }
    }
    case LOAD_SUCCESS: {
      return {
        ...state,
        entity: action.result,
        loading: false,
        error: undefined,
      }
    }
    case LOAD_FAILED: {
      return {
        ...state,
        entity: undefined,
        loading: false,
        error: action.error,
      }
    }
    default:
      return state;
  }
}

export function load(id, plotSize) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAILED],
    promise: getById(id, plotSize),
  }
}