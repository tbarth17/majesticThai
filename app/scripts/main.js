(function() {
  'use strict';

  var CategoryItemView = Backbone.View.extend({
    tagName: 'li',
    model: window.menu,

    template: _.template($(".whatever").text()),

    initialize: function(options){
      options = options || {};

    },

    render: function(item) {
      this.$el.html(this.template(this.model.attributes));
    }


  });

  var CategoriesView = Backbone.View.extend({
    tagName: 'ul',
    className: 'categories-list',

    initialize: function(options){
    options = options || {};
    this.$container = options.$container;
    this.$container.append(this.el);

  },

  renderChild: function(book){
    var categoryItemView = new CategoryItemView({
      $container: this.$el,
      model: window.menu
      });
    categoryItemView.render();
  },

    render: function() {
      // this.el.empty();
      window.items = _.each(menu, function(item){
        console.log(item.category);
      });
  }

});

$(document).ready(function() {
var categoriesView = new CategoriesView({
  $container: $('.categories-container')
});
    categoriesView.render();


});



}());
