var Frame = require('../models/frame');

var Frames = Backbone.Collection.extend({
  model: Frame,

  /**
   * Initialize the collection with 10 frames. Set the last
   * one to be extendable.
   */
  initialize: function() {
    var i = Frames.NUM_FRAMES;

    while(i--) {
      this.push(new Frame());
    }

    this.at(Frames.NUM_FRAMES - 1).set('extendable', true);
    this.currentFrameIndex = 0;
  },

  /**
   * Get the current frame in play.
   */
  getCurrentFrame: function() {
    return this.at(this.currentFrameIndex);
  },

  /**
   * Adjust other frame scores according to 
   * spare rules.
   */
  handleSpare: function() {
    var currentFrame = this.getCurrentFrame(),
      lastFrame = this.at(this.currentFrameIndex - 1);

    if(!lastFrame) {
      return;
    }

    if(lastFrame.isSpare()) {
      lastFrame.set('total', lastFrame.get('total') + currentFrame.get('results')[0]);
    }
  },

  /**
   * Adjust other frame scores according to strike
   * rules.
   */
  handleStrike: function() {
    var currentFrame = this.getCurrentFrame(),
      lastFrame = this.at(this.currentFrameIndex - 1),
      lastLastFrame = this.at(this.currentFrameIndex - 2);

    if(!lastFrame) {
      return;
    }

    if(lastFrame.isStrike()) {
      lastFrame.set('total', lastFrame.get('total') + currentFrame.getTotal());

      if(lastLastFrame && lastLastFrame.isStrike() && this.currentFrameIndex !== Frames.NUM_FRAMES - 1) {
        lastLastFrame.set('total', lastLastFrame.get('total') + currentFrame.get('results')[0]);
      }
    }
  },

  /**
   * Score and advance the game with the given number
   * of felled pins.
   * @param  {Integer} pinsFelled The number of pins knocked down.
   */
  tally: function(pinsFelled) {
    var currentFrame = this.getCurrentFrame();
    currentFrame.set('played', true);
    currentFrame.tally(pinsFelled);

    if(currentFrame.isClosed()) {
      this.handleSpare();
      this.handleStrike();

      this.currentFrameIndex += 1;
      this.trigger('new-frame');
    }
  },

  /**
   * Get the total score for all the frames.
   * @return {Integer} The total score.
   */
  getTotalScore: function() {
    return _.reduce(this.models, function(memo, frame) {
      return memo + frame.get('total');
    }, 0);
  }
});

Frames.NUM_FRAMES = 10;
module.exports = Frames;