import React from 'react';
import withState from 'recompose/withState';
import compose from 'recompose/compose';

import ListItem from '../ListItem/ListItem';
import windowWidth from '../../helpers/windowWidth';
import showIf from '../../helpers/showIf';

const MovieList = (props) => {
  const { movies, windowWidth, currentMovie, changeCurrentMovie, onSelect } = props;

  const handleActive = (currentMovie) => {
    changeCurrentMovie(currentMovie);
    onSelect(currentMovie);
  }

  return (
    <div className="listContainer">
      <div className="movieListHeader">
        { windowWidth > 768
          ? `There are ${movies.length} movies in the list`
          : `Movies: ${movies.length}`
        }
      </div>
      { movies.map((file) =>
          <ListItem
            key={file.imdbID}
            item={file}
            active={currentMovie === file.imdbID}
            handleActive={handleActive}
          />
      )}
    </div>
  );
}

const showIfPredicate = (props) => props.movies && props.movies.length;
export default compose(
  showIf(showIfPredicate),
  withState('currentMovie', 'changeCurrentMovie', null),
  windowWidth
)(MovieList);
