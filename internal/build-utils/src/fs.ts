import { existsSync } from 'fs'
import { mkdir, writeFile } from 'fs/promises'

/**
 * Write json data to a file
 * @param path
 * @param data
 * @param spaces
 * @returns
 */
export const writeJson = (path: string, data: any, spaces = 0) =>
  writeFile(path, JSON.stringify(data, undefined, spaces), 'utf-8')

/**
 * Ensure directory is existed, if not, create it
 * @param path
 */
export const ensureDir = async (path: string) => {
  if (!existsSync(path)) {
    await mkdir(path, { recursive: true })
  }
}
