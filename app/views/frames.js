var Frames = require('../collections/frames');
var FrameView = require('../views/frame');
var template = require('./templates/frames');
var gameOverTemplate = require('./templates/game-over');

module.exports = Backbone.View.extend({
  el: '.scoreboard',

  template: template,

  gameOverTemplate: gameOverTemplate,

  /**
   * Initialize the individual frame view and listen to 
   * change events on the frames collection.
   */
  initialize: function() {
    this.$alley = $('.alley');
    this.$bowlButton = $('.bowl', this.$alley);
    this.currentFrameView = new FrameView({model: this.collection.getCurrentFrame()});
    this.listenTo(this.collection, 'change:total', this.render);
    this.listenTo(this.collection, 'new-frame', this.newFrame);
    this.render();
  },

  render: function() {
    this.$el.html(this.template({frames: this.collection.toJSON()}));
    return this;
  },

  newFrame: function() {
    var self = this,
      currentFrame = this.collection.getCurrentFrame();

    if(!currentFrame){
      this.$alley.html(this.gameOverTemplate({score: this.collection.getTotalScore()}));
    } else {
      // let the user see the last roll and kind of 
      // imitate the resetting of the pins
      this.$bowlButton.prop('disabled', true);
      setTimeout(function() {
        self.currentFrameView = new FrameView({model: self.collection.getCurrentFrame()});
        self.$bowlButton.prop('disabled', false);
      }, 500);
      
    }
  }

});
