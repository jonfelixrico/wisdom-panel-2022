import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { isAxiosError } from 'src/utils/axios.utils'

export const useSessionStore = defineStore('session', {
  state: () => ({
    hasSession: false,
  }),

  actions: {
    setHasSession(value: boolean) {
      this.hasSession = value
    },

    async fetchSession() {
      if (this.hasSession) {
        return true
      }

      try {
        await api.head('session')
        this.setHasSession(true)
        return true
      } catch (e) {
        if (isAxiosError(e) && e.response?.status === 401) {
          return false
        }

        // unexpected error, has to be handled by the caller
        throw e
      }
    },
  },
})
