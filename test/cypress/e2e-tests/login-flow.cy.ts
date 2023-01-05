describe('Login flow', () => {
  it('should be able to handle the login happy path', () => {
    cy.intercept('HEAD', '/api/session', {
      statusCode: 401,
    })

    cy.visit('/login')

    cy.intercept('/api/auth/oauth/discord', {
      fixture: 'html/login/success-oauth.html',
    }).as('redirectToOAuth')

    cy.dataCy('discord-login-btn').click()
    cy.wait('@redirectToOAuth')

    cy.intercept('HEAD', '/api/session', {
      statusCode: 200,
    })

    cy.dataCy('redirect-href').click()
    cy.wait(500)

    cy.url().should('contain', 'landing')
  })
})

export {}
