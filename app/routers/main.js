var AppRouter = Backbone.Router.extend({
  routes: {
    '*path': 'index'
  },

  index: function() {
    var AppView = require('views/app');
    this.appView = new AppView();
  }
});

AppRouter = new AppRouter();
module.exports = AppRouter;
