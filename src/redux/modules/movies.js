import { search } from '../../api/omdb';

const LOAD = 'movies/LOAD';
const LOAD_SUCCESS = 'movies/LOAD_SUCCESS';
const LOAD_FAILED = 'movies/LOAD_FAILED';

const initialState = {
  entities: undefined,
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
        entities: action.result,
        loading: false,
        error: undefined,
      }
    }
    case LOAD_FAILED: {
      return {
        ...state,
        entities: undefined,
        loading: false,
        error: action.error,
      }
    }
    default:
      return state;
  }
}

function startLoad() {
  return {
    type: LOAD,
  }
}

function loadSuccess(result) {
  return {
    type: LOAD_SUCCESS,
    result,
  }
}

function loadFailed(error) {
  return {
    type: LOAD_FAILED,
    error,
  }
}

export function load(value) {
  return (dispatch) => {
    dispatch(startLoad());
    search(value).then(
      result => dispatch(loadSuccess(result)),
      error => dispatch(loadFailed(error))
    )
  }
}
