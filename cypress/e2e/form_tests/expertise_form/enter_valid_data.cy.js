
it.only('Empty fields', () => {
    cy.visit('https://dev-pc.powercode.pro/');
    cy.viewport(1920, 1280);

    cy.get('.u_menu_item').contains('Expertise').realHover('mouse');
    cy.get('.u_menu_card-label').first().should('have.text', 'Ecommerce').click();
    cy.get('.expertise').realHover('mouse');

    cy.get('.expertise-form input[name*="name"]').type('Test QA');
    cy.get('.expertise-form input[name*="email"]').type('test@gmail.com');
    cy.get('.expertise-form input[name*="request"]').type('Test request');

    cy.get('.expertise-form button').click();
    
    cy.location().should((loc) => {
        expect(loc.pathname.toString()).to.contain('/message_sent');
    });

});