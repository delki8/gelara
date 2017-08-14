import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';

export default class SundayMusic extends Component {

  deleteMusic() {
    Meteor.call('sundays.removeMusic', this.props.sunday._id, this.props.msc._id);
    this.props.updateSunday();
  }

  addMusicToSunday(event) {
    Meteor.call('sundays.addMusic', this.props.sunday._id, this.props.msc._id);
    this.props.updateSunday();
  }

  render() {
    return (
      <li className='sundayMusicItem'>
        <button onClick={this.deleteMusic.bind(this)}>
          remove
        </button>
        -
        {this.props.msc.name}
      </li>
    );
  }

}

SundayMusic.propTypes = {
  msc: PropTypes.object.isRequired,
  sunday: PropTypes.object.isRequired,
};
