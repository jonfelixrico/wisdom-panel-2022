import CLoginCard from 'components/login/CLoginCard.vue'
import { createTestingPinia } from '@pinia/testing'
import { SystemParamters } from 'src/types/system-parameters.interface'

describe('LoginCard', () => {
  it('shows the login button', () => {
    createTestingPinia({
      createSpy: cy.spy,
    })

    cy.mount(CLoginCard)

    cy.dataCy('discord-login-btn').should('exist')
  })

  it('shows the invite button', () => {
    createTestingPinia({
      initialState: {
        syspars: {
          syspars: {
            discordBotInviteUrl: 'http://test-invite-url',
          } as SystemParamters,
        },
      },
      createSpy: cy.spy,
    })

    cy.mount(CLoginCard)

    cy.dataCy('bot-invite')
      .should('exist')
      .should('have.attr', 'href', 'http://test-invite-url')
  })
})
