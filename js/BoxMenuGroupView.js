import MenuItemView from 'core/js/views/menuItemView';
import BoxMenuItemView from './BoxMenuItemView';

class BoxMenuGroupView extends MenuItemView {

  className() {
    return `${super.className()} boxmenu-group`;
  }

  postRender() {
    _.defer(this.addChildren.bind(this));
    this.$el.imageready(this.setReadyStatus.bind(this));
    this.$el.parents('.boxmenu__item-container').addClass('has-groups');
  }
}

BoxMenuGroupView.template = 'boxMenuGroup';
BoxMenuGroupView.childContainer = '.js-group-children';
BoxMenuGroupView.childView = BoxMenuItemView;

export default BoxMenuGroupView;
