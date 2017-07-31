import Meteor from 'meteor/meteor';
import React, { Component } from 'react';

export default class SundaySelector extends Component {
  renderMusics() {
    return this.props.sunday.musics.map((music) => {
      return (
        <li key={music._id}>
          {music.name}
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.props.previousSunday}>
          back
        </button>
        {this.props.sunday.date.toString()}
        <button onClick={this.props.nextSunday}>
          forward
        </button>

        <ul>
          {this.renderMusics()}
        </ul>
      </div>
    );
  }
}
