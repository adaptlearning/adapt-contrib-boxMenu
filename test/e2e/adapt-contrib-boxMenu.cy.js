describe('Menu Page', () => {
  beforeEach(() => {
    cy.getData();
    cy.visit('/');
  });

  it(`should have the title '${this.data.course.displayTitle}' and correct description`, () => {
    const { body, displayTitle } = this.data.course;

    cy.get('.menu__title-inner').should('contain', displayTitle);
    cy.get('.menu__body-inner').should('contain', body);
  });

  it(`should display the correct number (${this.data.contentObjects.length}) of menu tiles`, () => {
    cy.get('.menu-item').should('have.length', this.data.contentObjects.length);
  });

  it('should display the correct information in each tile', () => {
    cy.get('.menu-item').each(($item, index) => {
      cy.get($item).within(() => {
        const { _graphic, body, displayTitle, duration, linkText } = this.data.contentObjects[index];

        if (_graphic?.src) {
          cy.get('img.menu-item__image').should('exist').should('have.attr', 'src', _graphic.src);
        } else {
          cy.get('img.menu-item__image').should('not.exist');
        }

        if (displayTitle) {
          cy.get('.menu-item__title').should('contain', displayTitle);
        } else {
          cy.get('.menu-item__title').should('not.exist');
        }

        cy.get('menu-item__details-inner').should('contain', _graphic.alt);

        if (body) {
          cy.get('.menu-item__body').should('contain', body);
        } else {
          cy.get('.menu-item__body').should('not.exist');
        }

        if (duration) {
          cy.get('.menu-item__duration').should('contain', duration);
        } else {
          cy.get('.menu-item__duration').should('not.exist');
        }

        cy.get('button.boxmenu-item__button').should('contain', linkText);
      });
    });
  });
});
