var Frame = Backbone.Model.extend({
  defaults: function() {
    return {
      results: [],
      total: 0,
      played: false,
      extendable: false
    };
  },

  initialize: function() {
    this.frameLength = Frame.DEFAULT_LENGTH;
  },

  /**
   * Score this frame according to a number of
   * fallen pins.
   * @param  {Integer} pinsFelled The number of pins fallen
   */
  tally: function(pinsFelled) {
    var results = this.get('results');

    if(!this.isClosed()) {
      results.push(pinsFelled);
      this.set('total', this.getTotal());
      this.trigger('change:total', this, this.get('total'));
      this.trigger('change:results', this, results);
    }

    if(this.get('extendable')) {
      this.extendIfNeeded();
    }
  },

  /**
   * Determine if this frame has been played out.
   * @return {Boolean} True if the frame doesn't support any more bowls.
   */
  isClosed: function() {
    return (!this.get('extendable') && (this.isStrike() || this.get('results').length === this.frameLength)) ||
      (this.get('extendable') && this.get('results').length === this.frameLength);
  },

  /**
   * Determine if this frame is a strike frame.
   * @return {Boolean} True if this is a strike frame.
   */
  isStrike: function() {
    return this.get('results')[0] === 10;
  },

  /**
   * Determin if this frame is a spare frame.
   * @return {Boolean} True if the second bowl eliminated all the pins.
   */
  isSpare: function() {
    var results = this.get('results');
    return results[0] < 10 && results[0] + results[1] === 10;
  },

  /**
   * Count the total score for this frame
   * @return {Integer} The score for this frame.
   */
  getTotal: function() {
    return _.reduce(this.get('results'), function(memo, num) {
      return memo + num;
    }, 0);
  },

  /**
   * Get the number of pins that should be displayed.
   * @return {Integer} The number of pins left
   */
  getNumPins: function() {
    var results = this.get('results');
    return Frame.NUM_PINS - (this.getTotal());
  },

  /**
   * Extend this frame to 3 play slots if it's extendable.
   * Used for final frame.
   */
  extendIfNeeded: function() {
    if(this.isSpare() || this.isStrike()){
      this.frameLength = 3;
    }
  },

  /**
   * Get a formatted representation of the score
   * results for this frame.
   * @return {String} A formatted representation of this frame's score.
   */
  formattedResults: function() {
    var out = '',
      played = this.get('played'),
      results = this.get('results'),
      remainder;

    if(!played) {
      return out;
    }

    out += results[0] === 10 ? 'X' : results[0] + ' ';

    if(this.isStrike() && !this.get('extendable')) {
      return out;
    }

    if(this.isSpare()) {
      out += '/';
    } else if (results[1] === 0) {
      out += "-";
    } else {
      out += results[1] === undefined ? ' ' : results[1];
    }

    out += _.reduce(results.slice(2), function(memo, result){
      return memo + result + ' ';
    }, '');

    return out;
  },

  /**
   * Get a formatted representation of this frame's total score.
   * @return {String} The total representation.
   */
  formattedTotal: function() {
    return !this.get('played') ? '' : this.get('total');
  },

  /** 
   * Override the default toJSON method to include
   * formatted representations of certain frame
   * characteristics.
   * @return {Object} A JSON representation of this frame.
   */
  toJSON: function(options) {
    var props = _.clone(this.attributes);
    props.results = this.formattedResults();
    props.total = this.formattedTotal();
    props.numPins = this.getNumPins();

    return props;
  }
});

Frame.NUM_PINS = 10;
Frame.DEFAULT_LENGTH = 2;
module.exports = Frame;