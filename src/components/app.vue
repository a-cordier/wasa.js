<style>

</style>

<template>
  <wasa-transport>
  </wasa-transport>
</template>

<script>
import { audioContext } from '../audio-context'
import { Sequencer } from '../wasa/core'
import { Kick } from '../wasa/blocks/kick'
import { Dispatcher, Events } from '../wasa/common/dispatcher'
import WasaTransport from './transport'

const kick = Kick({ audioContext })
  .setDuration(1)
  .setFinalFreq(10)
  .setFreq(100)

kick.connect({
  input: audioContext.destination,
})

export default {
  created() {
    this.sequencer = Sequencer({ audioContext })
      .onTick((tick, tempo, division) => {
        this.tick = tick
        this.time = this.sequencer.getTime()
        if (tick % division === 0) {
          kick.noteOff(audioContext.currentTime)
          kick.noteOn(audioContext.currentTime)
        }
      })
    Dispatcher
      .subscribe(Events.SEQUENCER_START, () => {
        this.sequencer.start()
      })
      .subscribe(Events.SEQUENCER_STOP, () => {
        this.sequencer.stop()
      })
  },
  components: {
    WasaTransport,
  }
}
</script>