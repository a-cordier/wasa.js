<style lang="scss" type="text/scss" scoped>
	.toggle {
		button {
			width: 15px;
			height: 15px;
			border-radius: 50%;
			outline: none;
			display: block;
			margin: 10px auto;
			&.inactive {
				background-color: #995574;
			}
			&.active {
				background-color: #ff5574;
				box-shadow: 0px 0px 5px 0px #ff5574;

			}
		}
		.label {
			font-size: 9px;
			text-align: center;
			display: block;
			margin: 0 auto;
			color: white;
			font-family: "Lucida Console", Monaco, monospace;
		}
	}
</style>

<template>
	<div class="toggle">
		<button :class="{ active, inactive: !active }" @click="toggle()"></button>
		<span class="label">{{label}}</span>
	</div>
</template>

<script>
	import { times } from 'ramda'
	import { Dispatcher, Events } from 'wasa'

	export default {
		props: {
			label: {
				type: String,
			}
		},
		methods: {
			toggle() {
				this.active = !this.active
				this.$emit('toggle', this.active)
			},
		},
		data: () => ({
			active: false
		})
	}
</script>

