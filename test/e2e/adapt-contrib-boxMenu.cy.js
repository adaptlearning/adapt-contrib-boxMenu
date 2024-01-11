describe('Menu Page', () => {
  beforeEach(() => {
    cy.getBuild();
    cy.visit('/');
  });

  it('should have the correct title and description for every language', () => {
    this.build?.availableLanguageNames?.forEach(lang => {
      cy.getData(lang).then(data => {
        it(`should have the title '${data.course.displayTitle}' and correct description for language '${lang}'`, () => {
          cy.get('.menu__title-inner').should('contain', data.course.displayTitle);
          cy.get('.menu__body-inner').should('contain', data.course.body);
        });
      });
    });
  });

  it('should display the correct menu tiles for every language', () => {
    this.build?.availableLanguageNames?.forEach(lang => {
      cy.getData(lang).then(data => {
        it(`should display ${data.contentObjects.length} menu tiles for language '${lang}'`, () => {
          cy.get('.menu-item').should('have.length', data.contentObjects.length)
        });

        it(`should display the correct information in the tile for language '${lang}'`, () => {
          cy.get('.menu-item').each(($item, index) => {
            cy.get($item).within(() => {
              cy.get('.menu-item__title').should('contain', data.contentObjects[index].displayTitle)
              cy.get('.menu-item__body').should('contain', data.contentObjects[index].body)
              cy.get('button').should('contain', data.contentObjects[index].linkText)
              cy.get('.menu-item__duration').should('contain', data.contentObjects[index].duration)
              cy.get('img.menu-item__image').should('exist').should('have.attr', 'src', data.contentObjects[index]._graphic.src)
            });
          });
        });
      });
    });
});
