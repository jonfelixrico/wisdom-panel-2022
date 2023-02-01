import { boot } from 'quasar/wrappers'
import pino, { Logger } from 'pino'
import { inject, InjectionKey } from 'vue'

const pinoInstance = pino({
  level: 'debug', // TODO let the env vars dicate this
})

/**
 * Statically imports the logger.
 * Recommended to be used outside of components (e.g. utils, classes).
 *
 * @param context
 * @returns
 */
export function getLogger(context?: string) {
  return pinoInstance.child({
    mode: 'static',
    context,
  })
}

const LOGGER_TOKEN: InjectionKey<Logger> = Symbol('logger token')
/**
 * Inject the logger via Vue inject/provide.
 * Recommended to be used inside components.
 *
 * @param context
 * @returns
 */
export function useLogger(context?: string) {
  const logger = inject(LOGGER_TOKEN, pinoInstance)
  return logger.child({
    context,
    mode: 'inject',
  })
}

export default boot(({ app }) => {
  app.provide(LOGGER_TOKEN, pinoInstance)
  getLogger('boot').debug('pino initialied')
})
