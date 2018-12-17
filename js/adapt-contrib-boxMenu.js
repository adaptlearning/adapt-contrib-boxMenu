define([
  'core/js/adapt',
  'core/js/views/menuView',
  "./adapt-contrib-boxMenuItemView"
], function(Adapt, MenuView, BoxMenuItemView) {

  var BoxMenuView = MenuView.extend({

    className: function() {
      return MenuView.prototype.className.apply(this) + " boxmenu";
    },

    attributes: function() {
      return MenuView.prototype.resultExtend('attributes', {
        'role': 'main',
        'aria-labelledby': this.model.get('_id')+'-heading'
      }, this);
    },

    postRender: function() {
      var nthChild = 0;
      this.model.getChildren().each(function(item) {
        if (item.get('_isAvailable') && !item.get('_isHidden')) {
          item.set('_nthChild', ++nthChild);
          this.$('.js-children').append(new BoxMenuItemView({model: item}).$el);
        }

        if (item.get('_isHidden')) {
          item.set('_isReady', true);
        }
      });
    }

  }, {
    template: 'boxMenu'
  });

  Adapt.on('router:menu', function(model) {
    $('#wrapper').append(new BoxMenuView({model: model}).$el);
  });

});
