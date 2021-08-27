import MenuItemView from 'core/js/views/menuItemView';

class BoxMenuItemView extends MenuItemView {

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

BoxMenuItemView.template = 'boxMenuItem';

export default BoxMenuItemView;
