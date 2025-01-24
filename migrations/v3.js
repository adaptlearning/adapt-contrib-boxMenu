import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin } from 'adapt-migrations';

const getCourse = content => {
  const [course] = content.filter(({ _type }) => _type === 'course');
  return course;
};

const getGlobals = content => {
  return getCourse(content)?._globals?._menu?._boxMenu;
};

describe('Box menu - v2.0.0 to v3.0.0', async () => {
  let courseBoxMenuGlobals;
  const durationLabel = 'Duration:';

  whereFromPlugin('Box menu - from v2.0.0', { name: 'adapt-contrib-boxMenu', version: '<3.0.0' });

  mutateContent('Box menu - add globals if missing', async (content) => {
    courseBoxMenuGlobals = getGlobals(content);
    if (courseBoxMenuGlobals) return true;
    const course = getCourse(content);
    course._globals._menu = course._globals._menu || {};
    courseBoxMenuGlobals = course._globals._menu._boxMenu = {};
    return true;
  });
  mutateContent('Box menu - add new globals', async (content) => {
    courseBoxMenuGlobals.durationLabel = durationLabel;
    return true;
  });

  checkContent('Box menu - check new globals', async (content) => {
    return getGlobals(content).durationLabel === durationLabel;
  });

  updatePlugin('Box menu - update to v3.0.0', { name: 'adapt-contrib-boxMenu', version: '3.0.0', framework: '">=2.1' });
});
