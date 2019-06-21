define([
  'core/js/adapt',
  'core/js/views/menuView',
  "./adapt-contrib-boxMenuItemView"
], function(Adapt, MenuView, BoxMenuItemView) {

  var BoxMenuView = MenuView.extend({

    postRender: function() {
      MenuView.prototype.postRender.apply(this);
      this.processHeader();
    },

    processHeader: function() {
      var header = this.model.get('_boxMenu')._menuHeader;
      var $header = this.$('.menu__header');

      if (!header) return;

      this.setElementBackground(header, $header);
      this.setElementMinHeight(header, $header);
    },

    setElementBackground: function(config, $element) {
      var backgroundImages = config._backgroundImage;

      if (!backgroundImages) return;

      var backgroundImage;

      switch (Adapt.device.screenSize) {
        case "large":
          backgroundImage = backgroundImages._large;
          break;
        case "medium":
          backgroundImage = backgroundImages._medium;
          break;
        default:
          backgroundImage = backgroundImages._small;
      }

      if (!backgroundImage) return;

      $element
        .addClass("has-bg-image")
        .css("background-image", "url(" + backgroundImage + ")");
    },

    setElementMinHeight: function(config, $element) {
      var minHeights = config._minHeight;

      if (!minHeights) return;

      var minHeight;

      switch (Adapt.device.screenSize) {
        case "large":
          minHeight = minHeights._large;
          break;
        case "medium":
          minHeight = minHeights._medium;
          break;
        default:
          minHeight = minHeights._small;
      }

      if (!minHeight) return;

      $element
        .addClass('has-min-height')
        .css("min-height", minHeight + "px");
    }

  }, {
    childView: BoxMenuItemView,
    className: 'boxmenu',
    template: 'boxMenu'
  });

  Adapt.on('router:menu', function(model) {
    $('#wrapper').append(new BoxMenuView({model: model}).$el);
  });

});
