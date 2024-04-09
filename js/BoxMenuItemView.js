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

  attributes() {
    const globals = Adapt.course.get('_globals');
    const ariaLabels = globals._accessibility._ariaLabels;
    const data = this.model.toJSON();
    const itemCount = globals._menu._boxMenu.itemCount;
    const ariaLabel = [
      this.model.get('_isComplete') && ariaLabels.complete,
      this.model.get('_isVisited') && ariaLabels.visited,
      this.model.get('_isOptional') && ariaLabels.optional,
      Handlebars.compile(itemCount)(data)
    ].filter(Boolean).join(' ');

    return {
      ...super.attributes(),
      role: 'link',
      'aria-label': ariaLabel
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
