/// <reference types="cypress" />


it('Valid data', () => {
    cy.visit('https://dev-pc.powercode.pro/');
    cy.viewport(1920, 1280)

    cy.get('input[name*="name"]').type("Test name").should('have.value', 'Test name');
    cy.get('input[name*="company"]').type("Test company").should('have.value', 'Test company');
    cy.get('input[name*="phone"]').type("380994512135").should('have.value', '+380994512135');
    cy.get('input[name*="email"]').type("test@gmail.com").should('have.value', 'test@gmail.com');
    cy.get('textarea[name*="description"]').type("Test description").should('have.value', 'Test description');

    const file = 'test.pdf'
    cy.get('input[name*="file"]').attachFile(file);
    cy.get('.input-file span').should('have.text', 'Attached file: test.pdf')

    cy.get('#submit-form').click();

    cy.location().should((loc) => {
        expect(loc.pathname.toString()).to.contain('/message_sent');
    });
})
