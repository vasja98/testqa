
describe.only('Bussiness Account', () => {
    const serverId = 'z0nua9ss'; // Replace SERVER_ID with an actual Mailosaur Server ID
    const uuid = () => Cypress._.random(0, 1e6)
    const id = uuid()
    const testname = `testname${id}`
    const firstname = `firstname${id}`
    const lastname = `lastname${id}`
    const stagename = `stagename${id}`
    const testEmail = `${testname}@${serverId}.mailosaur.net`


    it('Enter register data', () => {
        cy.visit('https://front-platform.orion.studio/register/')
        cy.get('input[name*="email"]').type(testEmail).should('have.value', testEmail);
        cy.get('input[name*="password"]').type('qwerty12');
        cy.get('input[name*="rePassword"]').type('qwerty12');
        cy.contains('REGISTER').click();
    })

    it('Gets confirmation code', () => {
        cy.mailosaurGetMessage(serverId, {
            sentTo: testEmail
        }).then(email => {
            var code
            var s = email.text.body;

            code = s.match(/\d/g);
            code = code.join("").slice(0, 7);
            cy.log(code);
            cy.get('input[name="code"]').type(code)
            cy.contains('CONFIRM').click()
        })
        
        //select subscription plan
        cy.xpath('//*[@id="__next"]/div/div/div[2]/div[3]/div[3]/div[3]/div[2]').click();
        //

        const file = 'test.pdf'
        cy.get('input[name*="firstName"]').type(testname).should('have.value', testname);
        cy.get('input[name*="lastName"]').type(lastname).should('have.value', lastname);
        cy.get('input[name*="businessName"]').type(stagename).should('have.value', stagename);

        //select role for account
        cy.xpath('//*[@id="__next"]/div/div[2]/form/div[2]/div[2]/div/div/div/div/div').click();
        cy.get('[title="Manager"]').click();
        // 

        //fill publisher info
        cy.get('input[name*="publisherIpi"]').type('123456789').should('have.value', '123456789');
        //

        //agreement check
        cy.xpath('//*[@id="__next"]/div/div[2]/form/div[7]/div/div').click();
        //

        cy.wait(2000);
        cy.contains('Next').click();
        cy.contains('All Done').click();

        cy.get('.ant-modal-content h2').should('have.text', 'Welcome to Aurign!')

    })


})