export * from './vue'
export * from './dom'
export * from './error'

export * from 'sure-utils'

// sure-utils has contained these funcs
// export const isElement = (el: unknown): el is Element => {
//   if (typeof Element === 'undefined') {
//     return false
//   }
//   return el instanceof Element
// }

// export const isUndefined = (val: unknown): val is undefined => (val === undefined)

// export const isNull = (val: unknown): val is null => (val === null)

// export const isSymbol = (val: unknown): val is symbol => (typeof val === 'symbol')

// export const isNumber = (val: unknown): val is number => (typeof val === 'number')

// export const isString = (val: unknown): val is string => (typeof val === 'string')
