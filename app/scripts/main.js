(function() {
  'use strict';

var FoodItemView = Backbone.View.extend({
    tagName : 'li',

    initialize: function(options){
      options = options || {};
      this.$container = options.$container;
      this.$container.append(this.el);
    }
});

var FoodListView = Backbone.View.extend({
    tagName: 'ul',
    className: 'food-list',

    initialize: function(options){
      options = options || {};
      this.$container = options.$container;
      this.$container.append(this.el);
    },

});

  var CategoryItemView = Backbone.View.extend({
    tagName: 'li',

    template: _.template('<%= category %>'),

    events: {
      'click': 'populateFoodList'
    },

    populateFoodList: function(options) {
      console.log(this);
      _.each(this, function(x){
        _.each(x.items, function(y){
            console.log(y);
        });
      });
    },

    initialize: function(options){
      options = options || {};
      this.$container = options.$container;
      this.$container.append(this.el);
    },

    render: function(item) {
      this.$el.html(this.template(this.model));
    },
  });

  var CategoriesView = Backbone.View.extend({
    tagName: 'ul',
    className: 'categories-list',

    initialize: function(options){
    options = options || {};
    this.$container = options.$container;
    this.$container.append(this.el);

  },

  renderChild: function(category){
    var categoryItemView = new CategoryItemView({
      $container: this.$el,
      model: category
    });
    categoryItemView.render();
  },

  render: function() {
    var self = this;
    _.each(menu, function(category){
      self.renderChild(category);
    });

  }

});

$(document).ready(function() {
var categoriesView = new CategoriesView({
  $container: $('.categories-container')
});
    categoriesView.render();
var foodListView = new FoodListView({
  $container: $('.food-items-container')
});



});



}());
