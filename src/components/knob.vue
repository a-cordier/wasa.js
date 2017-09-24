<style lang="sass" scoped>
.container {
    user-select: none;
    .knob { 
      display: block;
      margin: auto;
      width: 2.5vw;
      height: 2.5vw;

    circle.mainCircle {
      fill: #ccc;
      stroke: #8ab9b5;
      stroke-width: 5px;
    }

    circle.mainCircle.active {
      fill: #8ab9b5;
    }

    line {
      stroke: #444;
      stroke-width: 5px;
      stroke-linecap: round;
    }

  }
}

</style>

<template>
  <div class="container">
    <svg class="knob" viewBox="0 0 40 40" @mousedown="activate" :transform="rotate">
      <circle class="mainCircle" cx="20" cy="20" r="15" />
      <line x1="20" y1="15" x2="20" y2="10" />
    </svg>
  </div>
</template>

<script>
import { isNil } from 'ramda'
import { scale, unscale } from '../wasa/core/range'

export default {
  props: {
    value: {
      type: Number,
    },
  },
  created() {

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
      document.addEventListener('mouseup', this.desactivate)
      document.addEventListener('mousemove', this.drag)
      this.active = true
    },
    desactivate() {
      this.active = false
      document.removeEventListener('mouseup', this.desactivate)
      document.removeEventListener('mousemove', this.drag)
    },
    drag(event) {
      const incr = this.origin.y - event.pageY
      if(Math.abs(incr * 3) < 160) {
        this.angle = (incr * 3)
      }
      const value = scale({ min: -160, max: 160 }, this.angle)
      this.$emit('update', value)
    },
  },
}
</script>


