import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import fs from 'fs';
import faker from 'faker';

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
    Meteor.call('sundays.howManySundaysInTheLastXMonthsContainsThisMusic',
      24, musicId,
      (err, res) => {
        if (!err) {
          if (res < 1) {
            Musics.remove(musicId);
          } else {
            console.log('This song is still associated with at least one sunday and cannot be removed.');
          }
        }
      });
  },

});

Factory.define('music', Musics, {
  name: () => faker.lorem.sentence(),
  createdAt: () => new Date(),
});
