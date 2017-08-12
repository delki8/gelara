import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import fs from 'fs';

export const Musics = new Mongo.Collection('musics');

if (Meteor.isServer) {
  Meteor.publish('allMusics', function musicsPub() {
    return Musics.find();
  });

  Meteor.methods({
    'musics.readFromLocal'() {
      const files = fs.readdirSync('/home/ruither/Dropbox/Mosaico - Cânticos/');
      files
        .filter(function(nome) {
          return !nome.startsWith(".");
        })
        .map((file) => {
        Meteor.call('musics.insert', file);
      });
    },
  });

}

Meteor.methods({

  'musics.insert'(musicName) {
    check(musicName, String);

    const existingMusic = Musics.find({
      name : { $eq: musicName }
    }).fetch();
    if (existingMusic.length == 0) {
      Musics.insert({
        name: musicName,
        createdAt: new Date(),
      });
    }
  },

  'musics.remove'(musicId) {
    Musics.remove(musicId);
  },

  'musics.incrementCounter'(music) {
    const timesPlayed = (music.timesPlayed == undefined ? 0 : music.timesPlayed) + 1;
    Musics.update(
      { _id : music._id },
      { $set : { timesPlayed }
    });
  },

  'musics.decrementCounter'(music) {
    if (!music) {
      return;
    }
    const timesPlayed = (music.timesPlayed == undefined ? 0 : music.timesPlayed) - 1;
    Musics.update(
      { _id : music._id },
      { $set : { timesPlayed }
    });
  },

});
