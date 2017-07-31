import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Musics } from '../api/musics';

import Music from './Music.jsx';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
        selectedSunday: { date: new Date() },
    };
  }

  componentDidMount() {
    Meteor.call('sundays.findOrCreateNextSunday', (err, res) => {
      this.setState({ selectedSunday: res })
    });
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

  carregarDiretorioLocal() {
    Meteor.call('musics.readFromLocal');
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

        <button onClick={this.carregarDiretorioLocal.bind(this)}>
          carregar musicas do diretorio
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
