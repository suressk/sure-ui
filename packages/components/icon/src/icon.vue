<script lang="ts" setup>
import { computed } from 'vue'
import type { CSSProperties } from 'vue'
import { addUnit, isUndefined } from '@sure-ui/utils'
import { iconProps } from './icon'

const props = defineProps(iconProps)

// Waitting for being achieved
defineOptions({
  name: 'SureIcon'
  // 继承 attrs（属性）
  // inheritAttrs: false
})

const style = computed<CSSProperties>(() => {
  if (!props.size && !props.color) {
    return {}
  }

  return {
    'fontSize': isUndefined(props.size) ? undefined : addUnit(props.size),
    '--color': props.color
  }
})
</script>

<template>
  <i class="sure-icon" :style="style">
    <slot />
  </i>
</template>
