import Adapt from 'core/js/adapt';
import MenuItemView from 'core/js/views/menuItemView';
import router from 'core/js/router';

class BoxMenuItemView extends MenuItemView {

  className() {
    return `${super.className()} boxmenu-item`;
  }

  events() {
    return {
      'click .js-btn-click': 'onClickMenuItemButton'
    };
  }

  initialize(...args) {
    super.initialize(...args);
    this.setUpViewData();
  }

  setUpViewData() {
    const _globals = Adapt.course.get('_globals');
    const _boxMenu = Adapt.course.get('_boxMenu');
    const _priorityLabels = _boxMenu?._priorityLabels;
    const _isOptional = this.model.get('_isOptional');

    const optionalLabel = _globals?._accessibility?._ariaLabels?.optional;
    const requiredLabel = _globals?._accessibility?._ariaLabels?.required;

    const showPriorityWhenOptional = _priorityLabels?._showPriorityWhenOptional && _isOptional && optionalLabel;
    const showPriorityWhenRequired = _priorityLabels?._showPriorityWhenRequired && !_isOptional && requiredLabel;

    this.model.set({
      showPriority: showPriorityWhenOptional || showPriorityWhenRequired,
      priorityClass: _isOptional ? 'is-optional' : 'is-required',
      priorityLabel: _isOptional ? optionalLabel : requiredLabel
    });
  }

  onClickMenuItemButton(event) {
    if (event && event.preventDefault) event.preventDefault();
    if (this.model.get('_isLocked')) return;
    router.navigateToElement(this.model.get('_id'));
  }
}

BoxMenuItemView.template = 'boxMenuItem.jsx';

export default BoxMenuItemView;
