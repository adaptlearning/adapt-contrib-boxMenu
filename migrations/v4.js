import { describe, getCourse, whereFromPlugin, mutateContent, checkContent, updatePlugin } from 'adapt-migrations';
import _ from 'lodash';

describe('Box menu - v3.0.0 to v4.0.0', async () => {

  // https://github.com/adaptlearning/adapt-contrib-boxMenu/compare/v3.0.0..v4.0.0

  let course, courseBoxMenuGlobals;

  whereFromPlugin('Box menu - from v3.0.0', { name: 'adapt-contrib-boxMenu', version: '<4.0.0' });

  mutateContent('Box menu - add globals if missing', async (content) => {
    course = getCourse();
    if (!_.has(course, '_globals._menu._boxMenu')) _.set(course, '_globals._menu._boxMenu', {});
    courseBoxMenuGlobals = course._globals._menu._boxMenu;
    return true;
  });

  mutateContent('Box menu - remove global attribute ariaRegion', async (content) => {
    delete courseBoxMenuGlobals.ariaRegion;
    return true;
  });

  mutateContent('Box menu - remove globas attribute menuItem', async (content) => {
    delete courseBoxMenuGlobals.menuItem;
    return true;
  });

  mutateContent('Box menu - remove globas attribute menuEnd', async (content) => {
    delete courseBoxMenuGlobals.menuEnd;
    return true;
  });

  checkContent('Box menu - check global attribute ariaRegion', async (content) => {
    const isValid = Object.hasOwn(courseBoxMenuGlobals, 'ariaRegion') === false;
    if (!isValid) throw new Error('Box menu - global attributes ariaRegion');
    return true;
  });

  checkContent('Box menu - check global attribute menuItem', async (content) => {
    const isValid = Object.hasOwn(courseBoxMenuGlobals, 'menuItem') === false;
    if (!isValid) throw new Error('Box menu - global attributes menuItem');
    return true;
  });

  checkContent('Box menu - check global attribute menuEnd', async (content) => {
    const isValid = Object.hasOwn(courseBoxMenuGlobals, 'menuEnd') === false;
    if (!isValid) throw new Error('Box menu - global attributes menuEnd');
    return true;
  });

  updatePlugin('Box menu - update to v4.0.0', { name: 'adapt-contrib-boxMenu', version: '4.0.0', framework: '">=4' });
});
