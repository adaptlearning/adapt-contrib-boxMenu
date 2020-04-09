define([
  "core/js/views/menuItemView",
  "./adapt-contrib-boxMenuItemView"
], function(MenuItemView, BoxMenuItemView) {

  var BoxMenuGroupView = MenuItemView.extend({

    initialize: function(options) {
      MenuItemView.prototype.initialize.call(this, options);
    },

    postRender: function() {
      _.defer(function() {
        this.addChildren();
      }.bind(this));
      this.$el.imageready(this.setReadyStatus.bind(this));
      $('.boxmenu__item-container').addClass('has-groups');
    }

  }, {
    childContainer: '.js-group-children',
    childView: BoxMenuItemView,
    className: 'boxmenu-group',
    template: 'boxMenuGroup'
  });

  return BoxMenuGroupView;

});
