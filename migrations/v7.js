import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin, testStopWhere, testSuccessWhere } from 'adapt-migrations';
import _ from 'lodash';

function getBoxMenus(content) {
  return content.filter(({ _type, _component }) =>
    (_type === 'menu' || _type === 'course') &&
    (!_component || _component === 'boxMenu'));
}

describe('Box menu - v@@CURRENT_VERSION to v@@RELEASE_VERSION', async () => {
  let boxMenus

  whereFromPlugin('Box menu - from v@@CURRENT_VERSION', { name: 'adapt-contrib-boxMenu', version: '<@@RELEASE_VERSION' });

  whereContent('Box menu - where boxMenus', async (content) => {
    boxMenus = getBoxMenus(content).filter(({ _boxMenu }) => _boxMenu);
    return boxMenus.length;
  });

  mutateContent('Box menu - add titleAriaLabel to contentObjects', async (content) => {
    boxMenus.titleAriaLabel = '';
    return true;
  });

  checkContent('Box menu - check titleAriaLabel to contentObjects', async (content) => {
    const isValid = boxMenus.every(menu => _.has(menu, 'titleAriaLabel'));
    if (!isValid) throw new Error('Box menu - global attribute titleAriaLabel');
    return true;
  });

  updatePlugin('Box menu - update to v@@RELEASE_VERSION', { name: 'adapt-contrib-boxMenu', version: '@@RELEASE_VERSION', framework: '">=5.48.4' });

  testSuccessWhere('Multiple boxMenu, both course and menu', {
    fromPlugins: [{ name: 'adapt-contrib-boxMenu', version: '@@CURRENT_VERSION' }],
    content: [
      { _type: 'course', _boxMenu: { _backgroundImage: {} } },
      { _type: 'menu', _boxMenu: { _backgroundImage: {} } },
      { _type: 'menu', _boxMenu: {} }
    ]
  });

  testSuccessWhere('boxMenu with course globals', {
    fromPlugins: [{ name: 'adapt-contrib-boxMenu', version: '@@CURRENT_VERSION' }],
    content: [
      { _type: 'course', _globals: { _menu: { _boxMenu: {} } } }
    ]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-boxMenu', version: '@@RELEASE_VERSION' }]
  });
});
