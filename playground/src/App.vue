<script lang="ts" setup>
import { ref } from 'vue'
import { SureIcon } from '@sure-ui/components'
import * as icons from 'sure-icons-vue'
import { generateRandomHex } from 'sure-utils'
// import Comp from './components/Comp.vue'

const count = ref(0)
const colors: string[] = []
const len = Object.entries(icons).length
for (let i = 0; i < len; i++) {
  colors.push(generateRandomHex())
}

const change = () => {
  count.value++
}
</script>

<template>
  <div class="temp">
    <h1>Hello sure-ui!</h1>
    <p>{{ count }}</p>
    <button @click="change">
      count++
    </button>
    <br>
    <br>
    <a href="https://npmjs.com/package/sure-icons-vue">sure-icons-vue</a>
    <br>
    <br>
    <SureIcon
      v-for="(Icon, key, i) in icons"
      :key="Icon.name"
      :size="30"
      :color="colors[i]"
      :loading="key === 'Loading'"
    >
      <component :is="Icon" />
    </SureIcon>
  </div>
</template>

<style>
html,
body {
  width: 100vw;
  height: 100vh;
  margin: 0;
}
.temp {
  height: 100%;
  width: 100%;
  text-align: center;
  /* display: flex;
  align-items: center;
  justify-content: center; */
}
</style>
