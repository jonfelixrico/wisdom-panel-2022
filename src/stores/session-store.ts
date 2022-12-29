import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { isAxiosError } from 'src/utils/axios.utils'

interface SessionState {
  hasSession: 'UNLOADED' | boolean
}

export const useSessionStore = defineStore('session', {
  state: (): SessionState => ({
    hasSession: 'UNLOADED',
  }),

  actions: {
    async fetchSession() {
      if (this.hasSession !== 'UNLOADED') {
        return this.hasSession
      }

      try {
        await api.head('session')
        this.hasSession = true
        return true
      } catch (e) {
        if (isAxiosError(e) && e.response?.status === 401) {
          this.hasSession = false
          return false
        }

        // unexpected error, has to be handled by the caller
        throw e
      }
    },
  },
})
