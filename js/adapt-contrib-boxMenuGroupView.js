define([
  'core/js/views/menuItemView',
  './adapt-contrib-boxMenuItemView'
], function(MenuItemView, BoxMenuItemView) {

  class BoxMenuGroupView extends MenuItemView {

    get template() {
      return 'boxmenu-group';
    }

    className() {
      return 'boxMenuGroup';
    }

    postRender() {
      _.defer(this.addChildren.bind(this));
      this.$el.imageready(this.setReadyStatus.bind(this));
      this.$el.parents('.boxmenu__item-container').addClass('has-groups');
    }
  }

  BoxMenuGroupView.childContainer = '.js-group-children';
  BoxMenuGroupView.childView = BoxMenuItemView;

  return BoxMenuGroupView;

});
