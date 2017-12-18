<style lang="scss" type="text/scss" scoped>

	.spin-box {
		background-color: #444;
		border-radius: 0;
		padding-left: 2px;
		padding-right: 2px;
		position: relative;
		transition: all 1s;
		display: block;
		&:hover {
			background-color: #555;
			input[type=number] {
				color: #ff5574;
			}

		}

		input[type=number] {
			background-color: transparent;
			border: none;
			color: #8ab9b5;
			font-size: 20px;
			font-weight:  900;
			margin: 0;
			outline: none;
			padding: 0 15px 0 10px;
			text-align: left;
			&::-webkit-inner-spin-button {
				-webkit-appearance: none;

			}
			&::-webkit-outer-spin-button {
				-webkit-appearance: none;
			}
		}
		.spin-box-arrow-wrapper {
			border-left: 2px solid white;
			position: absolute;
			top: 0;
			bottom: 0;
			right: 0;
			button {
				border: none;
				display: block;
				font-size: 15px;
				color: #8ab9b5;
				background-color: #444;
				margin: 0;
				padding: 0 2.5px 0 2.5px;
				width: 140%;
				height: 50%;
				outline: none;
				&:hover {
					background-color: #555;
					color: #ff5574;
				}
				&[data-action="up"] {
					border-radius: 0 0 0 0;
					line-height: 50%;
				}
				&[data-action="down"] {
					border-radius: 0 0 0 0;
					line-height: 50%;
				}
			}
		}

	}
</style>

<template>
	<div class="spin-box">
		<input
			v-model.number="value"
			ref="input"
			type="number"
			name=""
			:min="min"
			:max="max"
			:step="step"
			@change="onChange">
		<div class="spin-box-arrow-wrapper">
			<button ref="up" data-action="up" @click="onArrowClicked"><i class="fa fa-chevron-up" aria-hidden="true"></i></button>
			<button ref="down" data-action="down" @click="onArrowClicked"><i class="fa fa-chevron-down" aria-hidden="true"></i></button>
		</div>
	</div>
</template>

<script>
	import { clamp } from 'ramda'

	export default {
		name: 'spin-box',
		components: {},
		props: {
			min: {
				type: Number,
				default: -Infinity,
			},
			max: {
				type: Number,
				default: Infinity,
			},
			precision: {
				type: Number,
				default: 2,
			},
			init: {
				type: Number,
				default: 0
			},
			step: {
				type: Number,
				default: 1,
			},
		},
		data() {
			return {
				value: this.init
			}
		},
		methods: {
			onArrowClicked({ target }) {
				const sign = target === this.$refs.up ? 1 : -1
				const inc = sign * this.step
				this.value = Number((inc + this.value).toFixed(this.precision))
			},
			onChange() {
				this.$emit('change', this.value)
			},
		},
	}
</script>
