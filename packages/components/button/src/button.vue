<script lang="ts" setup>
import { computed, ref } from 'vue'
import { SureIcon } from '@sure-ui/components/icon'
import { useNamespace } from '@sure-ui/hooks'
import { buttonEmits, buttonProps } from './button'

const props = defineProps(buttonProps)

const emit = defineEmits(buttonEmits)

defineOptions({
  name: 'SureButton'
})

const _ref = ref<HTMLButtonElement>()
const _type = computed(() => props.type || '')
const _disabled = computed(() => props.disabled || false)

const ns = useNamespace('button')

defineExpose({
  ref: _ref,
  type: _type
})

const handleClick = (evt: MouseEvent) => {
  emit('click', evt)
}
</script>

<template>
  <button
    ref="_ref"
    :class="[
      ns.baseCls(),
      ns.modifierCls(_type),
      ns.isCls('round', round),
      ns.isCls('circle', circle)
    ]"
    :aria-disabled="_disabled || loading"
    :disabled="_disabled || loading"
    @click="handleClick"
  >
    <template v-if="loading">
      <slot v-if="$slots.loading" name="loading" />
      <!-- ns.is('xxx') => add 'is-xxx' className -->
      <sure-icon v-else :class="ns.isCls('loading')">
        <component :is="loadingIcon" />
      </sure-icon>
    </template>

    <sure-icon v-else-if="icon || $slots.icon">
      <component :is="icon" v-if="icon" />
      <slot v-else name="icon" />
    </sure-icon>

    <span v-if="$slots.default">
      <!--
      :class="{ [ns.elementModifierCls('text', 'expand')]: shouldAddSpace }"
      add 'sure-button__text--expand' className to add `letter-space`
      -->
      <slot />
    </span>
  </button>
</template>
