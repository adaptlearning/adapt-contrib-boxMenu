import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin } from 'adapt-migrations';

const getCourse = content => {
  const [course] = content.filter(({ _type }) => _type === 'course');
  return course;
};

const getGlobals = content => {
  return getCourse(content)?._globals?._menu?._boxMenu;
};

describe('Box menu - v5.5.0 to v6.7.0', async () => {
  let courseBoxMenuGlobals;
  const itemCount = 'Item {{_nthChild}} of {{_totalChild}}';

  whereFromPlugin('Box menu - from v5.5.0', { name: 'adapt-contrib-boxMenu', version: '<6.7.0' });

  mutateContent('Box menu - add globals if missing', async (content) => {
    courseBoxMenuGlobals = getGlobals(content);
    if (courseBoxMenuGlobals) return true;
    const course = getCourse(content);
    course._globals._menu = course._globals._menu || {};
    courseBoxMenuGlobals = course._globals._menu._boxMenu = {};
    return true;
  });
  mutateContent('Box menu - add new globals', async (content) => {
    courseBoxMenuGlobals.itemCount = itemCount;
    return true;
  });

  checkContent('Box menu - check new globals', async (content) => {
    return getGlobals(content).itemCount === itemCount;
  });

  updatePlugin('Box menu - update to v6.7.0', { name: 'adapt-contrib-boxMenu', version: '6.7.0', framework: '">=5.24.2' });
});
