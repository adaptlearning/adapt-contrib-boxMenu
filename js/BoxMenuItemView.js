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
    // Use inherited getPriorityLabels() from AdaptView
    const priorityData = this.getPriorityLabels();
    if (priorityData) {
      this.model.set(priorityData);
    }
  }

  onClickMenuItemButton(event) {
    if (event && event.preventDefault) event.preventDefault();
    if (this.model.get('_isLocked')) return;
    router.navigateToElement(this.model.get('_id'));
  }
}

BoxMenuItemView.template = 'boxMenuItem.jsx';

export default BoxMenuItemView;
