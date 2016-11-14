import React, { Component } from 'react';

import { getById } from '../api/omdb';
import logo from '../logo.svg';

export default class FilmInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null,
      loading: false,
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
    if (this.statewindowWidth !== document.body.clientWidth) {
      this.setState({
        windowWidth: document.body.clientWidth,
      });
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.itemId && this.props.itemId !== nextProps.itemId) {
      this.setState({ loading: true });
      const { windowWidth } = this.state;
      const plotSize = windowWidth > 768 ? 'full' : 'short';

      getById(nextProps.itemId, plotSize).then((result) => {
        if (result.Error) return;
        this.setState({
          item: result,
          loading: false,
        });
      });
    }
  }

  render() {
    const { item, loading } = this.state;
    if (loading) {
      return <img src={logo} className="App-logo" alt="logo" />
    }
    if (!item) {
      return null;
    }

    return (
      <div>
        <img src={item.Poster} alt={item.Title} />
        <div>
          <h1> {item.Title} </h1>
          <p> Actors: {item.Actors} </p>
          <p> Genres: {item.Genre} </p>
          <p> {item.Plot} </p>
        </div>
      </div>
    );
  }
}
