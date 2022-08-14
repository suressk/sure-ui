import { isString } from 'sure-utils'

class SureUiError extends Error {
  constructor(m: string) {
    super(m)
    this.name = 'SureUI Error'
  }
}

export function throwError(scope: string, m: string): never {
  throw new SureUiError(`[${scope}] ${m}`)
}

export function debugWarn(err: Error): void
export function debugWarn(scope: string, message: string): void
export function debugWarn(scope: string | Error, message?: string): void {
  if (process.env.NODE_ENV !== 'production') {
    const error: Error = isString(scope)
      ? new SureUiError(`[${scope}] ${message}`)
      : scope

    console.warn(error)
  }
}
