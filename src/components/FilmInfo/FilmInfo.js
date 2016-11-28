import React, { Component } from 'react';
import withState from 'recompose/withState';
import compose from 'recompose/compose';

import { getById } from '../../api/omdb';
import windowWidth from '../../helpers/windowWidth';
import loading from '../../helpers/loading';
import perfomanceTest from '../../helpers/perfomanceTest';

export class FilmInfo extends Component {
  componentWillReceiveProps(nextProps) {
    const { windowWidth, itemId, handleLoading, handleItem } = nextProps;

    if (itemId && this.props.itemId !== itemId) {
      handleLoading(true);
      const plotSize = windowWidth > 768 ? 'full' : 'short';

      return getById(itemId, plotSize)
        .then((result) => {
          handleLoading(false);
          handleItem(result);
        })
        .catch(e => {
          handleLoading(false);
        })
      ;
    }
  }

  render() {
    const { item } = this.props;

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

const withStateLoading = withState('loading', 'handleLoading', false);
const withStateItem = withState('item', 'handleItem', null);
const loadingPredicate = (props) => props.loading;
export default compose(
  windowWidth,
  withStateLoading,
  withStateItem,
  loading(loadingPredicate),
  perfomanceTest,
)(FilmInfo);
