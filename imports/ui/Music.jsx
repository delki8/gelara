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
      <li>
        <h2>{this.props.msc.name}</h2>
        {
          this.props.mode == 'sunday' ?
          '' :
          <div>
            <h2>{this.props.msc.timesPlayed}</h2>
            <button onClick={this.addMusicToSunday.bind(this)}>
              add
            </button>
          </div>
        }
        <button onClick={this.deleteMusic.bind(this)}>
          remove
        </button>
      </li>
    );
  }

}

Music.propTypes = {
  msc: PropTypes.object.isRequired,
  sunday: PropTypes.object.isRequired,
};
