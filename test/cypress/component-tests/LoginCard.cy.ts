import CLoginCard from 'components/login/CLoginCard.vue'
import { useSysparStore } from 'src/stores/syspar-store'
import { createTestingPinia } from '@pinia/testing'

describe('LoginCard', () => {
  it('shows the login button', () => {
    createTestingPinia({
      createSpy: cy.spy,
    })
    cy.wrap(useSysparStore()).as('store')

    cy.mount(CLoginCard)

    cy.dataCy('discord-login-btn').should('exist')
  })
})
