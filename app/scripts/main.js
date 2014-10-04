(function() {
  'use strict';

var OrderView = Backbone.View.extend({
    tagName: 'ul',
    className: 'order-list',

    initialize: function(options){
      options = options || {};
      this.$container = options.$container;
      this.$container.append(this.el);
    },

});

var FoodItemView = Backbone.View.extend({
    tagName: 'li',
    className: 'food-items',

    template: _.template($('#food-items-template').text()),

    events: {
      'click button': 'addOrderItem'
    },

    addOrderItem: function(){
      console.log(this);
    },

    initialize: function(options){
      options = options || {};
      this.$container = options.$container;
      this.$container.append(this.el);
    },

    render: function(){
      this.$el.html(this.template(this.model));
    }
});

var FoodListView = Backbone.View.extend({
    tagName: 'ul',
    className: 'food-list',

    initialize: function(options){
      options = options || {};
      this.$container = options.$container;
      this.$container.append(this.el);
    }
});

  var CategoryItemView = Backbone.View.extend({
    tagName: 'li',
    className: 'category-items',

    template: _.template('<h3><%= category %><h3>'),

    events: {
      'click': 'populateFoodList'
    },

    populateFoodList: function(options) {
      $('.food-list').empty();
      _.each(this, function(x){
        _.each(x.items, function(y){
          var foodItemView = new FoodItemView({
            model: y,
            $container: $('.food-list')
          });
          foodItemView.render();
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

    var orderView = new OrderView({
      $container: $('.order-items-container')
    });

});

}());
