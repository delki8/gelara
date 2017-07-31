import { Meteor } from 'meteor/meteor';
export const Sundays = new Mongo.Collection('sundays');

Meteor.methods({

  'sundays.addMusic'(sundayId, music) {
    const sunday = Sundays.findOne(sundayId);
    const addedMusics = sunday.musics;
    addedMusics.push(music);
    Sundays.update(
      { _id : sundayId },
      { $set : { musics : addedMusics } });
  },

  'sundays.findOrCreateNextSunday'() {
    // calculate the next sunday's date (returing today if today is sunday)
    const nextSundayDate = new Date();
    nextSundayDate.setDate(nextSundayDate.getDate() + ((7-nextSundayDate.getDay())%7) % 7);
    nextSundayDate.setHours(0, 0, 0, 0);

    // find an already persisted sunday with that date
    let nextSunday = Sundays.findOne({
      date : { $eq : nextSundayDate },
    });

    // if there isn't one, create it
    if (!nextSunday) {
      const insertedId = Sundays.insert({
        date : nextSundayDate,
        musics : [],
      });
      nextSunday = Sundays.findOne(insertedId);
    }

    return nextSunday;
  },

});
