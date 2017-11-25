<style lang="scss"  type="text/scss">
 #bd-panel {
    .parameters {
      .knob {
        display: block;
        width: 25px;
		    margin: 10px auto 0 auto;
	    }
    }
 }


</style>

<template>
    <div id="bd-panel">
        <div class="parameters">
            <knob class="knob" :value="getFrequencyValue()" @update="setFrequencyValue" :label="'freq.'"></knob>
            <knob class="knob" :value="getFinalFrequencyValue()" @update="setFinalFrequencyValue" :label="'final freq.'"></knob>
            <knob class="knob" :value="getDurationValue()" @update="setDurationValue" :label="'duration'"></knob>
			<knob class="knob" :value="getOutputGainValue()" @update="setOutputGainValue" :label="'gain'"></knob>
        </div>
    </div>
</template>

<script>
import Knob from "./knob.vue"
import { unscale, scale } from "wasa"

export default {
  props: {
    drum: { type: Object }
  },
  components: {
    Knob
  },
  created() {},
  data: () => ({}),
  methods: {
    setFrequencyValue(value) {
      this.drum.setFrequencyValue(unscale({ min: 100, max: 200 }, value))
    },
    getFrequencyValue() {
      return scale({ min: 100, max: 200 }, this.drum.getFrequencyValue())
    },
    setFinalFrequencyValue(value) {
      this.drum.setFinalFrequencyValue(unscale({ min: 1E-10, max: 10 }, value))
    },
    getFinalFrequencyValue() {
      return scale({ min: 1E-10, max: 10 }, this.drum.getFinalFrequencyValue())
    },
    setDurationValue(value) {
      this.drum.setDurationValue(unscale({ min: 0.5, max: 2 }, value))
	},
	getDurationValue() {
      return scale({ min: 0.5, max: 2 }, this.drum.getDurationValue())
    },
    getAttackValue() {
      return scale({ min: 1E-5, max: 0.25 }, this.drum.getAttackValue())
	},
	setAttackValue(value) {
      this.drum.setAttackValue(unscale({ min: 1E-5, max: 0.25 }, value))
    },
	setOutputGainValue(value) {
      this.drum.setOutputGainValue(value)
    },
    getOutputGainValue() {
      return this.drum.getOutputGainValue()
    }
  }
}
</script>
