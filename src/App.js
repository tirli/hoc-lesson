import React, { Component } from 'react';
import { connect } from 'react-redux';

import logo from './logo.svg';
import './App.css';


import MovieList from './components/MovieList';
import SearchField from './components/SearchField';
import FilmInfo from './components/FilmInfo';
import { load } from './redux/modules/movies';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieId: null,
    };
  }

  onSearch = (value) => {
    this.props.getMovies(value);
  }

  handleSelectedMovie = (id) => {
    this.setState({ movieId: id });
  }

  render() {
    const { movieId } = this.state;

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <SearchField onSearch={this.onSearch} />
        </div>
        <MovieList onSelect={this.handleSelectedMovie}/>
        <FilmInfo itemId={movieId} />
      </div>
    );
  }
}

export default connect(
  () => ({}),
  { getMovies: load }
)(App);
