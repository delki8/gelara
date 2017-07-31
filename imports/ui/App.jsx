import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Musics } from '/imports/api/musics';

import Music from '/imports/ui/Music.jsx';
import SundaySelector from '/imports/ui/SundaySelector.jsx';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
        selectedSunday: {
          date: new Date(),
          musics: [],
        },
        weeksIncrement: 0,
    };
  }

  componentDidMount() {
    Meteor.call('sundays.findOrCreateNextSunday', this.state.weeksIncrement,
    (err, res) => {
      this.setState({ selectedSunday: res })
    }
  );
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  addMusic(event) {
    event.preventDefault();

    const musicInput = ReactDOM.findDOMNode(this.refs.musicName);
    const musicName = musicInput.value.trim();
    if (musicName) {
      Meteor.call('musics.insert', musicName);
      musicInput.value = '';
      musicInput.focus();
    }

  }

  loadFromLocal() {
    Meteor.call('musics.readFromLocal');
  }

  nextSunday(e) {
    const newIncrement = this.state.weeksIncrement + 1;
    this.setState({ weeksIncrement : newIncrement });
    Meteor.call('sundays.findOrCreateNextSunday', newIncrement,
    (err, res) => {
      this.setState({ selectedSunday: res })
    }
  );
  }

  previousSunday(e) {
    const newIncrement = this.state.weeksIncrement - 1;
    this.setState({ weeksIncrement : newIncrement });
    Meteor.call('sundays.findOrCreateNextSunday', newIncrement,
    (err, res) => {
      this.setState({ selectedSunday: res })
    }
  );
  }

  renderMusics() {
    return this.props.musics.map((music) => {
      return (
        <Music
          key={music._id}
          msc={music}
          sunday={this.state.selectedSunday}
          />
      );
    });
  }

  render() {
    return (
      <div className="container">
        <SundaySelector
          nextSunday={this.nextSunday.bind(this)}
          previousSunday={this.previousSunday.bind(this)}
          sunday={this.state.selectedSunday}
          />

        <button onClick={this.loadFromLocal.bind(this)}>
          load musics from local dir
        </button>
        <br />
        <form onSubmit={this.addMusic.bind(this)}>
          <input type="text" id="musicName" ref="musicName" />
          <button>
            add music
          </button>
        </form>

        <ul>
          {this.renderMusics()}
        </ul>
      </div>
    );
  }

}

export default createContainer(() => {
  Meteor.subscribe('allMusics');

  return {
    musics: Musics.find({}, {sort: {name: 1}}).fetch(),
  };
}, App);
