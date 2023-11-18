import { SystemParamters } from 'src/types/system-parameters.interface'

// TODO use component testing instead
describe('login elements', () => {
  before(() => {
    cy.intercept('HEAD', '/api/session', {
      statusCode: 401,
    })
  })

  it('shows the invite url', () => {
    cy.intercept('GET', '/api/system-parameters', {
      body: {
        discordBotInviteUrl: 'http://some-discord-bot-invite-url',
      } as SystemParamters,
    })

    cy.visit('/login')

    cy.dataCy('bot-invite')
      .should('exist')
      .should('have.attr', 'href', 'http://some-discord-bot-invite-url')
  })
})
