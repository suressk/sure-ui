<script lang="ts" setup>
import { ref } from 'vue'
import { SureIcon } from '@sure-ui/components'
import { Apple } from 'sure-icons-vue'
import CompVue from './components/Comp.vue'

// eslint-disable-next-line no-console
console.log('SureIcon:', SureIcon)

const count = ref(0)

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
    <p>
      <SureIcon color="#346c9c" class="sure-icon-article" />
      <SureIcon color="#fcd217" :size="20" class="sure-icon-flashing" />
      <SureIcon color="#d11c31" :size="30" class="sure-icon-like" />
      <SureIcon color="#45b787" :size="20" class="sure-icon-chrome" />
      <SureIcon color="#2177b8" class="sure-icon-overview" />
    </p>
    <CompVue class="sure-comp" />
    <br>
    <p>sure-icons-vue</p>
    <Apple style="height: 2em; width: 2em; color: #409eff;" />
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
