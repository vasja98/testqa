
describe.only('Free account', () => {
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
        cy.xpath('//*[@id="__next"]/div/div/div[2]/div[2]/div[3]/div[3]/div[2]').click();
        //

        const file = 'test.pdf'
        cy.get('input[name*="firstName"]').type(testname).should('have.value', testname);
        cy.get('input[name*="lastName"]').type(lastname).should('have.value', lastname);
        cy.get('input[name*="stageName"]').type(stagename).should('have.value', stagename);
        cy.get('input[name*="recordLabel"]').type("LabelQA").should('have.value', 'LabelQA');
        cy.get('input[name*="dateOfBirth"]').type("06/28/1998").should('have.value', '06/28/1998');

        //select role for account
        cy.xpath('//*[@id="__next"]/div/div[2]/form/div[3]/div[2]/div/div/div/div/div').click();
        cy.get('[title="Artist"]').click();
        // 

        //fill PRO data
        const uuid = () => Cypress._.random(0, 1e10)
        const Ipi = uuid()
        cy.xpath('//*[@id="__next"]/div/div[2]/form/div[7]/div[1]/div/div/div/div/div').click();
        cy.get('[title="BMI"]').click();
        cy.get('input[name*="composerIpi"]').type(Ipi).should('have.value', Ipi);
        //

        //fill publisher info
        cy.get('input[name*="publisherIpi"]').type('123456789').should('have.value', '123456789');
        //

        //agreement check
        cy.xpath('//*[@id="__next"]/div/div[2]/form/div[11]/div/div').click();
        //

        cy.wait(2000);
        cy.contains('All Done').click();

        cy.location('pathname').should('eq', '/dashboard')

    })


})