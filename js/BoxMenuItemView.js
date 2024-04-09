import MenuItemView from 'core/js/views/menuItemView';
import Adapt from 'core/js/adapt';
import router from 'core/js/router';

class BoxMenuItemView extends MenuItemView {

  className() {
    return [
      super.className(),
      'boxmenu-item',
      this.areEntireItemsClickable() && 'is-entire-item-clickable'
    ].filter(Boolean).join(' ');
  }

  events() {
    if (this.areEntireItemsClickable()) {
      return {
        click: 'onClickMenuItemButton'
      };
    }

    return {
      'click .js-btn-click': 'onClickMenuItemButton'
    };
  }

  attributes() {
    const globals = Adapt.course.get('_globals');
    const ariaLabel = [];

    if (this.model.get('_isComplete')) {
      ariaLabel.push(globals._accessibility._ariaLabels.complete);
    }

    if (this.model.get('_isVisited')) {
      ariaLabel.push(globals._accessibility._ariaLabels.visited);
    }

    if (this.model.get('_isOptional')) {
      ariaLabel.push(globals._accessibility._ariaLabels.optional);
    }

    const data = this.model.toJSON();
    const itemCount = Handlebars.compile(globals._menu._boxMenu.itemCount)(data);
    ariaLabel.push(itemCount);

    const parentAttributes = Object.getPrototypeOf(BoxMenuItemView.prototype).attributes.call(this);

    return {
      ...parentAttributes,
      role: 'link',
      'aria-label': ariaLabel.join(' ')
    };
  }

  onClickMenuItemButton(event) {
    if (event && event.preventDefault) event.preventDefault();
    if (this.model.get('_isLocked')) return;
    router.navigateToElement(this.model.get('_id'));
  }

  areEntireItemsClickable() {
    console.log(this.model);
    return Adapt.course.get('_boxMenu')?._areEntireItemsClickable;
  }
}

BoxMenuItemView.template = 'boxMenuItem';

export default BoxMenuItemView;
