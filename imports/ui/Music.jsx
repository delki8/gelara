import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';

export default class Music extends Component {

  deleteMusic() {
    Meteor.call('musics.remove', this.props.msc._id);
  }

  addMusicToSunday(event) {
    Meteor.call('sundays.addMusic', this.props.sunday._id, this.props.msc._id);
  }

  render() {
    return (
      <div>
        <h4>{this.props.sunday.date.toString()}</h4>
        <li>{this.props.msc.name}</li>
        <a href="#" onClick={this.addMusicToSunday.bind(this)}>
          +
        </a>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a href="#"
          onClick={this.deleteMusic.bind(this)}>
          x
        </a>
      </div>
    );
  }

}

Music.propTypes = {
  msc: PropTypes.object.isRequired,
  sunday: PropTypes.object.isRequired,
};
