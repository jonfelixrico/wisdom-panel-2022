import { defineStore } from 'pinia'

export const useSessionStore = defineStore('session', {
  state: () => ({
    isAuthenticated: false,
  }),

  actions: {
    setIsAuthenticated(value: boolean) {
      this.isAuthenticated = value
    },
  },
})
