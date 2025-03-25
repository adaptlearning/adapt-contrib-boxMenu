import MenuModel from 'core/js/models/menuModel';

/** @typedef {import("core/js/models/adaptModel").default} AdaptModel */

export default class BoxMenuModel extends MenuModel {

  getTypeGroup() {
    if (!this.get('_boxMenu')?._renderAsGroup) return;
    return 'group';
  }

}
