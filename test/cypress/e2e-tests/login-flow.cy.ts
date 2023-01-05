describe('Login flow', () => {
  it('should be able to handle the login happy path', () => {
    // 401 will make the user stay on /login because they are unauthenticated
    cy.intercept('HEAD', '/api/session', {
      statusCode: 401,
    })
    cy.visit('/login')

    cy.intercept('/api/auth/oauth/discord', {
      fixture: 'html/login/oauth.html',
    }).as('redirectToOAuth')

    // on click of the discord login button, they will be redirected to the OAuth page
    cy.dataCy('discord-login-btn').click()
    cy.wait('@redirectToOAuth')

    /*
     * by clicking this, user finishes OAuth process
     *
     * the user will actually be redirected to the callback page
     */
    cy.dataCy('redirect-href').click()

    // this is to trick the callback page that the user really was successful
    cy.intercept('HEAD', '/api/session', {
      statusCode: 200,
    })

    // callback page will redirect user to the landing page
    cy.wait(200)
    cy.url().should('contain', 'landing')
  })
})

export {}
