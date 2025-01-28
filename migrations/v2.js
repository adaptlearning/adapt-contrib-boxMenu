import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin } from 'adapt-migrations';

const getCourse = content => {
  const [course] = content.filter(({ _type }) => _type === 'course');
  return course;
};

const getGlobals = content => {
  return getCourse(content)?._globals?._menu?._boxMenu;
};

describe('Box menu - v2.0.2 to v2.0.3', async () => {

  // https://github.com/adaptlearning/adapt-contrib-boxMenu/compare/v2.0.2..v2.0.3

  let courseBoxMenuGlobals;
  const durationLabel = 'Duration:';

  whereFromPlugin('Box menu - from v2.0.2', { name: 'adapt-contrib-boxMenu', version: '<2.0.3' });

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

  updatePlugin('Box menu - update to v2.0.3', { name: 'adapt-contrib-boxMenu', version: '2.0.3', framework: '">=2.0.0' });
});
