import { describe, getCourse, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin, testStopWhere, testSuccessWhere } from 'adapt-migrations';
import _ from 'lodash';

function getBoxMenus(content) {
  return content.filter(({ _type, _component }) =>
    (_type === 'menu' || _type === 'course') &&
    (!_component || _component === 'boxMenu'));
}

describe('Box menu - v6.0.2 to v6.1.0', async () => {

  // https://github.com/adaptlearning/adapt-contrib-boxMenu/compare/v6.0.2..v6.1.0

  let menusWithHeaders;
  const defaultTextAlignment = {
    _title: '',
    _body: '',
    _instruction: ''
  };

  whereFromPlugin('Box menu - from v6.0.2', { name: 'adapt-contrib-boxMenu', version: '<6.1.0' });

  whereContent('Box menu - where menus have _menuHeader', async (content) => {
    menusWithHeaders = getBoxMenus(content).filter(({ _boxMenu }) => _boxMenu?._menuHeader);
    return menusWithHeaders.length;
  });

  mutateContent('Box menu - add _textAlignment attribute', async (content) => {
    menusWithHeaders.forEach(({ _boxMenu }) => (_boxMenu._menuHeader._textAlignment = defaultTextAlignment));
    return true;
  });

  checkContent('Box menu - check _textAlignment attribute', async (content) => {
    const isValid = menusWithHeaders.every(({ _boxMenu }) => _.isEqual(_boxMenu._menuHeader._textAlignment, defaultTextAlignment));
    if (!isValid) throw new Error('Box menu - course attribute _textAlignment');
    return true;
  });

  updatePlugin('Box menu - update to v6.1.0', { name: 'adapt-contrib-boxMenu', version: '6.1.0', framework: '">=5.22.6' });

  testSuccessWhere('boxMenu with course/menu _boxMenu._menuHeader', {
    fromPlugins: [{ name: 'adapt-contrib-boxMenu', version: '6.0.2' }],
    content: [
      { _type: 'course', _boxMenu: { _menuHeader: {} } },
      { _type: 'menu', _boxMenu: { _menuHeader: {} } },
      { _type: 'menu', _boxMenu: { } }
    ]
  });

  testStopWhere('boxMenu with empty course', {
    fromPlugins: [{ name: 'adapt-contrib-boxMenu', version: '6.0.2' }],
    content: [
      { _type: 'course' }
    ]
  });

  testStopWhere('boxMenu with empty course _boxMenu', {
    fromPlugins: [{ name: 'adapt-contrib-boxMenu', version: '6.0.2' }],
    content: [
      { _type: 'course', _boxMenu: {} }
    ]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-boxMenu', version: '6.1.0' }]
  });
});

describe('Box menu - v6.2.0 to v6.2.1', async () => {

  // https://github.com/adaptlearning/adapt-contrib-boxMenu/compare/v6.2.0..v6.2.1

  let menus;
  const defaultGraphic = {
    _src: '',
    alt: ''
  };

  whereFromPlugin('Box menu - from v6.2.0', { name: 'adapt-contrib-boxMenu', version: '<6.2.1' });

  whereContent('Box menu - where menus are configured', async (content) => {
    menus = getBoxMenus(content).filter(({ _boxMenu }) => _boxMenu);
    return menus.length;
  });

  mutateContent('Box menu - add _graphic attribute', async (content) => {
    menus.forEach(({ _boxMenu }) => (_boxMenu._graphic = defaultGraphic));
    return true;
  });

  checkContent('Box menu - check _graphic attribute', async (content) => {
    const isValid = menus.every(({ _boxMenu }) => _.isEqual(_boxMenu._graphic, defaultGraphic));
    if (!isValid) throw new Error('Box menu - course attribute _graphic');
    return true;
  });

  updatePlugin('Box menu - update to v6.2.1', { name: 'adapt-contrib-boxMenu', version: '6.2.1', framework: '">=5.24.2' });

  testSuccessWhere('boxMenu with course _boxMenu', {
    fromPlugins: [{ name: 'adapt-contrib-boxMenu', version: '6.2.0' }],
    content: [
      { _type: 'course', _boxMenu: {} },
      { _type: 'menu', _boxMenu: {} },
      { _type: 'menu' }
    ]
  });

  testStopWhere('boxMenu with empty course', {
    fromPlugins: [{ name: 'adapt-contrib-boxMenu', version: '6.2.0' }],
    content: [
      { _type: 'course' },
      { _type: 'menu' }
    ]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-boxMenu', version: '6.2.1' }]
  });
});

