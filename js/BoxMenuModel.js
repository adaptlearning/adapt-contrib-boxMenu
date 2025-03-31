import MenuModel from 'core/js/models/menuModel';

export default class BoxMenuModel extends MenuModel {

  getTypeGroup() {
    if (!this.get('_boxMenu')?._renderAsGroup) return;
    return 'group';
  }

}
