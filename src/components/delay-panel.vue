<style lang="scss"  type="text/scss" scoped>
	#sn-panel {

		.parameters {

			.knob {
				display: block;
				width: 60px;
				margin: 10px auto 0 auto;
			}
		}
	}

</style>

<template>
	<div id="sn-panel">
		<div class="parameters">
			<knob class="knob" :value="getFrequencyValue()" @update="setFrequencyValue" :label="'freq.'"></knob>
			<knob class="knob" :value="getFeedbackValue()" @update="setFeedbackValue" :label="'feedback'"></knob>
			<knob class="knob" :value="getDivisionValue()" @update="setDivisionValue" :label="'division'"></knob>
		</div>
	</div>
</template>

<script>
	import Knob from "./knob.vue"
	import { unscale, scale } from "wasa"

	export default {
		props: {
			delay: { type: Object }
		},
		components: {
			Knob
		},
		created() {
		},
		data: () => ({}),
		methods: {
			setFrequencyValue(value) {
				this.delay.setFrequencyValue(unscale({ min: 100, max: 2000 }, value));
			},
			getFrequencyValue() {
				return scale({ min: 100, max: 2000 }, this.delay.getFrequencyValue() || 100)
			},
			setFeedbackValue(value) {
				this.delay.setFeedbackValue(unscale({ min: 1E-10, max: 0.8 }, value))
			},
			getFeedbackValue() {
				console.log(this.delay.getFeedbackValue())
				return scale({ min: 1E-10, max: 0.8 }, this.delay.getFeedbackValue() || 0)
			},
			setDivisionValue(value) {
				this.delay.setDivisionValue(unscale({ min: 1.5, max: 128 }, value))
			},
			getDivisionValue() {
				return scale({ min: 1.5, max: 128 }, this.delay.getDivisionValue() || 1.5)
			},
			setOutputGainValue(value) {
				this.delay.setOutputGainValue(value)
			},
			getOutputGainValue() {
				return this.delay.getOutputGainValue() || 0
			}
		}
	}
</script>
