describe('schdule UI', () => {
  it('Should return true when title component was correct', () => {
    cy.visit('/');

    cy.contains('Agenda').should('to.have.length', 1);
  });

  it('Should add a new person on schdule', () => {
    cy.get('[data-cy=input-name]').type('José');
    cy.get('[data-cy=input-number]').type(415645);
    cy.get('[data-cy=input-cep]').type('{backspace}37202791{enter}');
    cy.wait(1000);
    cy.get('[data-cy=register-button]').click();
    cy.wait(1000);
    cy.get('[data-cy=data-name]').contains('José');
  });
});
