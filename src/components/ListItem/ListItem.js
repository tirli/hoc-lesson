/*global $ */
import React, { Component } from 'react';

export default class ListItem extends Component {
  setActive = () => {
    this.props.handleActive(this.props.item.imdbID);
  }

  render() {
    const { item, active } = this.props;

    return (
      <div className={`${active ? 'active ' : '' }listItemContainer`} >
        <div className="posterWrapper">
          { item.Poster
            ? <img
                ref={this.createPosterLightBox}
                className="poster"
                role="presentation"
                src={item.Poster}
              />
            : null}
        </div>
        <div className="contentWrapper" >
          <span className="content"> {item.Title} </span>
          <span className="content"> {item.Year} </span>
        </div>
        <button onClick={this.setActive}> select </button>
      </div>
    );
  }
}
