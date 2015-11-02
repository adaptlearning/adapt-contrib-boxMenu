define([
    'coreJS/adapt',
    'coreViews/menuView'
], function(Adapt, MenuView) {

    var BoxMenuView = MenuView.extend({

        preRender: function() {
            try {
                var objMenuStepLockingOptions = this.model.get( '_globals' )._menu._boxmenu._stepLocking;

                if( objMenuStepLockingOptions._isEnabled === true ) {
                    switch( objMenuStepLockingOptions._style ) {
                        case "sequential":
                            this.lockItemsAfterCurrent();
                            break;
                    }
                }
            } catch( e ) {
                // Some older courses may not set step locking options
            }

            MenuView.prototype.preRender.apply( this, arguments );
        },

        lockItemsAfterCurrent: function() {
            var blLock = false;

            this.model.getChildren().each(
                function( objMenuItem ) {
                    objMenuItem.set( '_isLocked', blLock );

                    if( !objMenuItem.get( '_isComplete' ) ) {
                        blLock = true;
                    }
                }
            );
        },

        postRender: function() {
            var nthChild = 0;
            this.model.getChildren().each(function(item) {
                if (item.get('_isAvailable')) {
                    nthChild++;
                    item.set("_nthChild", nthChild);
                    this.$('.menu-container-inner').append(new BoxMenuItemView({model: item}).$el);
                }
            });
        }

    }, {
        template: 'boxmenu'
    });

    var BoxMenuItemView = MenuView.extend({

        events: {
            'click button' : 'onClickMenuItemButton'
        },

        className: function() {
            var nthChild = this.model.get("_nthChild");
            return [
                'menu-item',
                'menu-item-' + this.model.get('_id') ,
                this.model.get('_isLocked') ? 'locked' : 'unlocked',
                this.model.get('_classes'),
                'nth-child-' + nthChild,
                nthChild % 2 === 0 ? 'nth-child-even' : 'nth-child-odd'
            ].join(' ');
        },

        preRender: function() {
            this.model.checkCompletionStatus();
            this.model.checkInteractionCompletionStatus();
        },

        postRender: function() {
            var graphic = this.model.get('_graphic');
            if (graphic && graphic.src && graphic.src.length > 0) {
                this.$el.imageready(_.bind(function() {
                    this.setReadyStatus();
                }, this));
            } else {
                this.setReadyStatus();
            }
        },

        onClickMenuItemButton: function(event) {
            if(event && event.preventDefault) event.preventDefault();
            Backbone.history.navigate('#/id/' + this.model.get('_id'), {trigger: true});
        }

    }, {
        template: 'boxmenu-item'
    });

    Adapt.on('router:menu', function(model) {

        $('#wrapper').append(new BoxMenuView({model: model}).$el);

    });

});
