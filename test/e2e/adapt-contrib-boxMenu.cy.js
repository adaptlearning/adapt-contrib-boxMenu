describe('Menu Page', () => {
  beforeEach(() => {
    cy.getData();
    cy.visit('/');
  });

  it(`should have the title '${this.data.course.displayTitle}' and correct description`, () => {
    const { body, displayTitle } = this.data.course;

    it(`should have the title '${displayTitle}' and correct description`, () => {
      cy.get('.menu__title-inner').should('contain', displayTitle);
      cy.get('.menu__body-inner').should('contain', body);
    });
  });

  it(`should display ${this.data.contentObjects.length} menu tiles`, () => {
    const { contentObjects } = this.data;

    it(`should display ${contentObjects.length} menu tiles`, () => {
      cy.get('.menu-item').should('have.length', contentObjects.length);
    });

    it(`should display the correct information in the tile`, () => {
      cy.get('.menu-item').each(($item, index) => {
        cy.get($item).within(() => {
          const { _graphic, body, displayTitle, duration, linkText } = contentObjects[index];

          cy.get('.menu-item__title').should('contain', displayTitle);
          cy.get('.menu-item__body').should('contain', body);
          cy.get('button').should('contain', linkText);
          cy.get('.menu-item__duration').should('contain', duration);
          cy.get('img.menu-item__image').should('exist').should('have.attr', 'src', _graphic.src);
        });
      });
    });
});
