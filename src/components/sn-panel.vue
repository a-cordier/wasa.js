<style lang="scss"  type="text/scss">
	#sn-panel {

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
	<div id="sn-panel">
		<div class="parameters">
			<knob class="knob" :value="getFrequencyValue()" @update="setFrequencyValue" :label="'freq.'"></knob>
			<knob class="knob" :value="getNoiseFilterValue()" @update="setNoiseFilterValue" :label="'filter'"></knob>
			<knob class="knob" :value="getDurationValue()" @update="setDurationValue" :label="'duration'"></knob>
			<knob class="knob" :value="getOscMixValue()" @update="setOscMixValue" :label="'mix'"></knob>
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
		created() {
		},
		data: () => ({}),
		methods: {
			setFrequencyValue(value) {
				this.drum.setFrequencyValue(unscale({ min: 300, max: 600 }, value))
			},
			getFrequencyValue() {
				return scale({ min: 300, max: 600 }, this.drum.getFrequencyValue())
			},
			setNoiseFilterValue(value) {
				this.drum.setNoiseFilterValue(unscale({ min: 100, max: 4500 }, value))
			},
			getNoiseFilterValue() {
				return scale({ min: 100, max: 4500 }, this.drum.getNoiseFilterValue())
			},
			setDurationValue(value) {
				this.drum.setDurationValue(unscale({ min: 0.25, max: 2 }, value))
			},
			getDurationValue() {
				return scale({ min: 0.25, max: 2 }, this.drum.getDurationValue())
			},
			getOscMixValue() {
				return scale({ min: -1, max: 1 }, this.drum.getOscMixValue())
			},
			setOscMixValue(value) {
				this.drum.setOscMixValue(unscale({ min: -1, max: 1 }, value))
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
