import Adapt from 'core/js/adapt';
import device from 'core/js/device';
import MenuView from 'core/js/views/menuView';
import BoxMenuItemView from './BoxMenuItemView';
import BoxMenuGroupView from './BoxMenuGroupView';

class BoxMenuView extends MenuView {

  className() {
    const backgroundImages = this.model.get('_boxmenu')?._backgroundImage;
    const backgroundImage = backgroundImages[`_${device.screenSize}`] ?? backgroundImages._small;
    const textAlignment = this.model.get('_boxmenu')?._menuHeader?._textAlignment;

    return [
      `${super.className()} boxmenu`,
      backgroundImage && 'has-bg-image',
      textAlignment._title && `title-align-${textAlignment._title}`,
      textAlignment._body && `body-align-${textAlignment._body}`,
      textAlignment._instruction && `instruction-align-${textAlignment._instruction}`
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
    this.setBackgroundImage();
  }

  setBackgroundImage() {
    const backgroundImages = this.model.get('_boxmenu')?._backgroundImage;
    if (!backgroundImages) return;

    // add background layer
    if (this.$el.find(' > .background').length) return;
    this.$background = $('<div class="background" aria-hidden="true"></div>')
      .prependTo(this.$el);

    // set background image
    const backgroundImage = backgroundImages[`_${device.screenSize}`] ?? backgroundImages._small;
    this.$el.toggleClass('has-bg-image', Boolean(backgroundImage));
    this.$background
      .css('background-image', backgroundImage ? 'url(' + backgroundImage + ')' : '');

    // set background styles
    const styles = this.model.get('_boxmenu')._backgroundStyles;
    if (!styles) return;
    this.$background.css({
      'background-repeat': styles._backgroundRepeat,
      'background-size': styles._backgroundSize,
      'background-position': styles._backgroundPosition
    });
  }

}

BoxMenuView.template = 'boxMenu.jsx';

export default BoxMenuView;
