<script lang="ts" setup>
import { Text, computed, defineProps, inject, ref, useSlots } from 'vue'
import { buttonProps } from './button'

const props = defineProps(buttonProps)

const _ref = ref<HTMLButtonElement>()
</script>

<template>
  <button ref="_ref">
    <span v-if="loading" class="" />
    <span>
      <slot />
    </span>
  </button>
</template>
