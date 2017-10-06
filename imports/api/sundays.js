import { Meteor } from 'meteor/meteor';
import { Musics } from '/imports/api/musics';

export const Sundays = new Mongo.Collection('sundays');

Meteor.methods({

  'sundays.howManySundaysInTheLastXMonthsContainsThisMusic'(numberOfMonths, musicId) {
    const startDate = new Date();
    const music = Musics.findOne(musicId);
    startDate.setMonth(startDate.getMonth() - numberOfMonths);

    let sundays = Sundays.find({
      date : { $gte : startDate },
      musics : { $elemMatch: { _id : musicId } }
    })
    .count();
    return sundays;
  },

  'sundays.addMusic'(sundayId, musicId) {
    const sunday = Sundays.findOne(sundayId);
    const music = Musics.findOne(musicId);
    const alreadyAddedMusics = sunday.musics.filter((m) => {
      return m._id == musicId;
    });

    if (!alreadyAddedMusics.length) {
      const addedMusics = sunday.musics;
      addedMusics.push(music);
      Sundays.update(
        { _id : sundayId },
        { $set : { musics : addedMusics }
      });
    }
  },

  'sundays.removeMusic'(sundayId, musicId) {
    const sunday = Sundays.findOne(sundayId);
    const music = Musics.findOne(musicId);
    const numberOfMusicsBeforeRemoval = sunday.musics.length;
    const musicsAfterRemoval = sunday.musics.filter((m) => {
      return m._id != musicId;
    });

    Sundays.update(
      { _id : sundayId },
      { $set : { musics : musicsAfterRemoval }
    });
  },

  'sundays.findOrCreateNextSunday'(weeksIncrement) {
    // calculate the next sunday's date (returing today if today is sunday)
    const nextSundayDate = new Date();
    nextSundayDate.setDate(nextSundayDate.getDate() + ((7-nextSundayDate.getDay())%7) % 7);
    nextSundayDate.setHours(0, 0, 0, 0);

    if (weeksIncrement) {
      const daysIncrement = weeksIncrement * 7;
      nextSundayDate.setDate(nextSundayDate.getDate() + daysIncrement);
    }

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

Factory.define('sunday', Sundays, {
  date: () => new Date(),
  musics: [],
});
