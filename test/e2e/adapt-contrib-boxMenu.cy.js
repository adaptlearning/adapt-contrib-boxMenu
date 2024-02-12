describe('Menu Page', function () {
  beforeEach(function () {
    cy.getData().then((data) => {
      this.boxMenus = this.data.filter(item => item._component === 'boxMenu' || item._view === 'boxMenu');
      if (this.boxMenus.length) return;
      this.boxMenus = this.data.filter(item => ['course', 'menu'].includes(item._type));
    });

    cy.visit('/');
  });

  it(`should be an instance of a box menu content object on each menu page`, function () {
    this.boxMenus.forEach((menu, index) => {
      cy.visit(`#/id/${menu._id}`);
      cy.get('.boxmenu').should('exist');
    });
  });

  it(`should have the correct title and description for each menu page`, function () {
    this.boxMenus.forEach((menu, index) => {
      cy.visit(`#/id/${menu._id}`);

      const { body, displayTitle } = menu;

      cy.get('.menu__title-inner').should('contain', displayTitle);
      cy.get('.menu__body-inner').should('contain', body);
    });
  });

  it(`should display the correct number of menu tiles for each menu page`, function () {
    this.boxMenus.forEach((menu, index) => {
      cy.visit(`#/id/${menu._id}`);

      const subPages = this.data.contentObjects.filter((page) => page._parentId === menu._id);
      cy.get('.menu-item').should('have.length', subPages.length);
    });
  });

  it('should display the correct information in each tile for each menu page', function () {
    this.boxMenus.forEach((menu, index) => {
      cy.visit(`#/id/${menu._id}`);

      const subPages = this.data.contentObjects.filter((page) => page._parentId === menu._id);

      cy.get('.menu-item').each(($item, index) => {
        cy.get($item).within(function () {
          const { _graphic, body, displayTitle, duration, linkText } = subPages[index];

          cy.testContainsOrNotExists('.menu-item__title', displayTitle);
          cy.testContainsOrNotExists('.menu-item__body', body);
          cy.testContainsOrNotExists('.menu-item__duration', duration);

          if (_graphic?.src) {
            cy.get('img.menu-item__image').should('exist').should('have.attr', 'src', _graphic.src);
          } else {
            cy.get('img.menu-item__image').should('not.exist');
          }

          cy.get('.menu-item__details-inner').should('contain', _graphic.alt);
          cy.get('button.boxmenu-item__button').should('contain', linkText);
        });
      });
    });
  });
});
