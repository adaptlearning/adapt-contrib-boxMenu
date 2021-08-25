define([
  'core/js/views/menuItemView'
], function(MenuItemView) {

  class BoxMenuItemView extends MenuItemView {

    get template() {
      return 'boxMenuItem';
    }

    className() {
      return 'boxmenu-item';
    }

    events() {
      return {
        'click .js-btn-click': 'onClickMenuItemButton'
      };
    }

    onClickMenuItemButton(event) {
      if (event && event.preventDefault) event.preventDefault();
      if (this.model.get('_isLocked')) return;
      Backbone.history.navigate('#/id/' + this.model.get('_id'), { trigger: true });
    }
  }

  return BoxMenuItemView;

});
