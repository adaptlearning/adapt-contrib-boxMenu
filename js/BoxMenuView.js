import Adapt from 'core/js/adapt';
import MenuView from 'core/js/views/menuView';
import BoxMenuItemView from './BoxMenuItemView';
import BoxMenuGroupView from './BoxMenuGroupView';

class BoxMenuView extends MenuView {

  className() {
    return `${super.className()} boxmenu`;
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
    const childViews = [];
    models.forEach(model => {
      if (!model.get('_isAvailable')) return;

      if (model.get('_isHidden')) {
        model.set('_isReady', true);
        return;
      }

      nthChild++;
      model.set('_nthChild', nthChild);

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
    this.setBackgroundStyles();
    this.processHeader();
  }

  setBackgroundImage() {
    const config = this.model.get('_boxMenu');
    const backgroundImages = config?._backgroundImage;
    if (!backgroundImages) return;
    const backgroundImage = backgroundImages[`_${Adapt.device.screenSize}`] ?? backgroundImages._small;
    this.$el
      .toggleClass('has-bg-image', Boolean(backgroundImage))
      .css('background-image', backgroundImage ? 'url(' + backgroundImage + ')' : '');
  }

  setBackgroundStyles() {
    const config = this.model.get('_boxMenu');
    const styles = config?._backgroundStyles;
    if (!styles) return;
    this.$el.css({
      'background-repeat': styles._backgroundRepeat,
      'background-size': styles._backgroundSize,
      'background-position': styles._backgroundPosition
    });
  }

  processHeader() {
    const config = this.model.get('_boxMenu');
    const header = config?._menuHeader;

    if (!header) return;

    const $header = this.$('.menu__header');

    this.setHeaderBackgroundImage(header, $header);
    this.setHeaderBackgroundStyles(header, $header);
    this.setHeaderMinimumHeight(header, $header);
  }

  setHeaderBackgroundImage(config, $header) {
    const backgroundImages = config._backgroundImage;
    if (!backgroundImages) return;
    const backgroundImage = backgroundImages[`_${Adapt.device.screenSize}`] ?? backgroundImages._small;
    $header
      .toggleClass('has-bg-image', Boolean(backgroundImage))
      .css('background-image', backgroundImage ? 'url(' + backgroundImage + ')' : '');
  }

  setHeaderBackgroundStyles(config, $header) {
    const styles = config._backgroundStyles;

    if (!styles) return;

    $header.css({
      'background-repeat': styles._backgroundRepeat,
      'background-size': styles._backgroundSize,
      'background-position': styles._backgroundPosition
    });
  }

  setHeaderMinimumHeight(config, $header) {
    const minimumHeights = config._minimumHeights;
    if (!minimumHeights) return;
    const minimumHeight = minimumHeights[`_${Adapt.device.screenSize}`] ?? minimumHeights._small;
    $header
      .toggleClass('has-min-height', Boolean(minimumHeight))
      .css('min-height', minimumHeight ? minimumHeight + 'px' : '');
  }

}

BoxMenuView.template = 'boxMenu';

export default BoxMenuView;
