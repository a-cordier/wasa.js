<style lang="scss"  type="text/scss">
	#bd-panel {
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
	<div id="bd-panel">
		<div class="parameters">
			<knob class="knob" :value="getFundamentalValue()" @update="setFundamentalValue" :label="'fund.'"></knob>
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
			setFundamentalValue(value) {
				this.drum.setFundamentalValue(unscale({ min: 15, max: 60 }, value))
			},
			getFundamentalValue() {
				return scale({ min: 15, max: 60 }, this.drum.getFundamentalValue())
			},
			setDurationValue(value) {
				this.drum.setDurationValue(unscale({ min: 0.05, max: 1 }, value))
			},
			getDurationValue() {
				return scale({ min: 0.05, max: 1 }, this.drum.getDurationValue())
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
