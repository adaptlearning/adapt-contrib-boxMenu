define([
  'core/js/adapt',
  'core/js/views/menuView',
  "./adapt-contrib-boxMenuItemView"
], function(Adapt, MenuView, BoxMenuItemView) {

  var BoxMenuView = MenuView.extend({

    initialize: function() {
      MenuView.prototype.initialize.apply(this);
      this.processHeader();

      this.listenTo(Adapt, {
        "device:resize": this.onDeviceResize
      });
    },

    onDeviceResize: function() {
      this.processHeader();
    },

    processHeader: function() {
      var config = this.model.get('_boxMenu');
      var header = config && config._menuHeader;

      if (!header) return;

      var $header = this.$('.menu__header');

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

      if (backgroundImage) {
        $element
          .addClass("has-bg-image")
          .css("background-image", "url(" + backgroundImage + ")");
      } else {
        $element
          .removeClass("has-bg-image")
          .css("background-image", "");
      }
    },

    setElementMinHeight: function(config, $element) {
      var minimumHeights = config._minimumHeights;

      if (!minimumHeights) return;

      var minimumHeight;

      switch (Adapt.device.screenSize) {
        case "large":
          minimumHeight = minimumHeights._large;
          break;
        case "medium":
          minimumHeight = minimumHeights._medium;
          break;
        default:
          minimumHeight = minimumHeights._small;
      }

      if (minimumHeight) {
        $element
          .addClass("has-min-height")
          .css("min-height", minimumHeight + "px");
      } else {
        $element
          .removeClass("has-min-height")
          .css("min-height", "");
      }
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
