import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { getLogger } from 'src/boot/pino-logger'

interface Store {
  syspars: null | Record<string, string>
}

const LOGGER = getLogger('store:syspars')

export const useSysparStore = defineStore('syspars', {
  state: (): Store => ({
    syspars: null,
  }),
  actions: {
    async fetchSyspars() {
      if (this.syspars) {
        LOGGER.debug("Skipping syspar fetch because it's already been cached")
        return
      }

      const { data } = await api.get<Record<string, string>>(
        '/system-parameters'
      )
      this.syspars = data
    },
  },
})
