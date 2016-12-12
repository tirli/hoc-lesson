import React, { Component } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';

import windowWidth from '../helpers/windowWidth';
import loading from '../helpers/loading';
import perfomanceTest from '../helpers/perfomanceTest';
import { load } from '../redux/modules/currentMovie';

class FilmInfo extends Component {
  componentWillReceiveProps(nextProps) {
    const { windowWidth, itemId, getMovie } = nextProps;

    if (itemId && this.props.itemId !== itemId) {
      const plotSize = windowWidth > 768 ? 'full' : 'short';
      getMovie(itemId, plotSize);
    }
  }

  render() {
    const { movie } = this.props;

    if (!movie) {
      return null;
    }

    return (
      <div>
        <img src={movie.Poster} alt={movie.Title} />
        <div>
          <h1> {movie.Title} </h1>
          <p> Actors: {movie.Actors} </p>
          <p> Genres: {movie.Genre} </p>
          <p> {movie.Plot} </p>
        </div>
      </div>
    );
  }
}

const loadingPredicate = (props) => props.loading;
export default compose(
  connect(
    ({ currentMovie }) => ({
      loading: currentMovie.loading,
      movie: currentMovie.entity,
    }),
    { getMovie: load }
  ),
  windowWidth,
  loading(loadingPredicate),
  perfomanceTest,
)(FilmInfo);
