import { defineStore } from 'pinia'

export const useSessionStore = defineStore('session', {
  state: () => ({
    hasSession: false,
  }),

  actions: {
    setHasSession(value: boolean) {
      this.hasSession = value
    },
  },
})
