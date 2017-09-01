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
    // const times = this.props.msc.timesPlayed > 1 ? ' times' : ' time';
    // const timesPlayedMsg = this.props.msc.timesPlayed ?
    // 'This song has been played ' + this.props.msc.timesPlayed + times :
    // 'This song have never been played';
    return (
      <div className="row musicCardStyle">
        <div className="col-1 removeStyle">
          <a href="#"
            className="btn rounded-circle removeButton"
            onClick={this.deleteMusic.bind(this)}>
            <span className="oi oi-trash"
                    title="add"
                    aria-hidden="true"></span>
          </a>
        </div>
        <div className="col-2 counterColumnStyle">
          <span className="counterStyle">
            {this.props.msc.timesPlayed ? this.props.msc.timesPlayed : 0}
          </span>
        </div>
        <div className="col-6 nameStyle">
          {this.props.msc.name}
        </div>
        <div className="col-2 addStyle">
          <a href="#"
            className="rounded-circle addButton"
            onClick={this.addMusicToSunday.bind(this)}>
            <span className="oi oi-plus"
                    title="add"
                    aria-hidden="true"></span>
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
