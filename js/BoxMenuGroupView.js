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
    this.updateItemCount();
  }

  updateItemCount() {
    const models = this.model.getChildren().where({
      _isHidden: false
    });
    const totalChildren = models.length;
    models.forEach(model => model.set('_totalChild', totalChildren));
  }
}

BoxMenuGroupView.template = 'boxMenuGroup.jsx';
BoxMenuGroupView.childContainer = '.js-group-children';
BoxMenuGroupView.childView = BoxMenuItemView;

export default BoxMenuGroupView;
