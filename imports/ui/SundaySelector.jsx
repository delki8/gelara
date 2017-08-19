import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';

import SundayMusic from '/imports/ui/SundayMusic.jsx';

export default class SundaySelector extends Component {

  renderMusics() {
    return this.props.sunday.musics.map((music) => {
      return (
        <SundayMusic
          key={music._id}
          msc={music}
          sunday={this.props.sunday}
          updateSunday={this.props.updateSunday}
          />
      );
    });
  }

  render() {
    const tableStyle = {
      marginTop: '1rem',
    };

    return (
      <div>
        <div className="row">

          <div className="col-2">
            <button className="btn btn-info"
              onClick={this.props.previousSunday}>
              &lt;&lt;
            </button>
          </div>

          <div className="col-8 text-center selectedSundayContainer">
            <span className="font-weight-bold">
              {this.props.sunday.date.toLocaleDateString()}
            </span>
          </div>

          <div className="col-2">
            <button className="btn btn-info float-right"
              onClick={this.props.nextSunday}>
              &gt;&gt;
            </button>
          </div>

        </div>

        <div className="row">
          <table className="table table-inverse" style={tableStyle}>
            <tbody>
              {this.renderMusics()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
