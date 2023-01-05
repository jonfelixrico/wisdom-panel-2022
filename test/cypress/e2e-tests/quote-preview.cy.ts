describe('Quote preview', () => {
  it('should prevent navigation if an error was encountered', () => {
    // to not make the login page navigate us out
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

  it('should navigate to the preview page and show the contents', () => {
    // to not make the login page navigate us out
    cy.intercept('/api/session', {
      statusCode: 200,
    })

    // set up endpoints for displaying the preview
    cy.intercept('/api/server/server-1/quote/quote-1', {
      id: 'quote-1',
      content: 'Lorem ipsum',
      authorId: 'user-1',
      submitterId: 'user-2',
      submitDt: '2023-01-05T17:21:29.403Z',
      serverId: 'server-1',
      receives: [
        {
          id: 'receive-1',
          userId: 'user-2',
        },
        {
          id: 'receive-2',
          userId: 'user-2',
        },
        {
          id: 'receive-3',
          userId: 'user-3',
        },
      ],
    }).as('getQuote')

    cy.intercept('/dummy-avatar', { fixture: 'images/dummy-avatar.png' })
    cy.intercept('/api/server/server-1/user/user-1', {
      username: 'User 1',
      avatarUrl: '/dummy-avatar',
    })
    cy.intercept('/api/server/server-1/user/user-2', {
      username: 'User 2',
      avatarUrl: '/dummy-avatar',
    })
    cy.intercept('/api/server/server-1/user/user-3', {
      username: 'User 3',
      avatarUrl: '/dummy-avatar',
    })

    cy.visit('preview/server/server-1/quote/quote-1')
    cy.wait('@getQuote')

    cy.url().should('contain', 'server/server-1/quote/quote-1')
  })
})

export {}
