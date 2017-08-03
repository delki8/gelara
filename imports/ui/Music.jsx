import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';

export default class Music extends Component {

  deleteMusic() {
    if (this.props.mode == 'sunday') {
      Meteor.call('sundays.removeMusic', this.props.sunday._id, this.props.msc._id);
    } else {
      Meteor.call('musics.remove', this.props.msc._id);
    }
    this.props.updateSunday();
  }

  addMusicToSunday(event) {
    Meteor.call('sundays.addMusic', this.props.sunday._id, this.props.msc._id);
    this.props.updateSunday();
  }

  render() {
    return (
      <div>
        <h2>{this.props.msc.timesPlayed}</h2>
        <li>{this.props.msc.name}</li>
        {
          this.props.mode == 'sunday' ?
          '' :
          <div>
            <h4>{this.props.sunday.date.toString()}</h4>
            <a href="#" onClick={this.addMusicToSunday.bind(this)}>
              +
            </a>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
        }
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
