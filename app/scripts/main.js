(function() {
  'use strict';

var OrderModel = Backbone.Model.extend({
    defaults: {
      title: 'Order Complete',
      price: 'Order Complete'
    },
    firebase: new Backbone.Firebase("https://majestic-thai.firebaseio.com")
});

var OrderCollection = Backbone.Firebase.Collection.extend({
    model: OrderModel,
    firebase: "https://majestic-thai.firebaseio.com/orders/" + Date.now(),

    totalPrice: function(){
      return this.reduce(function(total, model){
        return total + model.get('price');
      }, 0);
    }
});

var SubmitOrderView = Backbone.View.extend({
    className: 'order-submit',

    events: {
      'click button': 'submitOrder',
    },

    submitOrder: function(){
      this.collection.create();
      alert('Thank you for your order!');
      document.location.reload(true);
    },

    template: _.template($('#your-order-template').text()),

    initialize: function(options){
      options = options || {};
      this.$container = options.$container;
      this.$container.prepend(this.el);
    },

    render: function(){
      this.$el.html(this.template(this.model));
    }
});

var OrderItemView = Backbone.View.extend({
    tagName: 'li',
    className: 'order-item',
    events: {
      'click button': 'removeItem'
    },

    removeItem: function(){
      console.log(this.model);
      this.model.destroy();
    },

    template: _.template($('#order-items-template').text()),

    initialize: function(options){
      options = options || {};
      this.$container = options.$container;
      this.$container.append(this.el);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function(){
      this.$el.html(this.template(this.model.attributes));
    }
});

var OrderView = Backbone.View.extend({
    tagName: 'ul',
    className: 'order-list',

    initialize: function(options){
      options = options || {};
      this.$container = options.$container;
      this.$container.append(this.el);
      this.listenTo(this.collection, 'add', this.renderChild);
    },

    renderChild: function(food){
      var orderItemView = new OrderItemView({
        model: food,
        $container: $('.order-list'),
        collection: this.collection,
      });
      orderItemView.render();

    }

});

var FoodItemView = Backbone.View.extend({
    tagName: 'li',
    className: 'food-items',

    template: _.template($('#food-items-template').text()),

    events: {
      'click button': 'addOrderItem'
    },

    addOrderItem: function(){
      window.order = new OrderModel({title: this.model.title, price: this.model.price});
      this.collection.add(order);
      console.log(this.collection);
      // console.log(this.model);
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
      $('.clear').empty();
      _.each(this, function(x){
        _.each(x.items, function(y){
          var foodItemView = new FoodItemView({
            model: y,
            $container: $('.food-list'),
            collection: orderCollection
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
    window.orderCollection = new OrderCollection();

    var categoriesView = new CategoriesView({
      $container: $('.categories-container')
    });
        categoriesView.render();
    var foodListView = new FoodListView({
      $container: $('.food-items-container')
    });

    var orderView = new OrderView({
      $container: $('.order-items-container'),
      collection: orderCollection
    });

    var submitOrderView = new SubmitOrderView({
      $container: $('.order-items-container'),
      collection: orderCollection
    });
    submitOrderView.render();
});

}());
