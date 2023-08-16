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
    let nthChild = 0;
    const models = this.model.getChildren().models;
    models.forEach(model => {
      nthChild++;
      model.set({
        _nthChild: nthChild,
        _totalChild: models.length
      });
    });
  }
}

BoxMenuGroupView.template = 'boxMenuGroup';
BoxMenuGroupView.childContainer = '.js-group-children';
BoxMenuGroupView.childView = BoxMenuItemView;

export default BoxMenuGroupView;
