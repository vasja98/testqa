import "cypress-real-events/support";
it.only('Empty fields', () => {
    cy.visit('https://dev-pc.powercode.pro/');
    cy.viewport(1920, 1280);

    cy.get('.u_menu_item').contains('Expertise').realHover('mouse');
    cy.get('.u_menu_card-label').first().should('have.text', 'Ecommerce').click();
    cy.get('h2').contains('Why Digitize Your Business').realHover('mouse');

    cy.get('.expertise-form button').click();

    cy.get('.expertise-form form span').contains('Please enter your name')
        
    cy.get('.expertise-form form span').contains('Please enter your email')
       
    cy.get('.expertise-form form span').contains('Please enter request')


});