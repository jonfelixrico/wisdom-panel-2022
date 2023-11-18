import { boot } from 'quasar/wrappers'
import { useSysparStore } from 'src/stores/syspar-store'
import { getLogger } from './pino-logger'
import { api } from './axios'

const LOGGER = getLogger('boot:syspars')

export default boot(async () => {
  const sysparStore = useSysparStore()
  if (sysparStore.syspars) {
    LOGGER.debug("Skipping syspar fetch because it's already been cached")
    return
  }

  const { data } = await api.get<Record<string, string>>('/system-parameters')
  sysparStore.setSyspars(data)
})
