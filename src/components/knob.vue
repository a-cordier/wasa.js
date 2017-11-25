<style lang="scss" type="text/scss" scoped>

	.container {
    user-select: none;
    outline:none;
    .knob {
      display: block;
      margin: auto;

    circle.mainCircle {
      fill: #ccc;
      stroke: #999;
      stroke-width: 5px;
    }

    circle.mainCircle.active {
      fill: #999;
    }

    line {
      stroke: #444;
      stroke-width: 5px;
      stroke-linecap: round;
    }

	}
		.label {
			font-size: 9px;
			color: white;
			font-family: "Lucida Console", Monaco, monospace;
  }
}

</style>

<template>
  <div class="container">
    <svg class="knob" viewBox="0 0 40 40" @mousedown="activate" @mousewheel="wheel" :transform="rotate">
      <circle class="mainCircle" cx="20" cy="20" r="15" />
      <line x1="20" y1="15" x2="20" y2="10" />
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
	  }
  },
  created() {
    this.angle = unscale({ min: -160, max: 160 }, this.value)
  },
  computed: {
    rotate() {
      return `rotate(${this.angle})`
    }
  },
  data: () => ({
    angle: 0,
    active: false,
  }),
  methods: {
    activate(event) {
      this.origin = {
        x: event.pageX,
        y: event.pageY,
      }
      document.addEventListener('mousemove', this.drag)
      document.addEventListener('mouseup', this.desactivate)
      this.active = true
    },
    desactivate() {
      this.active = false
      document.removeEventListener('mouseup', this.desactivate)
      document.removeEventListener('mousemove', this.drag)
    },
    drag(event) {
      event.preventDefault()
      const incr = (this.origin.y - event.pageY)
      this.updateAngle(incr)
    },
    wheel(event) {
      event.preventDefault()
	  this.updateAngle(event.wheelDeltaY, 0.25)
    },
    updateAngle(incr, ease = 0.5) {
      const angle = this.angle + (incr * ease)
      if (incr < 0 && angle > -160 || incr >= 0 && angle < 160) {
        this.angle = angle
        const value = scale({ min: -160, max: 160 }, this.angle)
        this.$emit('update', value)
      }
    },
  },
}
</script>


