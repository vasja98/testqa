it('Empty fields', () => {
    cy.visit('https://dev-pc.powercode.pro/');
    cy.viewport(1920, 1280);
    
    cy.get('#submit-form').click();

    cy.get('.inputHelper').contains('Please enter your name');
    cy.get('.inputHelper').contains('Please enter your phone');
    cy.get('.inputHelper').contains('Please enter your email');
    cy.get('.inputHelper').contains('Please enter description');

  });