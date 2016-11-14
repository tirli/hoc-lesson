import React from 'react';
import withState from 'recompose/withState';
import compose from 'recompose/compose';

import { getById } from '../api/omdb';
import windowWidth from '../helpers/windowWidth';
import Loading from '../helpers/Loading';

class FilmInfo extends Loading {
  componentWillReceiveProps(nextProps) {
    const { windowWidth, itemId, handleLoading, handleItem } = nextProps;

    if (itemId && this.props.itemId !== itemId) {
      handleLoading(true);
      const plotSize = windowWidth > 768 ? 'full' : 'short';

      getById(itemId, plotSize).then((result) => {
        if (result.Error) return;
        handleLoading(false);
        handleItem(result);
      });
    }
  }

  isLoading = () => {
    return this.props.loading;
  }

  renderContent() {
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
export default compose(
  windowWidth,
  withStateLoading,
  withStateItem
)(FilmInfo);
