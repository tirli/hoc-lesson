import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { getById, search } from './api/omdb';

import ListItem from './components/ListItem';
import SearchField from './components/SearchField';
import FilmInfo from './components/FilmInfo';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemId: null,
      items: [],
    };
  }
  componentDidMount() {
    getById('tt2407380').then((result) => {
      this.setState({ item: result });
    });
  }

  onGetDetailsPressed = (itemId) => this.setState({ itemId })

  onSearch = (value) => {
    search(value).then((result) => this.setState({ items: result }));
  }

  render() {
    const { item, items, itemId } = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <SearchField onSearch={this.onSearch} />

        { items.map((file) =>
          <ListItem key={file.imdbID} item={file} onGetDetailsPressed={this.onGetDetailsPressed} />
        )}

        <FilmInfo itemId={itemId} />        
      </div>
    );
  }
}

export default App;
