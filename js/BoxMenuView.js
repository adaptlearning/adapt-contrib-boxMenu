import Adapt from 'core/js/adapt';
import device from 'core/js/device';
import MenuView from 'core/js/views/menuView';
import BoxMenuItemView from './BoxMenuItemView';
import BoxMenuGroupView from './BoxMenuGroupView';

class BoxMenuView extends MenuView {

  className() {
    const backgroundImages = this.model.get('_boxmenu')?._backgroundImage;
    const backgroundImage = backgroundImages[`_${device.screenSize}`] ?? backgroundImages._small;

    return [
      `${super.className()} boxmenu`,
      backgroundImage && 'has-bg-image'
    ].join(' ');
  }

  initialize() {
    super.initialize();
    this.setStyles();

    this.listenTo(Adapt, 'device:changed', this.onDeviceResize);
  }

  onDeviceResize() {
    this.setStyles();
  }

  addChildren() {
    let nthChild = 0;
    const models = this.model.getChildren().models;
    const totalChild = this.model.getChildren().where({
      _isHidden: false
    }).length;

    const childViews = [];
    models.forEach(model => {
      if (!model.get('_isAvailable')) return;

      if (model.get('_isHidden')) {
        model.set('_isReady', true);
        return;
      }

      nthChild++;
      model.set({
        _nthChild: nthChild,
        _totalChild: totalChild,
        _isRendered: true
      });

      const ChildView = (model.get('_type') === 'menu' && model.get('_boxMenu') && model.get('_boxMenu')._renderAsGroup) ?
        BoxMenuGroupView :
        BoxMenuItemView;

      const $parentContainer = this.$(this.constructor.childContainer);
      const childView = new ChildView({ model });

      childViews.push(childView);

      $parentContainer.append(childView.$el);
    });

    this.setChildViews(childViews);
  }

  setStyles() {
    this.processHeader();
  }

  processHeader() {
    const header = this.model.get('_boxmenu')?._menuHeader;
    if (!header) return;
    this.setHeaderTextAlignment(header);
  }

  setHeaderTextAlignment(header) {
    const textAlignment = header._textAlignment;
    if (!textAlignment) return;

    if (textAlignment._title) this.$el.addClass(`title-align-${textAlignment._title}`);
    if (textAlignment._body) this.$el.addClass(`body-align-${textAlignment._body}`);
    if (textAlignment._instruction) this.$el.addClass(`instruction-align-${textAlignment._instruction}`);
  }

}

BoxMenuView.template = 'boxMenu.jsx';

export default BoxMenuView;
