import React from 'react';
import withState from 'recompose/withState';

import '../App.css';
import ListItem from './ListItem';
import windowWidth from '../helpers/windowWidth';

const MovieList = (props) => {
  const { movies, windowWidth, currentMovie, changeCurrentMovie, onSelect } = props;

  const handleActive = (currentMovie) => {
    changeCurrentMovie(currentMovie);
    onSelect(currentMovie);
  }

  if (!movies.length) {
    return null;
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

export default withState('currentMovie', 'changeCurrentMovie', null)(windowWidth(MovieList));
