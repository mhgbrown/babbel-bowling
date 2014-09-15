var Frame = require('../models/frame');
var Frames = require('../collections/frames');
var FramesView = require('./frames');

module.exports = Backbone.View.extend({
  el: '.alley',

  events: {
    'click button.bowl': "bowl"
  },

  /**
   * Initialize the frames collection and their corresponding view.
   */
  initialize: function() {
    this.frames = new Frames();
    this.framesView = new FramesView({collection: this.frames});
  },

  /**
   * Execute a random bowl.
   */
  bowl: function() {
    var remainingPins = this.frames.getCurrentFrame().getNumPins();
    this._bowl(Math.round(Math.random() * remainingPins));
  },

  /**
   * Execute a bowl with the given number of pins 
   * fallen.
   * @param  {Integer} pinsFelled The number of pins that should fall.
   */
  _bowl: function(pinsFelled) {
    this.frames.tally(pinsFelled);
  }
});
