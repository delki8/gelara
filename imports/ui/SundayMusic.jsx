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
      <tr>
        <td>
          <span className="musicName">
            {this.props.msc.name}
          </span>
        </td>
        <td>
          <button className="btn btn-outline-light btn-sm"
                  onClick={this.deleteMusic.bind(this)}>
            remove
          </button>
        </td>
      </tr>
    );
  }

}

SundayMusic.propTypes = {
  msc: PropTypes.object.isRequired,
  sunday: PropTypes.object.isRequired,
};
