it('request - GET', () => {

    cy.request('https://swapi.dev/api/people').then((resp) => {
        // redirect status code is 302
        expect(resp.status).to.eq(200)
    })
})

it('request - GET', () => {

    cy.request('https://swapi.dev/api/people').then((resp) => {
        // redirect status code is 302
        expect(resp.status).to.eq(200)
    })
})