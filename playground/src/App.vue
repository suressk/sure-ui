<script lang="ts" setup>
import { ref } from 'vue'
import { SureIcon } from '@sure-ui/components'
import { Apple, Chrome } from 'sure-icons-vue'
import Comp from './components/Comp.vue'

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
    <br>
    <br>
    <Comp class="sure-comp" />
    <br>
    <a href="https://npmjs.com/package/sure-icons-vue">sure-icons-vue</a>
    <br>
    <SureIcon color="#2177b8" :size="20">
      <Apple />
    </SureIcon>
    <SureIcon color="#45b787" size="30px">
      <Chrome />
    </SureIcon>
    <Apple style="height: 2em; width: 2em; color: #fbda41;" />
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
