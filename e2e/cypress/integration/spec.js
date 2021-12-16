/// <reference types="Cypress"/>

it('displays hello world', () => {
    cy.visit('/');
    cy.get('body h1')
        .should('contain', 'Hello World!');
});