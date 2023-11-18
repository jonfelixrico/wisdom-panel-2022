import { defineStore } from 'pinia'
import { SystemParamters } from 'src/types/system-parameters.interface'

interface Store {
  syspars: null | SystemParamters
}

export const useSysparStore = defineStore('syspars', {
  state: (): Store => ({
    syspars: null,
  }),
  actions: {
    setSyspars(syspars: SystemParamters) {
      this.syspars = syspars
    },
  },
})
