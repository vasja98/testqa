it('NewBranchimit values', () => {
    cy.visit('https://dev-pc.powercode.pro/');
    cy.viewport(1920, 1280)
    const random = (length = 8, chars = 'abcdefghijklmnopqrstuvwxyz') => {

        // Pick characers randomly
        let str = '';
        for (let i = 0; i < length; i++) {
            str += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return str;

    };

    cy.get('input[name*="name"]').type(random(35))
    cy.get('input[name*="company"]').type(random(45))
    cy.get('input[name*="phone"]').type(random(44, '0123456789'))
    cy.get('input[name*="email"]').type(random(35))
    cy.get('textarea[name*="description"]').type(random(502))

    cy.get('#submit-form').click();


    cy.get('.inputHelper').contains('Name must be less than 31 characters');
    cy.get('.inputHelper').contains('Email in invalid');
    cy.get('.inputHelper').contains('Description must be less than 501 characters');
    cy.get('.inputHelper').contains('Company must be less than 31 characters');

})