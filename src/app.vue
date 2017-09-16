<style>
button {
  background-color: #B4D000;
  color: #fff;
  border: none;
}
</style>

<template>
  <div>
    <div>
      <input type="range" min="1" max="240" v-on:change="setTempo">
    </div>
    <button v-on:click="start" id="start">Start</button>
    <button v-on:click="stop" id="stop">Stop</button>
    <p>Tempo: {{tempo}}</p>
    <p>Tick: {{tick}}</p>
    <p>Current Time: {{time}}</p>

  </div>
</template>

<script>
import { ipcRenderer as ipc } from 'electron'
import { audioContext } from './audio-context'
import { Sequencer } from './wasa/core'
import { Kick } from './wasa/blocks/kick'

const kick = Kick({ audioContext })

kick.connect({
  input: audioContext.destination,
})

export default {
  name: 'wasa-app',
  created() {
    this.sequencer = Sequencer({ audioContext })
      .onTick((tick, tempo, division) => {
        this.tick = tick
        this.time = audioContext.currentTime
        if (tick % division === 0) {
          kick.noteOn(200, audioContext.currentTime, 2)
        }
      })
  },
  data() {
    return {
      tick: 0,
      time: 0,
      tempo: 100,
    }
  },
  methods: {
    start() {
      this.sequencer.start()
    },
    stop() {
      this.sequencer.stop()
      this.tick = 0
    },
    setTempo(event) {
      this.tempo = Number(event.target.value)
      this.sequencer.setTempo(this.tempo)
    },
  },
}
</script>