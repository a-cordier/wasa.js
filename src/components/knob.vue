<style lang="scss" type="text/scss" scoped>

	.container {
		user-select: none;
		outline: none;
		.knob {
			display: block;
			margin: auto;

			circle.main-circle {
				fill: #ccc;
				stroke: #999;
				stroke-width: 2;
			}

			circle.main-circle.active {
				fill: #999;
			}

			line {
				stroke: #444;
				stroke-width: 2;
				stroke-linecap: round;
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
	<div class="container">
		<svg class="knob" viewBox="0 0 60 60">
			<g @mousedown="toggleActive" @mousewheel="wheel" :transform="rotate" @contextmenu="menu">
				<circle class="main-circle" cx="30" cy="30" r="15"></circle>
				<line x1="30" y1="25" x2="30" y2="10"></line>
			</g>
		</svg>
		<span class="label">{{label}}</span>
	</div>
</template>

<script>
	import { isNil } from 'ramda'
	import { scale, unscale } from 'wasa'

	export default {
		props: {
			value: {
				type: Number,
			},
			label: {
				type: String,
			},
			menuEventHandler: Object,
		},
		created() {
			this.angle = unscale({ min: -160, max: 160 }, this.value)
		},
		computed: {
			rotate() {
				return `rotate(${this.angle}, 30, 30)`
			}
		},
		data: () => ({
			angle: 0,
			active: false,
		}),
		methods: {
			toggleActive(event) {
				if (event.which !== 1) {
					return
				}
				this.origin = {
					x: event.pageX,
					y: event.pageY,
				}
				document.addEventListener('mousemove', this.drag)
				document.addEventListener('mouseup', this.toggleInactive)
				this.active = true
			},
			toggleInactive() {
				this.active = false
				document.removeEventListener('mouseup', this.toggleInactive)
				document.removeEventListener('mousemove', this.drag)
			},
			drag(event) {
				event.preventDefault()
				const increment = (this.origin.y - event.pageY)
				this.updateAngle(increment)
			},
			wheel(event) {
				event.preventDefault()
				this.updateAngle(event.wheelDeltaY, 0.25)
			},
			updateAngle(increment, ease = 0.5) {
				const angle = this.angle + (increment * ease)
				if (increment < 0 && angle > -160 || increment >= 0 && angle < 160) {
					this.angle = angle
					const value = scale({ min: -160, max: 160 }, this.angle)
					this.$emit('update', value)
				}
			},
			menu(event) {
				event.preventDefault()
				event.stopPropagation()
				if (this.menuEventHandler) {
					this.menuEventHandler.handleMenuEvent(event)
				}
			},
		},
	}
</script>


