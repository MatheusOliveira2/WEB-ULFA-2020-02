describe('schdule UI', () => {
  it('Should return true when title component was correct', () => {
    cy.visit('/');

    cy.contains('Agenda').should('to.have.length', 1);
  });
});
