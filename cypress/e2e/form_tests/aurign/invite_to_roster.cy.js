
describe.only('Invite to roster', () => {
    const serverId = 'z0nua9ss'; // Replace SERVER_ID with an actual Mailosaur Server ID
    const uuid = () => Cypress._.random(0, 1e6)
    const id = uuid()
    const testname = `testname${id}`
    const firstname = `firstname${id}`
    const lastname = `lastname${id}`
    const stagename = `stagename${id}`
    const Email = `${testname}@${serverId}.mailosaur.net`
    const testEmail = 'autotestbussines@z0nua9ss.mailosaur.net'

    it('Enter register data', () => {
        cy.visit('https://front-platform.orion.studio/login/')
        cy.get('input[name*="email"]').type(testEmail).should('have.value', testEmail);
        cy.get('input[name*="password"]').type('qwerty12');
        cy.contains('CONTINUE').click();
    })

    it('Invite by email', () => {
        cy.xpath('//*[@id="__next"]/div/div[3]/div/div[2]/div[2]/div[2]').click()
        cy.get('input[name="email"]').type(Email)
        cy.get('.check-button').click();
        cy.wait(2000);
        cy.xpath('/html/body/div[2]/div/div[2]/div/div[2]/div/div/form/div[5]/div[2]/div/div/div/div/div').click();
        cy.get('[title="Artist"]').click();
        cy.xpath('/html/body/div[2]/div/div[2]/div/div[2]/div/div/form/div[1]/div/div[1]/input')
            .type(34).should('have.value', '34');

        cy.get('button').contains('Send invitation').click();

    })
    it('Get invite link', () => {
        cy.mailosaurGetMessage(serverId, {
            sentTo: Email
        }).then(email => {
            expect(email.subject).to.equal('User Roster Invite (Unregistered)');
            let inviteLink = '';
            inviteLink = email.html.links[0].href;
            cy.log(inviteLink);

        })
    })

    it('Follow to invite link', (inviteLink) => {
        cy.visit(`${inviteLink}`)
    })
})