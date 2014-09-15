var Collection = require('./collection');
var Frame = require('../models/frame');

var Frames = Collection.extend({
  model: Frame,

  initialize: function() {
    var i = Frames.NUM_FRAMES;

    while(i--) {
      this.push(new Frame());
    }
  }
});

Frames.NUM_FRAMES = 10;

module.exports = Frames;