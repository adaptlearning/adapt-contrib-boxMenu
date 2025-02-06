import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin } from 'adapt-migrations';
import _ from 'lodash';

const getCourse = content => {
  const course = content.find(({ _type }) => _type === 'course');
  return course;
};

const getGlobals = content => {
  return getCourse(content)?._globals?._menu?._boxMenu;
};

describe('Box menu - v6.0.2 to v6.1.0', async () => {

  // https://github.com/adaptlearning/adapt-contrib-boxMenu/compare/v6.0.2..v6.1.0

  let course;
  const defaultTextAlignment = {
    _title: '',
    _body: '',
    _instruction: ''
  };

  whereFromPlugin('Box menu - from v6.0.2', { name: 'adapt-contrib-boxMenu', version: '<6.1.0' });

  whereContent('Box menu - where course has _menuHeader', async (content) => {
    course = getCourse(content);
    return course?._boxMenu?._menuHeader;
  });

  mutateContent('Box menu - add _textAlignment attribute', async (content) => {
    course._boxMenu._menuHeader._textAlignment = defaultTextAlignment;
    return true;
  });

  checkContent('Box menu - check _textAlignment attribute', async (content) => {
    const isValid = _.isEqual(course._boxMenu._menuHeader._textAlignment, defaultTextAlignment);
    if (!isValid) throw new Error('Box menu - course attribute _textAlignment');
    return true;
  });

  updatePlugin('Box menu - update to v6.1.0', { name: 'adapt-contrib-boxMenu', version: '6.1.0', framework: '">=5.22.6' });
});

describe('Box menu - v6.2.0 to v6.2.1', async () => {

  // https://github.com/adaptlearning/adapt-contrib-boxMenu/compare/v6.2.0..v6.2.1

  let course;
  const defaultGraphic = {
    _src: '',
    alt: ''
  };

  whereFromPlugin('Box menu - from v6.2.0', { name: 'adapt-contrib-boxMenu', version: '<6.2.1' });

  whereContent('Box menu - where course has _boxMenu', async (content) => {
    course = getCourse(content);
    return course?._boxMenu;
  });

  mutateContent('Box menu - add _graphic attribute', async (content) => {
    course._boxMenu._graphic = defaultGraphic;
    return true;
  });

  checkContent('Box menu - check _graphic attribute', async (content) => {
    const isValid = _.isEqual(course._boxMenu._graphic, defaultGraphic);
    if (!isValid) throw new Error('Box menu - course attribute _graphic');
    return true;
  });

  updatePlugin('Box menu - update to v6.2.1', { name: 'adapt-contrib-boxMenu', version: '6.2.1', framework: '">=5.24.2' });
});

describe('Box menu - v6.3.8 to v6.3.9', async () => {

  // https://github.com/adaptlearning/adapt-contrib-boxMenu/compare/v6.3.8..v6.3.9

  let course;

  whereFromPlugin('Box menu - from v6.3.8', { name: 'adapt-contrib-boxMenu', version: '<6.3.9' });

  whereContent('Box menu - where course has _backgroundImage', async (content) => {
    course = getCourse(content);
    return (
      course?._boxMenu?._backgroundImage ||
      course?._boxMenu?._menuHeader?._backgroundImage
    );
  });

  mutateContent('Box menu - add _xlarge attribute', async (content) => {
    if (course._boxMenu._backgroundImage) {
      course._boxMenu._backgroundImage._xlarge = '';
    }
    return true;
  });

  mutateContent('Box menu - add _xlarge attribute to _menuHeader', async (content) => {
    if (course._boxMenu._menuHeader._backgroundImage) {
      course._boxMenu._menuHeader._backgroundImage._xlarge = '';
    }
    return true;
  });

  checkContent('Box menu - check _xlarge attribute', async (content) => {
    const isValid = (
      !course._boxMenu._backgroundImage ||
      course._boxMenu._backgroundImage._xlarge === ''
    );
    if (!isValid) throw new Error('Box menu - course attribute _xlarge');
    return true;
  });

  checkContent('Box menu - check _xlarge attribute for _menuHeader', async (content) => {
    const isValid = (
      !course._boxMenu._menuHeader?._backgroundImage ||
      course._boxMenu._menuHeader._backgroundImage._xlarge === ''
    );
    if (!isValid) throw new Error('Box menu - course attribute _xlarge');
    return true;
  });

  updatePlugin('Box menu - update to v6.3.9', { name: 'adapt-contrib-boxMenu', version: '6.3.9', framework: '">=5.24.2' });
});

describe('Box menu - v6.3.9 to v6.3.10', async () => {

  // https://github.com/adaptlearning/adapt-contrib-boxMenu/compare/v6.3.9..v6.3.10

  let course, courseBoxMenuGlobals;
  const itemCount = 'Item {{_nthChild}} of {{_totalChild}}';

  whereFromPlugin('Box menu - from v6.3.9', { name: 'adapt-contrib-boxMenu', version: '<v6.3.10' });

  mutateContent('Box menu - add globals if missing', async (content) => {
    course = getCourse(content);
    if (!_.has(course, '_globals._menu._boxMenu')) _.set(course, '_globals._menu._boxMenu', {});
    courseBoxMenuGlobals = course._globals._menu._boxMenu;
    return true;
  });

  mutateContent('Box menu - add new globals', async (content) => {
    courseBoxMenuGlobals.itemCount = itemCount;
    return true;
  });

  checkContent('Box menu - check new globals', async (content) => {
    const isValid = getGlobals(content).itemCount === itemCount;
    if (!isValid) throw new Error('Box menu - global attribute itemCount');
    return true;
  });

  updatePlugin('Box menu - update to v6.3.10', { name: 'adapt-contrib-boxMenu', version: 'v6.3.10', framework: '">=5.24.2' });
});
