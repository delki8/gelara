import Meteor from 'meteor/meteor';
import React, { Component } from 'react';

import Music from '/imports/ui/Music.jsx';

export default class SundaySelector extends Component {

  renderMusics() {
    return this.props.sunday.musics.map((music) => {
      return (
        <Music
          key={music._id}
          msc={music}
          sunday={this.props.sunday}
          mode='sunday'
          />
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
