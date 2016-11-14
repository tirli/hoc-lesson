import React, { Component } from 'react';
import logo from '../logo.svg';

export default class Loading extends Component {
  isLoading() {
    throw new Error('isLoading should be implemented');
  }

  renderContent() {
    throw new Error('renderContent should be implemented');
  }

  render() {
    if (this.isLoading()) {
      return <img src={logo} className="App-logo" alt="logo" />
    }

    return this.renderContent();
  }
}
