import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin } from 'adapt-migrations';
import _ from 'lodash';

const getCourse = content => {
  const course = content.find(({ _type }) => _type === 'course');
  return course;
};

const getGlobals = content => {
  return getCourse(content)?._globals?._menu?._boxMenu;
};

describe('Box menu - v3.0.0 to v4.0.0', async () => {

  // https://github.com/adaptlearning/adapt-contrib-boxMenu/compare/v3.0.0..v4.0.0

  let course, courseBoxMenuGlobals;

  whereFromPlugin('Box menu - from v3.0.0', { name: 'adapt-contrib-boxMenu', version: '<4.0.0' });

  mutateContent('Box menu - add globals if missing', async (content) => {
    course = getCourse(content);
    if (!_.has(course, '_globals._menu._boxMenu')) _.set(course, '_globals._menu._boxMenu', {});
    courseBoxMenuGlobals = course._globals._menu._boxMenu;
    return true;
  });

  mutateContent('Box menu - remove globals', async (content) => {
    delete courseBoxMenuGlobals.ariaRegion;
    delete courseBoxMenuGlobals.menuItem;
    delete courseBoxMenuGlobals.menuEnd;
    return true;
  });

  checkContent('Box menu - check globals', async (content) => {
    const globals = getGlobals(content);
    const isValid = (
      Object.hasOwn(globals, 'ariaRegion') === false &&
      Object.hasOwn(globals, 'menuItem') === false &&
      Object.hasOwn(globals, 'menuEnd') === false
    );
    if (!isValid) throw new Error('Box menu - global attributes ariaRegion menuItem menuEnd');
    return true;
  });

  updatePlugin('Box menu - update to v4.0.0', { name: 'adapt-contrib-boxMenu', version: '4.0.0', framework: '">=4' });
});
