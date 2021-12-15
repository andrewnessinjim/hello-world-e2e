/// <reference types="Cypress"/>

it('displays hello world', () => {
    cy.visit('/');
    cy.get('body p')
        .should('contain', 'Hello from all of us');
});