import Adapt from 'core/js/adapt';
import MenuModel from 'core/js/models/menuModel';
import MenuView from 'core/js/views/menuView';
import BoxMenuItemView from './adapt-contrib-boxMenuItemView';
import BoxMenuGroupView from './adapt-contrib-boxMenuGroupView';

class BoxMenuView extends MenuView {

  className() {
    return 'boxmenu';
  }

  initialize() {
    super.initialize();
    this.setStyles();

    this.listenTo(Adapt, {
      'device:changed': this.onDeviceResize
    });
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

      nthChild++;
      model.set('_nthChild', nthChild);

      const ChildView = (model.get('_type') === 'menu' && model.get('_boxMenu') && model.get('_boxMenu')._renderAsGroup) ?
        BoxMenuGroupView :
        BoxMenuItemView;

      const $parentContainer = this.$(this.constructor.childContainer);
      const childView = new ChildView({ model: model });

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
    const backgroundImages = config && config._backgroundImage;

    if (!backgroundImages) return;

    let backgroundImage;

    switch (Adapt.device.screenSize) {
      case 'large':
        backgroundImage = backgroundImages._large;
        break;
      case 'medium':
        backgroundImage = backgroundImages._medium;
        break;
      default:
        backgroundImage = backgroundImages._small;
    }

    if (backgroundImage) {
      this.$el
        .addClass('has-bg-image')
        .css('background-image', 'url(' + backgroundImage + ')');
      return;
    }
    this.$el
      .removeClass('has-bg-image')
      .css('background-image', '');
  }

  setBackgroundStyles() {
    const config = this.model.get('_boxMenu');
    const styles = config && config._backgroundStyles;

    if (!styles) return;

    this.$el.css({
      'background-repeat': styles._backgroundRepeat,
      'background-size': styles._backgroundSize,
      'background-position': styles._backgroundPosition
    });
  }

  processHeader() {
    const config = this.model.get('_boxMenu');
    const header = config && config._menuHeader;

    if (!header) return;

    const $header = this.$('.menu__header');

    this.setHeaderBackgroundImage(header, $header);
    this.setHeaderBackgroundStyles(header, $header);
    this.setHeaderMinimumHeight(header, $header);
  }

  setHeaderBackgroundImage(config, $header) {
    const backgroundImages = config._backgroundImage;

    if (!backgroundImages) return;

    let backgroundImage;

    switch (Adapt.device.screenSize) {
      case 'large':
        backgroundImage = backgroundImages._large;
        break;
      case 'medium':
        backgroundImage = backgroundImages._medium;
        break;
      default:
        backgroundImage = backgroundImages._small;
    }

    if (backgroundImage) {
      $header
        .addClass('has-bg-image')
        .css('background-image', 'url(' + backgroundImage + ')');
      return;
    }
    $header
      .removeClass('has-bg-image')
      .css('background-image', '');
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

    let minimumHeight;

    switch (Adapt.device.screenSize) {
      case 'large':
        minimumHeight = minimumHeights._large;
        break;
      case 'medium':
        minimumHeight = minimumHeights._medium;
        break;
      default:
        minimumHeight = minimumHeights._small;
    }

    if (minimumHeight) {
      $header
        .addClass('has-min-height')
        .css('min-height', minimumHeight + 'px');
      return;
    }
    $header
      .removeClass('has-min-height')
      .css('min-height', '');
  }

}

BoxMenuView.template = 'boxMenu';

// Use as default "_type": "course" or "_type": "menu" view.
// Note: This is necessary to maintain legacy behaviour in the AAT where
// only one menu is usable per course and the course / menu is assumed to be
// a core model and use the only installed MenuView.
Adapt.register('course menu', {
  view: BoxMenuView
});

// Use for "_component": "boxMenu", or "_view": "boxMenu" and "_model": "boxMenu"
Adapt.register('boxMenu', {
  view: BoxMenuView,
  model: MenuModel.extend({})
});

export default BoxMenuView;
