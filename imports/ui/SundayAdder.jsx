import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import Music from './Music.jsx'

class SundayAdder extends Component {

  constructor(props) {
    super(props);

    this.state = {
      addedMusics: [],
    };
  }

  renderMusics() {
    return this.props.sunday.musics.map((music) => {
      return (
        <Music
          key={music._id}
          msc={music} />
      );
    });
  }

  render() {
    return (
      <div>
        <span>pratras</span>
        <h2>{this.props.sunday.date}</h2>
        <span>prafrente</span>
        <ul>
          {this.renderMusics(this)}
        </ul>
        <br />
      </div>
    );
  }

}

SundayAdder.propTypes = {
  sunday: PropTypes.object.isRequired,
};

export default createContainer(() => {
  return {
    addedMusics: [],
  };
}, SundayAdder);
