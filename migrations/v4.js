import { describe, getCourse, whereFromPlugin, mutateContent, checkContent, updatePlugin, testStopWhere, testSuccessWhere, whereContent } from 'adapt-migrations';
import _ from 'lodash';

describe('Box menu - v3.0.0 to v4.0.0', async () => {

  // https://github.com/adaptlearning/adapt-contrib-boxMenu/compare/v3.0.0..v4.0.0

  let course, courseBoxMenuGlobals;

  whereFromPlugin('Box menu - from v3.0.0', { name: 'adapt-contrib-boxMenu', version: '<4.0.0' });

  whereContent('Box menu - where globals', async (content) => {
    course = getCourse();
    if (!_.has(course, '_globals._menu._boxMenu')) return false;
    courseBoxMenuGlobals = course._globals._menu._boxMenu;
    return true;
  });

  mutateContent('Box menu - remove global attribute ariaRegion', async (content) => {
    delete courseBoxMenuGlobals.ariaRegion;
    return true;
  });

  mutateContent('Box menu - remove globals attribute menuItem', async (content) => {
    delete courseBoxMenuGlobals.menuItem;
    return true;
  });

  mutateContent('Box menu - remove globals attribute menuEnd', async (content) => {
    delete courseBoxMenuGlobals.menuEnd;
    return true;
  });

  checkContent('Box menu - check global attribute ariaRegion', async (content) => {
    const isValid = !_.has(courseBoxMenuGlobals, 'ariaRegion');
    if (!isValid) throw new Error('Box menu - global attribute ariaRegion');
    return true;
  });

  checkContent('Box menu - check global attribute menuItem', async (content) => {
    const isValid = !_.has(courseBoxMenuGlobals, 'menuItem');
    if (!isValid) throw new Error('Box menu - global attribute menuItem');
    return true;
  });

  checkContent('Box menu - check global attribute menuEnd', async (content) => {
    const isValid = !_.has(courseBoxMenuGlobals, 'menuEnd');
    if (!isValid) throw new Error('Box menu - global attribute menuEnd');
    return true;
  });

  updatePlugin('Box menu - update to v4.0.0', { name: 'adapt-contrib-boxMenu', version: '4.0.0', framework: '">=4' });

  testStopWhere('boxMenu with empty course', {
    fromPlugins: [{ name: 'adapt-contrib-boxMenu', version: '3.0.0' }],
    content: [
      { _type: 'course' }
    ]
  });

  testSuccessWhere('boxMenu with course globals', {
    fromPlugins: [{ name: 'adapt-contrib-boxMenu', version: '3.0.0' }],
    content: [
      {
        _type: 'course',
        _globals: {
          _menu: {
            _boxMenu: {
              ariaRegion: 'ariaRegion',
              menuItem: 'menuItem',
              menuEnd: 'menuEnd'
            }
          }
        }
      }
    ]
  });

  testSuccessWhere('boxMenu with empty course globals', {
    fromPlugins: [{ name: 'adapt-contrib-boxMenu', version: '3.0.0' }],
    content: [
      { _type: 'course', _globals: { _menu: { _boxMenu: {} } } }
    ]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-boxMenu', version: '4.0.0' }]
  });
});
