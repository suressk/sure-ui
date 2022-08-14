<script lang="ts" setup>
import { computed, ref } from 'vue'
import { SureIcon } from '@sure-ui/components/icon'
import { buttonEmits, buttonProps } from './button'

const props = defineProps(buttonProps)

const emit = defineEmits(buttonEmits)

const _ref = ref<HTMLButtonElement>()
const _type = computed(() => props.type || '')

defineOptions({
  name: 'SureButton'
})

defineExpose({
  ref: _ref,
  type: _type
})

const handleClick = (evt: MouseEvent) => {
  emit('click', evt)
}
</script>

<template>
  <button ref="_ref" @click="handleClick">
    <template v-if="loading">
      <slot v-if="$slots.loading" name="loading" />
      <sure-icon v-else class="sure-icon sure-icon-loading">
        <component :is="loadingIcon" />
      </sure-icon>
      <span v-if="loading" class="sure-icon sure-icon-loading" />
    </template>

    <sure-icon v-else-if="icon || $slots.icon">
      <component :is="icon" v-if="icon" />
      <slot v-else name="icon" />
    </sure-icon>

    <span>
      <slot />
    </span>

    <!-- :class="{ [ns.em('text', 'expand')]: shouldAddSpace }" -->
    <span
      v-if="$slots.default"
    >
      <slot />
    </span>
  </button>
</template>
