var Frame = require('../models/frame');
var template = require('./templates/frame');

module.exports = Backbone.View.extend({
  el: '.deck',

  template: template,

  /**
   * Render the pins and listen to change events on
   * the frame model.
   */
  initialize: function() {
    this.listenTo(this.model, 'change:results', this.render);
    this.render();
  },

  render: function() {
    this.$el.html(this.template({frame: this.model.toJSON()}));
    return this;
  }

});
