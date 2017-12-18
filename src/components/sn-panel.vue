<style lang="scss" type="text/scss" scoped>
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
			<knob class="knob" :value="getNoiseFilterValue()" @update="setNoiseFilterValue" :label="'filter'"></knob>
			<knob class="knob" :value="getDurationValue()" @update="setDurationValue" :label="'duration'"></knob>
			<knob class="knob" :value="getOutputGainValue()" @update="setOutputGainValue" :label="'gain'"></knob>
			<knob class="knob" :value="getSfxOneDryWetValue()" @update="setSfxOneDryWetValue"
				  :label="'sfx1'" :menuEventHandler="SfxMenuEventHandler({ sfxController: drum.sfxDryWetMixerOne })"></knob>
		</div>
	</div>
</template>

<script>
	import Knob from "./knob.vue"
	import { unscale, scale } from "wasa"
	import { SfxMenuEventHandler } from '../menus/sfx-menu-event-handler'

	export default {
		props: {
			drum: { type: Object }
		},
		components: {
			Knob
		},
		created() {
		},
		data: () => ({
			SfxMenuEventHandler,
		}),
		methods: {
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
			setOutputGainValue(value) {
				this.drum.setOutputGainValue(value)
			},
			getOutputGainValue() {
				return this.drum.getOutputGainValue()
			},
			setSfxOneDryWetValue(value) {
				this.drum.sfxDryWetMixerOne.setFadeValue(unscale({ min: -1, max: 1 }, value))
			},
			getSfxOneDryWetValue() {
				return scale({ min: -1, max: 1 }, this.drum.sfxDryWetMixerOne.getFadeValue())
			}
		}
	}
</script>
