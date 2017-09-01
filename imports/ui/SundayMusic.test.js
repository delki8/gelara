import { Meteor } from 'meteor/meteor';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Factory } from 'meteor/dburles:factory';
import React from 'react';
import { shallow } from 'enzyme';
import StubCollections from 'meteor/hwillson:stub-collections';
import { chai } from 'meteor/practicalmeteor:chai';

import SundayMusic from '/imports/ui/SundayMusic.jsx';
import { Musics } from '/imports/api/musics.js';
import { Sundays } from '/imports/api/sundays.js';

describe('my module', function() {
  beforeEach(function () {
    StubCollections.stub(Musics);
    StubCollections.stub(Sundays);
  });

  afterEach(function () {
    StubCollections.restore();
  });

  it ('does something that should be tested', function() {
    const updateSunday = function() { console.log('updateSunday'); }
    const sunday = Factory.create('sunday');
    const music = Factory.create('music');
    const musicItem = shallow(<SundayMusic
                                key={music._id}
                                msc={music}
                                sunday={sunday}
                                updateSunday={updateSunday} />);
    // console.log(music);
    // console.log(musicItem.find('.musicName').prop('children'));
    chai.assert.equal(musicItem.find('.musicName').prop('children'), music.name);

    // this code will be executed by the test driver when the app is started
    // in the correct mode
  });
});
