<style>
button {
  background-color: #B4D000;
  color: #fff;
  border: none;
}
</style>

<template>
  <div>
    <button v-on:click="start" id="start">Start</button>
    <button v-on:click="stop" id="stop">Stop</button>
  </div>
</template>

<script>
import { ipcRenderer as ipc } from 'electron'

export default {
  name: 'wasa-app',
  data() {
    return {}
  },
  methods: {
    start() {
      ipc.send('sequencer-start')
    },
    stop() {
      ipc.send('sequencer-stop')
    }
  },
}
</script>