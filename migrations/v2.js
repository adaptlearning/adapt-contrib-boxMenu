import { describe, getCourse, whereFromPlugin, mutateContent, checkContent, updatePlugin, testStopWhere, testSuccessWhere } from 'adapt-migrations';
import _ from 'lodash';

describe('Box menu - v2.0.2 to v2.0.3', async () => {

  // https://github.com/adaptlearning/adapt-contrib-boxMenu/compare/v2.0.2..v2.0.3

  let course, courseBoxMenuGlobals;
  const durationLabel = 'Duration:';

  whereFromPlugin('Box menu - from v2.0.2', { name: 'adapt-contrib-boxMenu', version: '>=2.0.0 <2.0.3' });

  mutateContent('Box menu - add globals if missing', async (content) => {
    course = getCourse();
    if (!_.has(course, '_globals._menu._boxMenu')) _.set(course, '_globals._menu._boxMenu', {});
    courseBoxMenuGlobals = course._globals._menu._boxMenu;
    return true;
  });

  mutateContent('Box menu - add new globals', async (content) => {
    courseBoxMenuGlobals.durationLabel = durationLabel;
    return true;
  });

  checkContent('Box menu - check new globals', async (content) => {
    const isValid = courseBoxMenuGlobals.durationLabel === durationLabel;
    if (!isValid) throw new Error('Box menu - global attribute durationLabel');
    return true;
  });

  updatePlugin('Box menu - update to v2.0.3', { name: 'adapt-contrib-boxMenu', version: '2.0.3', framework: '">=2.0.0' });

  testSuccessWhere('boxMenu with empty course', {
    fromPlugins: [{ name: 'adapt-contrib-boxMenu', version: '2.0.2' }],
    content: [
      { _type: 'course' }
    ]
  });

  testSuccessWhere('boxMenu with course globals', {
    fromPlugins: [{ name: 'adapt-contrib-boxMenu', version: '2.0.2' }],
    content: [
      { _type: 'course', _globals: { _menu: { _boxMenu: {} } } }
    ]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-boxMenu', version: '2.0.3' }]
  });
});
