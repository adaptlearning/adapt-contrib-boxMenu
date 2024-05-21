import Adapt from 'core/js/adapt';
import device from 'core/js/device';
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
    this.processHeader();
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

  processHeader() {
    const header = this.model.get('_boxmenu')?._menuHeader;
    if (!header) return;
    const $header = this.$('.menu__header');
    this.setHeaderTextAlignment(header);
    this.setHeaderBackgroundImage(header, $header);
    this.setHeaderMinimumHeight(header, $header);
  }

  setHeaderTextAlignment(header) {
    const textAlignment = header._textAlignment;
    if (!textAlignment) return;

    if (textAlignment._title) this.$el.addClass(`title-align-${textAlignment._title}`);
    if (textAlignment._body) this.$el.addClass(`body-align-${textAlignment._body}`);
    if (textAlignment._instruction) this.$el.addClass(`instruction-align-${textAlignment._instruction}`);
  }

  setHeaderBackgroundImage(header, $header) {
    const backgroundImages = header._backgroundImage;
    if (!backgroundImages) return;

    // add header background layer
    if ($header.find(' > .background').length) return;
    this.$headerBackground = $('<div class="background" aria-hidden="true"></div>')
      .prependTo($header);

    // add header background image
    const backgroundImage = backgroundImages[`_${device.screenSize}`] ?? backgroundImages._small;
    $header.toggleClass('has-bg-image', Boolean(backgroundImage));
    this.$headerBackground.css('background-image', backgroundImage ? 'url(' + backgroundImage + ')' : '');

    // set header background styles
    const styles = header._backgroundStyles;
    if (!styles) return;
    this.$headerBackground.css({
      'background-repeat': styles._backgroundRepeat,
      'background-size': styles._backgroundSize,
      'background-position': styles._backgroundPosition
    });
  }

  setHeaderMinimumHeight(header, $header) {
    const minimumHeights = header._minimumHeights;
    if (!minimumHeights) return;
    const minimumHeight = minimumHeights[`_${device.screenSize}`] ?? minimumHeights._small;
    $header
      .toggleClass('has-min-height', Boolean(minimumHeight))
      .css('min-height', minimumHeight ? minimumHeight + 'px' : '');
  }

}

BoxMenuView.template = 'boxMenu.jsx';

export default BoxMenuView;
