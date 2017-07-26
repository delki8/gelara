import React, { Component, PropTypes } from 'react';

export default class Music extends Component {

  deleteMusic() {
    Meteor.call('musics.remove', this.props.msc._id);
  }

  addMusicToSunday(event) {
    event.preventDefault();
    Meteor.call('sunday.addMusic', this.props.sunday._id, this.props.msc._id);
  }

  render() {
    return (
      <div>
        <li>{this.props.msc.name}</li>
        <a href="#" onClick={this.addMusicToSunday.bind(this)}>
          +
        </a>
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
