import React, { Component } from 'react';

export default  class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    }
  }

  onInputChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  }

  onSearch = (event) => {
    event.preventDefault();
    this.props.onSearch(this.state.value);
  }

  render() {
    const { value } = this.state;

    return (
      <form>
        <input value={value} onChange={this.onInputChange} name="search" className="test-input" />
        <button onClick={this.onSearch} className="test-search-btn"> Search </button>
      </form>
    );
  }
}
