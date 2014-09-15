var GameView = require('./game');

module.exports = Backbone.View.extend({
  el: 'body',

  /**
   * Start the game.
   */
  initialize: function() {
    new GameView();
  }
});