describe('Box menu - v6.3.8 to v6.3.9', async () => {

  // https://github.com/adaptlearning/adapt-contrib-boxMenu/compare/v6.3.8..v6.3.9

  let menusWithBgImage;

  whereFromPlugin('Box menu - from v6.3.8', { name: 'adapt-contrib-boxMenu', version: '<6.3.9' });

  whereContent('Box menu - where menus have _backgroundImage', async (content) => {
    menusWithBgImage = getBoxMenus(content).filter(({ _boxMenu }) => (
      _boxMenu?._backgroundImage ||
      _boxMenu?._menuHeader?._backgroundImage
    ));
    return menusWithBgImage.length;
  });

  mutateContent('Box menu - add _xlarge attribute', async (content) => {
    menusWithBgImage.forEach(({ _boxMenu }) => {
      if (!_.has(_boxMenu, '_backgroundImage')) return true;
      _boxMenu._backgroundImage._xlarge = '';
    });
    return true;
  });

  mutateContent('Box menu - add _xlarge attribute to _menuHeader', async (content) => {
    menusWithBgImage.forEach(({ _boxMenu }) => {
      if (!_.has(_boxMenu, '_menuHeader._backgroundImage')) return true;
      _boxMenu._menuHeader._backgroundImage._xlarge = '';
    });
    return true;
  });

  checkContent('Box menu - check _xlarge attribute', async (content) => {
    const isValid = menusWithBgImage.every(({ _boxMenu }) => (
      !_boxMenu._backgroundImage || _boxMenu._backgroundImage._xlarge === ''
    ));
    if (!isValid) throw new Error('Box menu - course attribute _xlarge');
    return true;
  });

  checkContent('Box menu - check _xlarge attribute for _menuHeader', async (content) => {
    const isValid = menusWithBgImage.every(({ _boxMenu }) => (
      !_boxMenu._menuHeader?._backgroundImage || _boxMenu._menuHeader._backgroundImage._xlarge === ''
    ));
    if (!isValid) throw new Error('Box menu - course attribute _xlarge');
    return true;
  });

  updatePlugin('Box menu - update to v6.3.9', { name: 'adapt-contrib-boxMenu', version: '6.3.9', framework: '">=5.24.2' });

  testSuccessWhere('boxMenu with course._boxMenu._backgroundImage', {
    fromPlugins: [{ name: 'adapt-contrib-boxMenu', version: '6.3.8' }],
    content: [
      { _type: 'course', _boxMenu: { _backgroundImage: {} } },
      { _type: 'menu', _boxMenu: { _backgroundImage: {} } },
      { _type: 'menu', _boxMenu: {} }
    ]
  });

  testSuccessWhere('boxMenu with course._boxMenu._menuHeader._backgroundImage', {
    fromPlugins: [{ name: 'adapt-contrib-boxMenu', version: '6.3.8' }],
    content: [
      { _type: 'course', _boxMenu: { _menuHeader: { _backgroundImage: {} } } },
      { _type: 'menu', _boxMenu: { _menuHeader: { _backgroundImage: {} } } }
    ]
  });

  testStopWhere('boxMenu with empty course', {
    fromPlugins: [{ name: 'adapt-contrib-boxMenu', version: '6.3.8' }],
    content: [
      { _type: 'course' }
    ]
  });

  testStopWhere('boxMenu with course._boxMenu', {
    fromPlugins: [{ name: 'adapt-contrib-boxMenu', version: '6.3.8' }],
    content: [
      { _type: 'course', _boxMenu: {} }
    ]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-boxMenu', version: '6.3.9' }]
  });
});

describe('Box menu - v6.3.9 to v6.3.10', async () => {

  // https://github.com/adaptlearning/adapt-contrib-boxMenu/compare/v6.3.9..v6.3.10

  let course, courseBoxMenuGlobals;
  const itemCount = 'Item {{_nthChild}} of {{_totalChild}}';

  whereFromPlugin('Box menu - from v6.3.9', { name: 'adapt-contrib-boxMenu', version: '<6.3.10' });

  mutateContent('Box menu - add globals if missing', async (content) => {
    course = getCourse();
    if (!_.has(course, '_globals._menu._boxMenu')) _.set(course, '_globals._menu._boxMenu', {});
    courseBoxMenuGlobals = course._globals._menu._boxMenu;
    return true;
  });

  mutateContent('Box menu - add new globals', async (content) => {
    courseBoxMenuGlobals.itemCount = itemCount;
    return true;
  });

  checkContent('Box menu - check new globals', async (content) => {
    const isValid = courseBoxMenuGlobals.itemCount === itemCount;
    if (!isValid) throw new Error('Box menu - global attribute itemCount');
    return true;
  });

  updatePlugin('Box menu - update to v6.3.10', { name: 'adapt-contrib-boxMenu', version: '6.3.10', framework: '">=5.24.2' });

  testSuccessWhere('boxMenu with empty course', {
    fromPlugins: [{ name: 'adapt-contrib-boxMenu', version: '6.3.9' }],
    content: [
      { _type: 'course' }
    ]
  });

  testSuccessWhere('boxMenu with course globals', {
    fromPlugins: [{ name: 'adapt-contrib-boxMenu', version: '6.3.9' }],
    content: [
      { _type: 'course', _globals: { _menu: { _boxMenu: {} } } }
    ]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-boxMenu', version: '6.3.10' }]
  });
});
