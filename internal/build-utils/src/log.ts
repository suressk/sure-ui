import process from 'process'
import consola from 'consola'

/**
 * Log error message and exit command
 * @param err
 */
export function errorAndExit(err: Error): never {
  consola.error(err)
  process.exit(1)
}
