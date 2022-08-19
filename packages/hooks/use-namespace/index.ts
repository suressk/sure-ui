import { computed, unref } from 'vue'

export const defaultNamespace = 'sure'
const statePrefix = 'is-'

const generateCls = (
  namespace: string,
  block: string,
  blockSuffix: string,
  element: string,
  modifier: string
) => {
  let cls = `${namespace}-${block}`
  if (blockSuffix) {
    cls += `-${blockSuffix}`
  }
  if (element) {
    cls += `__${element}`
  }
  if (modifier) {
    cls += `--${modifier}`
  }
  return cls
}

export const useNamespace = (block: string) => {
  const namespace = computed(() => defaultNamespace)
  /* base class, like: 'sure-button', 'sure-icon' ... */
  const baseCls = (blockSuffix = '') => generateCls(unref(namespace), block, blockSuffix, '', '')
  /* element class, like: 'sure-button__text' */
  const elementCls = (element = '') =>
    element ? generateCls(unref(namespace), block, '', element, '') : ''
  /* modifier class, like: 'sure-button--primary' */
  const modifierCls = (modifier = '') =>
    modifier ? generateCls(unref(namespace), block, '', '', modifier) : ''
  /* element modifier class, like: 'sure-button__text--primary' */
  const eleModifierCls = (element = '', modifier = '') =>
    modifier ? generateCls(unref(namespace), block, '', element, modifier) : ''
  /* is class, like: 'is-loading' */
  const isCls: {
    (name: string, state: boolean | undefined): string
    (name: string): string
  } = (name: string, ...args: [boolean | undefined] | []) => {
    const state = args.length >= 1 ? args[0]! : true
    return name && state ? `${statePrefix}${name}` : ''
  }
  return {
    namespace,
    baseCls,
    elementCls,
    modifierCls,
    eleModifierCls,
    isCls
  }
}
