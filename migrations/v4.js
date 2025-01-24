import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin } from 'adapt-migrations';

const getCourse = content => {
  const [course] = content.filter(({ _type }) => _type === 'course');
  return course;
};

const getGlobals = content => {
  return getCourse(content)?._globals?._menu?._boxMenu;
};

describe('Box menu - v3.0.0 to v4.0.1', async () => {
  let courseBoxMenuGlobals;

  whereFromPlugin('Box menu - from v3.0.0', { name: 'adapt-contrib-boxMenu', version: '<4.0.1' });

  mutateContent('Box menu - add globals if missing', async (content) => {
    courseBoxMenuGlobals = getGlobals(content);
    if (courseBoxMenuGlobals) return true;
    const course = getCourse(content);
    course._globals._menu = course._globals._menu || {};
    courseBoxMenuGlobals = course._globals._menu._boxMenu = {};
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
    return (
      Object.hasOwn(globals, 'ariaRegion') === false &&
      Object.hasOwn(globals, 'menuItem') === false &&
      Object.hasOwn(globals, 'menuEnd') === false
    );
  });

  updatePlugin('Box menu - update to v4.0.1', { name: 'adapt-contrib-boxMenu', version: '4.0.1', framework: '">=4' });
});
