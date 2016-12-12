export default store => next => async action => {
  if (!Array.isArray(action.types) || !action.promise) {
    return next(action);
  }

  const { promise, types, ...rest } = action;
  const [ REQUEST, REQUEST_SUCCESS, REQUEST_FAILED ] = types;

  store.dispatch({
    type: REQUEST,
    ...rest
  });

  try {
    const result = await promise;
    store.dispatch({
      type: REQUEST_SUCCESS,
      result,
      ...rest,
    });
  } catch(error) {
    store.dispatch({
      type: REQUEST_FAILED,
      error,
      ...rest,
    });
  }
}