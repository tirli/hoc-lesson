import React, { PureComponent } from 'react';
import '../App.css';
import ListItem from './ListItem';

export default class MovieList extends PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      currentMovie: null,
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

  handleActive = (currentMovie) => {
    this.setState({ currentMovie });
    this.props.onSelect(currentMovie);
  }

  render() {
    const { movies } = this.props;
    const { windowWidth } = this.state;

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
            active={this.state.currentMovie === file.imdbID}
            handleActive={this.handleActive}
          />
        )}
      </div>
    );
  }
}
