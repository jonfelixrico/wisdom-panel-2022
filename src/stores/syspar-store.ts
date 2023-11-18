import { defineStore } from 'pinia'

interface Store {
  syspars: null | Record<string, string>
}

export const useSysparStore = defineStore('syspars', {
  state: (): Store => ({
    syspars: null,
  }),
  actions: {
    setSyspars(syspars: Record<string, string>) {
      this.syspars = syspars
    },
  },
})
