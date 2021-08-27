import MenuItemView from 'core/js/views/menuItemView';
import BoxMenuItemView from './adapt-contrib-boxMenuItemView';

class BoxMenuGroupView extends MenuItemView {

  static childContainer() {
    return '.js-group-children';
  }

  static childView() {
    return BoxMenuItemView;
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
BoxMenuGroupView.template = 'boxmenu-group';

export default BoxMenuGroupView;
