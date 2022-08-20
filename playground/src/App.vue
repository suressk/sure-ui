<script lang="ts" setup>
import { ref } from 'vue'
import * as icons from 'sure-icons-vue'
import { generateRandomHex } from 'sure-utils'

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
    <sure-icon
      v-for="(Icon, key, i) in icons"
      :key="Icon.name"
      :size="30"
      :color="colors[i]"
      :class="{
        'is-loading': key === 'Loading'
      }"
    >
      <component :is="Icon" />
    </sure-icon>
    <br>
    <br>
    <sure-button type="primary" loading round />
    <sure-button type="primary" :icon="icons.Github" circle />
    <br>
    <sure-button type="primary" loading :loading-icon="icons.Flash">
      button content
    </sure-button>
  </div>
</template>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  width: 100vw;
  height: 100vh;
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
