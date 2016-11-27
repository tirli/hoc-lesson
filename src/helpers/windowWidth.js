import React, { Component } from 'react';

export default function(MyComponent) {
  class WindowWidth extends Component {
    constructor() {
      super(...arguments);
      this.state = {
        windowWidth: 0,
      }
    }

    componentDidMount() {
      window.addEventListener('resize', this.handleResize);
      this.handleResize();
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize);
    }

    handleResize = () => {
      if (this.state.windowWidth !== document.body.clientWidth) {
        this.setState({
          windowWidth: document.body.clientWidth,
        });
      }
    };

    render() {
      return <MyComponent {...this.props} windowWidth={this.state.windowWidth} />
    }
  }

  return WindowWidth;
}