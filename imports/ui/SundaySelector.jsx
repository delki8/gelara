import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';

import SundayMusic from '/imports/ui/SundayMusic.jsx';

export default class SundaySelector extends Component {

  renderMusics() {
    return this.props.sunday.musics.map((music) => {
      return (
        <SundayMusic
          key={music._id}
          msc={music}
          sunday={this.props.sunday}
          updateSunday={this.props.updateSunday}
          />
      );
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.props.previousSunday}>
          &lt;&lt;
        </button>
        <span className="selectedSunday">{this.props.sunday.date.toLocaleDateString()}</span>
        <button onClick={this.props.nextSunday}>
          &gt;&gt;
        </button>

        <ul>
          {this.renderMusics()}
        </ul>
      </div>
    );
  }
}
