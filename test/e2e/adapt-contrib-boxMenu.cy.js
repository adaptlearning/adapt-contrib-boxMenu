describe('Menu Page', function () {
  beforeEach(function () {
    cy.getData();
    cy.visit('/');
  });

  it(`should be an instance of a box menu content object`, function () {
    cy.get('.boxmenu').should('exist');
  });

  it(`should have the correct title and description`, function () {
    const { body, displayTitle } = this.data.course;

    cy.get('.menu__title-inner').should('contain', displayTitle);
    cy.get('.menu__body-inner').should('contain', body);
  });

  it(`should display the correct number of menu tiles`, function () {
    cy.get('.menu-item').should('have.length', this.data.contentObjects.length);
  });

  it('should display the correct information in each tile', function () {
    cy.get('.menu-item').each(($item, index) => {
      cy.get($item).within(function () {
        const { _graphic, body, displayTitle, duration, linkText } = this.data.contentObjects[index];

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
