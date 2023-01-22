export class PromiseCache {
  private cache: Record<string, Promise<unknown>> = {}

  wrap<T>(jobId: string, fnToWrap: () => Promise<T>): Promise<T> {
    if (!!this.cache[jobId]) {
      return this.cache[jobId] as Promise<T>
    }

    const fnPromise = fnToWrap()
    this.cache[jobId] = fnPromise
    return fnPromise
  }
}

let instance: PromiseCache
export function usePromiseCache() {
  if (!instance) {
    instance = new PromiseCache()
  }

  return instance
}
