import React from 'react';

export default (predicate) => (MyComponent) => {
  const Hideable = (props) => {
    if (!predicate(props)) return null;
    return <MyComponent {...props} />
  }

  return Hideable;
}