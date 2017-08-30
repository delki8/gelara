import { Meteor } from 'meteor/meteor';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Factory } from 'meteor/dburles:factory';
import { shallow } from ''
import StubCollections from 'meteor/hwillson:stub-collections';
import { chai } from 'meteor/practicalmeteor:chai';

import { Musics } from '/imports/api/musics.js';

describe('my module', function() {
  beforeEach(function () {
    StubCollections.stub(Musics);
  });

  afterEach(function () {
    StubCollections.restore();
  });

  it ('does something that should be tested', function() {
    const music = Factory.create('music');
    console.log(music);
    // this code will be executed by the test driver when the app is started
    // in the correct mode
  });
});
