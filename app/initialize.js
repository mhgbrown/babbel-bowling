require('lib/helpers');
require('routers/main');

$(function() {
  Backbone.history.start({
    pushState: true
  });
});
