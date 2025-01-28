import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin } from 'adapt-migrations';

const getCourse = content => {
  const [course] = content.filter(({ _type }) => _type === 'course');
  return course;
};

const getGlobals = content => {
  return getCourse(content)?._globals?._menu?._boxMenu;
};

describe('Box menu - v4.0.1 to v5.0.0', async () => {

  // https://github.com/adaptlearning/adapt-contrib-boxMenu/compare/v4.0.1..v5.0.0

  const defaults = {
    _backgroundImage: {
      _large: '',
      _medium: '',
      _small: ''
    },
    _backgroundStyles: {
      _backgroundSize: '',
      _backgroundRepeat: '',
      _backgroundPosition: ''
    },
    _menuHeader: {
      _backgroundImage: {
        _large: '',
        _medium: '',
        _small: ''
      },
      _backgroundStyles: {
        _backgroundSize: '',
        _backgroundRepeat: '',
        _backgroundPosition: ''
      }
    }
  };

  whereFromPlugin('Box menu - from v4.0.1', { name: 'adapt-contrib-boxMenu', version: '<5.5.0' });

  mutateContent('Box menu - add config to course', async (content) => {
    getCourse(content)._boxMenu = defaults;
    return true;
  });

  checkContent('Box menu - check course config', async (content) => {
    return getCourse(content)._boxMenu === defaults;
  });

  updatePlugin('Box menu - update to v5.0.0', { name: 'adapt-contrib-boxMenu', version: '5.0.0', framework: '">=5' });
});

describe('Box menu - v5.0.0 to v5.1.0', async () => {

  // https://github.com/adaptlearning/adapt-contrib-boxMenu/compare/v5.0.0..v5.1.0

  const defaults = {
    _renderAsGroup: false
  };

  let contentObjects;

  whereFromPlugin('Box menu - from v5.0.0', { name: 'adapt-contrib-boxMenu', version: '<5.5.0' });

  whereContent('Box menu - where content objects', async (content) => {
    contentObjects = content.filter(({ _type }) => ['menu', 'page'].includes(_type));
    if (contentObjects.length > 0) return true;
  });

  mutateContent('Box menu - add config to content objects', async (content) => {
    contentObjects.forEach(co => (co._boxMenu = defaults));
    return true;
  });

  checkContent('Box menu - check content objects config', async (content) => {
    return contentObjects.every(co => co._boxMenu === defaults);
  });

  updatePlugin('Box menu - update to v5.1.0', { name: 'adapt-contrib-boxMenu', version: '5.1.0', framework: '">=5.7' });
});
