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
        musicComponents: {},
    };
  }

  componentDidMount() {
    this.updateSunday();
  }

  updateSunday(removedMusicId) {
    this.findOrCreateNextSunday(this.state.weeksIncrement);
    if (removedMusicId) {
      this.state.musicComponents[removedMusicId].updateTimesPlayed();
    }

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
      const m = <Music
        ref= {(child) => { this.state.musicComponents[music._id] = child; }}
        key={music._id}
        msc={music}
        sunday={this.state.selectedSunday}
        updateSunday={this.updateSunday.bind(this)}
        />;
      return (m);
    });
  }

  render() {
    return (
      <div className="container">
        <div className="sundayColumn">
          <SundaySelector
            nextSunday={this.nextSunday.bind(this)}
            previousSunday={this.previousSunday.bind(this)}
            sunday={this.state.selectedSunday}
            updateSunday={this.updateSunday.bind(this)}
            />
        </div>
        <div className="musicsColumn">
          <form onSubmit={this.addMusic.bind(this)}>
            <div className="input-group">
              <input className="form-control"
                      type="text"
                      id="musicName"
                      ref="musicName"
                      placeholder="music name" />
              <button className="input-group-addon">
                add new music
              </button>
            </div>
          </form>

          <div className="input-group">
            <span className="input-group-addon">filter musics</span>
            <input
              className="form-control"
              placeholder="music name"
              value={this.state.nameFilter}
              onChange={this.updateFilter.bind(this)} />
          </div>
          {this.renderMusics()}
        </div>
      </div>
    );
  }

}

export default createContainer(() => {
  Meteor.subscribe('allMusics');
  return {
    musics: Musics.find({}).fetch()
  };
}, App);
