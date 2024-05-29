<script setup>
import { reactive } from 'vue';
import ManageToDoTimerData from './utils/manageToDoTimerData.js'
import MyClient from './components/MyClient.vue'

const manageToDoTimerData = reactive(new ManageToDoTimerData(window));
</script>

<template>
  <div class="app-root">
    <MyClient
      v-bind:manageToDoTimerData="manageToDoTimerData"
    ></MyClient>
  </div>
</template>

<style scoped>
.app-root {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
