import { buildRoot } from '@sure-ui/build-utils'
import type { TaskFunction } from 'gulp'
import { run } from './process'

/**
 * Add task name of gulp task func
 * @param name
 * @param fn
 * @returns
 */
export const withTaskName = <T extends TaskFunction>(name: string, fn: T) =>
  Object.assign(fn, { displayName: name })

/**
 * Run gulp task
 * @param name
 * @returns
 */
export const runTask = (name: string) =>
  withTaskName(`shellTask:${name}`, () =>
    run(`pnpm run start ${name}`, buildRoot)
  )
