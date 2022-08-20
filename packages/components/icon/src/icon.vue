<script lang="ts" setup>
import { computed } from 'vue'
import type { CSSProperties } from 'vue'
import { addUnit, isUndefined } from '@sure-ui/utils'
import { useNamespace } from '@sure-ui/hooks'
import { iconProps } from './icon'

const props = defineProps(iconProps)

// Waitting for being achieved
defineOptions({
  name: 'SureIcon',
  // 继承 attrs（属性）
  inheritAttrs: false
})

const ns = useNamespace('icon')

const style = computed<CSSProperties>(() => {
  if (!props.size && !props.color) {
    return {}
  }

  return {
    'fontSize': isUndefined(props.size) ? undefined : addUnit(props.size),
    '--color': props.color
  }
})

// const cls = props.loading ? 'sure-icon sure-icon-loading' : 'sure-icon'
</script>

<template>
  <i :class="ns.baseCls()" :style="style" v-bind="$attrs">
    <slot />
  </i>
</template>
