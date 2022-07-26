import { isNumber, isString } from 'sure-utils'
import { debugWarn } from '@sure-ui/utils'

const SCOPE = 'utils/dom/style'

/**
 * Add unit func
 * @param value
 * @param defaultUnit
 * @returns
 */
export function addUnit(value?: string | number, defaultUnit = 'px') {
  if (!value) {
    return ''
  }
  if (isString(value)) {
    return value
  } else if (isNumber(value)) {
    return `${value}${defaultUnit}`
  }
  debugWarn(SCOPE, 'binding value must be a string or number')
}
