import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { search } from './api/omdb';

import MovieList from './components/MovieList';
import SearchField from './components/SearchField';
import FilmInfo from './components/FilmInfo';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      movieId: null,
    };
  }

  onSearch = (value) => {
    search(value).then((result) => this.setState({ items: result }));
  }

  handleSelectedMovie = (id) => {
    this.setState({ movieId: id });
  }

  render() {
    const { items, movieId } = this.state;

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <SearchField onSearch={this.onSearch} />
        </div>
        <MovieList movies={items} onSelect={this.handleSelectedMovie}/>
        <FilmInfo itemId={movieId} />
      </div>
    );
  }
}

export default App;
