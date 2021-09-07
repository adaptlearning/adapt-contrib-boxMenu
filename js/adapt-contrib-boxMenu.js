import Adapt from 'core/js/adapt';
import MenuModel from 'core/js/models/menuModel';
import BoxMenuView from './BoxMenuView';

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
