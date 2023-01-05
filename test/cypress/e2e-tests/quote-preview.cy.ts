describe('Quote preview', () => {
  it('should prevent navigation if an error was encountered', () => {
    // to not make the
    cy.intercept('/api/session', {
      statusCode: 200,
    })
    cy.intercept('HEAD', '/api/server/server-1/quote/quote-1', {
      statusCode: 404,
    })

    cy.visit('preview/server/server-1/quote/quote-1')
    cy.wait(200)

    // should be navigated away
    cy.url().should('not.contain', 'server/server-1/quote/quote-1')
    // inform the user about the problem
    cy.withinDialog({
      persistent: true,
      fn() {
        // required; intended to be empty. we just want to check the presence of a dialog.
      },
    })
  })
})

export {}
