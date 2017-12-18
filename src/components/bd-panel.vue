<style lang="scss" type="text/scss">
	#bd-panel {
		.parameters {
			/deep/ .toggle {
				margin: 10px auto 0 auto;
			}
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
			<knob class="knob" :value="getFrequencyValue()" @update="setFrequencyValue" :label="'freq.'"></knob>
			<knob class="knob" :value="getDurationValue()" @update="setDurationValue" :label="'duration'"></knob>
			<knob class="knob" :value="getOutputGainValue()" @update="setOutputGainValue" :label="'gain'"></knob>
			<toggle @toggle="mute" :label="'mute'"></toggle>
		</div>
	</div>
</template>

<script>
	import Knob from './knob.vue'
	import Toggle from './toggle.vue'
	import { unscale, scale } from 'wasa'
	import { ifElse, identity } from 'ramda'

	export default {
		props: {
			drum: { type: Object }
		},
		components: {
			Knob,
			Toggle,
		},
		created() {
		},
		data: () => ({

		}),
		methods: {
			setFrequencyValue(value) {
				this.drum.setFrequencyValue(unscale({ min: 140, max: 160 }, value))
			},
			getFrequencyValue() {
				return scale({ min: 140, max: 160 }, this.drum.getFrequencyValue())
			},
			setDurationValue(value) {
				this.drum.setDurationValue(unscale({ min: 0.15, max: 0.5 }, value))
			},
			getDurationValue() {
				return scale({ min: 0.15, max: 0.5 }, this.drum.getDurationValue())
			},
			setOutputGainValue(value) {
				this.drum.setOutputGainValue(value)
			},
			getOutputGainValue() {
				return this.drum.getOutputGainValue()
			},
			mute(active) {
				ifElse(identity, this.drum.mute, this.drum.unMute)(active)
			},
		}
	}
</script>
