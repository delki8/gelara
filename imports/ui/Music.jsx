import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';

export default class Music extends Component {

  deleteMusic() {
    Meteor.call('musics.remove', this.props.msc._id);
    this.props.updateSunday();
  }

  addMusicToSunday(event) {
    Meteor.call('sundays.addMusic', this.props.sunday._id, this.props.msc._id);
    this.props.updateSunday();
  }

  render() {
    return (
      <div className='musicItem'>
        <h3>{this.props.msc.name}</h3>
        <h2>{this.props.msc.timesPlayed}</h2>
        <button className="musicButton"
                onClick={this.addMusicToSunday.bind(this)}>
          add
        </button>
        <button className="musicButton"
                onClick={this.deleteMusic.bind(this)}>
          remove
        </button>
      </div>
    );
  }

}

Music.propTypes = {
  msc: PropTypes.object.isRequired,
  sunday: PropTypes.object.isRequired,
};
