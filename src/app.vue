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
    <p>Tick: {{tick}}</p>
    <p>Current Time: {{time}}</p>

  </div>
</template>

<script>
import { ipcRenderer as ipc } from 'electron'
import { audioContext } from './audio-context'

export default {
  name: 'wasa-app',
  created() {
    ipc.on('sequencer-tick', (event, tick) => {
      this.tick = tick
      this.time = audioContext.currentTime
    })
  },
  data() {
    return {
      tick: 0,
      time: 0,
    }
  },
  methods: {
    start() {
      ipc.send('sequencer-start')
    },
    stop() {
      ipc.send('sequencer-stop')
      this.tick = 0
    }
  },
}
</script>