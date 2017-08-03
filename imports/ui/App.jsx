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
        nameFilter: '',
    };
  }

  componentDidMount() {
    this.updateSunday();
  }

  updateSunday() {
    this.findOrCreateNextSunday(this.state.weeksIncrement);
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
    this.findOrCreateNextSunday(newIncrement);
  }

  previousSunday(e) {
    const newIncrement = this.state.weeksIncrement - 1;
    this.setState({ weeksIncrement : newIncrement });
    this.findOrCreateNextSunday(newIncrement);
  }

  findOrCreateNextSunday(increment) {
    Meteor.call('sundays.findOrCreateNextSunday', increment,
      (err, res) => {
        this.setState({ selectedSunday: res })
      }
    );
  }

  updateFilter(e) {
    this.setState({ nameFilter : e.target.value });
  }

  renderMusics() {
    return this.props.musics
    .filter((m) => {
      return !this.state.nameFilter || m.name.toLowerCase().indexOf(this.state.nameFilter.toLowerCase()) != -1;
    })
    .map((music) => {
      return (
        <Music
          key={music._id}
          msc={music}
          sunday={this.state.selectedSunday}
          updateSunday={this.updateSunday.bind(this)}
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
          updateSunday={this.updateSunday.bind(this)}
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

        <br />
        <input
          value={this.state.nameFilter}
          onChange={this.updateFilter.bind(this)} />
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
    musics: Musics.find({}, {sort: {name: 1}}).fetch()
  };
}, App);
