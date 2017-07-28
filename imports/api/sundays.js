import { Meteor } from 'meteor/meteor';
export const Sundays = new Mongo.Collection('sundays');

if (Meteor.isServer) {

}

Meteor.methods({

  'sundays.addMusic'(sundayId, music) {
    const sunday = Sundays.findOne(sundayId);
    const addedMusics = sunday.musics;
    addedMusics.push(music);
    Sundays.update({
      _id: sundayId,
      musics: addedMusics,
    });
  },

  'sundays.findNextSunday'() {
    return { date: new Date() };
  },

});
