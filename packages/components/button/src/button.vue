<script lang="ts" setup>
import { computed, ref } from 'vue'
import { SureIcon } from '@sure-ui/components/icon'
import { buttonEmits, buttonProps } from './button'

const props = defineProps(buttonProps)

const emit = defineEmits(buttonEmits)

defineOptions({
  name: 'SureButton'
})

const _ref = ref<HTMLButtonElement>()
const _type = computed(() => props.type || '')

defineExpose({
  ref: _ref,
  type: _type
})

const handleClick = (evt: MouseEvent) => {
  emit('click', evt)
}
</script>

<template>
  <button ref="_ref" class="sure-button" @click="handleClick">
    <template v-if="loading">
      <slot v-if="$slots.loading" name="loading" />
      <sure-icon v-else loading>
        <component :is="loadingIcon" />
      </sure-icon>
    </template>

    <sure-icon v-else-if="icon || $slots.icon">
      <component :is="icon" v-if="icon" />
      <slot v-else name="icon" />
    </sure-icon>

    <!-- :class="{ [ns.em('text', 'expand')]: shouldAddSpace }" -->
    <span
      v-if="$slots.default"
    >
      <slot />
    </span>
  </button>
</template>
