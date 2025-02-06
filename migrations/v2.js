import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin } from 'adapt-migrations';
import _ from 'lodash';

const getCourse = content => {
  const course = content.find(({ _type }) => _type === 'course');
  return course;
};

const getGlobals = content => {
  return getCourse(content)?._globals?._menu?._boxMenu;
};

describe('Box menu - v2.0.2 to v2.0.3', async () => {

  // https://github.com/adaptlearning/adapt-contrib-boxMenu/compare/v2.0.2..v2.0.3

  let course, courseBoxMenuGlobals;
  const durationLabel = 'Duration:';

  whereFromPlugin('Box menu - from v2.0.2', { name: 'adapt-contrib-boxMenu', version: '<2.0.3' });

  mutateContent('Box menu - add globals if missing', async (content) => {
    course = getCourse(content);
    if (!_.has(course, '_globals._menu._boxMenu')) _.set(course, '_globals._menu._boxMenu', {});
    courseBoxMenuGlobals = course._globals._menu._boxMenu;
    return true;
  });

  mutateContent('Box menu - add new globals', async (content) => {
    courseBoxMenuGlobals.durationLabel = durationLabel;
    return true;
  });

  checkContent('Box menu - check new globals', async (content) => {
    const isValid = getGlobals(content).durationLabel === durationLabel;
    if (!isValid) throw new Error('Box menu - global attribute durationLabel');
    return true;
  });

  updatePlugin('Box menu - update to v2.0.3', { name: 'adapt-contrib-boxMenu', version: '2.0.3', framework: '">=2.0.0' });
});
