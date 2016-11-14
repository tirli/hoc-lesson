import React, { Component } from 'react';

import { getById } from '../api/omdb';
import logo from '../logo.svg';
import windowWidth from '../helpers/windowWidth';

class FilmInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null,
      loading: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { windowWidth, itemId } = nextProps;
    if (itemId && this.props.itemId !== itemId) {
      this.setState({ loading: true });
      const plotSize = windowWidth > 768 ? 'full' : 'short';

      getById(itemId, plotSize).then((result) => {
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

export default windowWidth(FilmInfo);
