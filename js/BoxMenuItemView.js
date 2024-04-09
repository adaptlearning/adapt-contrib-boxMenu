import MenuItemView from 'core/js/views/menuItemView';
import Adapt from 'core/js/adapt';
import router from 'core/js/router';

class BoxMenuItemView extends MenuItemView {

  className() {
    return [
      super.className(),
      'boxmenu-item',
      this.areEntireItemsClickable && 'is-entire-item-clickable'
    ].filter(Boolean).join(' ');
  }

  events() {
    return {
      'click .js-btn-click': 'onClickMenuItemButton'
    };
  }

  onClickMenuItemButton(event) {
    if (event && event.preventDefault) event.preventDefault();
    if (this.model.get('_isLocked')) return;
    router.navigateToElement(this.model.get('_id'));
  }

  get areEntireItemsClickable() {
    return Adapt.course.get('_boxMenu')?._areEntireItemsClickable;
  }
}

BoxMenuItemView.template = 'boxMenuItem';

export default BoxMenuItemView;
