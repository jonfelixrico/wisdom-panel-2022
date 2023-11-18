import { boot } from 'quasar/wrappers'
import { useSysparStore } from 'src/stores/syspar-store'
import { getLogger } from './pino-logger'
import { api } from './axios'
import { SystemParamters } from 'src/types/system-parameters.interface'

const LOGGER = getLogger('boot:syspars')

export default boot(async () => {
  const sysparStore = useSysparStore()
  if (sysparStore.syspars) {
    LOGGER.debug("Skipping syspar fetch because it's already been cached")
    return
  }

  try {
    LOGGER.debug('Fetching syspars...')

    const { data } = await api.get<SystemParamters>('/system-parameters')
    sysparStore.setSyspars(data)

    LOGGER.info('Finished fetching syspars')
  } catch (e) {
    LOGGER.error(e, 'Error encountered while fetching syspars')
  }
})
