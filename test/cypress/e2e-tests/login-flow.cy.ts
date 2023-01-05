describe('Login flow', () => {
  it('should visit login page if index page was accessed', () => {
    cy.intercept('HEAD', '/api/session', {
      statusCode: 401,
    })

    cy.visit('/')
    cy.wait(500)
    cy.url().should('contain', 'login')
  })
})

export {}
