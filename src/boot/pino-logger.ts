import { boot } from 'quasar/wrappers'
import pino, { Logger } from 'pino'
import { InjectionKey, provide } from 'vue'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $logger: Logger
  }
}

export const logger = pino({
  level: 'debug', // TODO let the env vars dicate this
})

export const LOGGER_TOKEN: InjectionKey<Logger> = Symbol('logger token')

export default boot(({ app }) => {
  app.config.globalProperties.$logger = logger
  app.provide(LOGGER_TOKEN, logger)

  logger.debug('pino logger ready')
})

export function useLogger() {
  return provide(LOGGER_TOKEN, logger)
}
