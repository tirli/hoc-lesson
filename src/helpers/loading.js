import React from 'react';
import logo from '../logo.svg';

export default (predicate) => MyComponent => {
  class LoadingComponent extends MyComponent {
    render() {
      if (predicate(this.props)) {
        return <img src={logo} className="App-logo" alt="logo" />
      }

      return super.render();
    }
  }

  return LoadingComponent;
}