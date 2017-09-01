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
    const cardStyle = {
      marginTop: '0.5girem',
      backgroundColor: '#FFFFFF',
      // borderSize: '3px',
      borderStyle: 'solid',
      borderColor: '#2F4F4F',
      borderRadius: '5px',
    };
    // const times = this.props.msc.timesPlayed > 1 ? ' times' : ' time';
    // const timesPlayedMsg = this.props.msc.timesPlayed ?
    // 'This song has been played ' + this.props.msc.timesPlayed + times :
    // 'This song have never been played';
    return (
      <div className="row" style={cardStyle}>
        <div className="col-2">

          {this.props.msc.timesPlayed}
        </div>
        <div className="col-6">
          {this.props.msc.name}
        </div>
        <div className="col-2">
          <a href="#"
            className="btn btn-primary btn-sm"
            onClick={this.addMusicToSunday.bind(this)}>
            add
          </a>
        </div>
        <div className="col-2">
          <a href="#"
            className="btn btn-danger btn-sm float-right"
            onClick={this.deleteMusic.bind(this)}>
            X
          </a>
        </div>
      </div>
      /*
      <div className="card" style={cardStyle}>
        <div className="card-header">
          <div className="row">
            <div className="col-10 font-weight-bold">
              {this.props.msc.name}
            </div>
            <div className="col-2">
              <a href="#"
                className="btn btn-danger btn-sm float-right"
                onClick={this.deleteMusic.bind(this)}>
                  X
              </a>
            </div>
          </div>
        </div>
        <div className="card-body">
          <p className="card-text">{timesPlayedMsg}</p>
        </div>

        <div className="card-footer">
          <a href="#"
            className="btn btn-primary btn-sm"
            onClick={this.addMusicToSunday.bind(this)}>
              add
          </a>
        </div>
      </div>
      */
    );
  }

}

Music.propTypes = {
  msc: PropTypes.object.isRequired,
  sunday: PropTypes.object.isRequired,
};
