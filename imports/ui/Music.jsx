import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';

export default class Music extends Component {

  constructor(props) {
    super(props);

    this.state = {
      timesPlayed : 0
    };
  }

  componentDidMount() {
    this.updateTimesPlayed();
  }

  updateTimesPlayed() {
    Meteor.call('sundays.howManySundaysInTheLastXMonthsContainsThisMusic',
      3, this.props.msc._id,
      (err, res) => {
        if (!err) {
          this.setState({ timesPlayed : res });
        }
      });
  }

  deleteMusic() {
    Meteor.call('musics.remove', this.props.msc._id);
    this.props.updateSunday();
  }

  addMusicToSunday(event) {
    Meteor.call('sundays.addMusic', this.props.sunday._id, this.props.msc._id);
    this.props.updateSunday();
    this.updateTimesPlayed();
  }

  render() {
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
            {this.state.timesPlayed ? this.state.timesPlayed : 0}
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
    );
  }

}

Music.propTypes = {
  msc: PropTypes.object.isRequired,
  sunday: PropTypes.object.isRequired,
};
