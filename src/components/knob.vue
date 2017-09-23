<template>
  <div>
    <svg class="knob" viewBox="0 0 40 40">
      <circle class="mainCircle" cx="20" cy="20" r="15" />
      <line x1="20" y1="20" x2="20" y2="10" />
    </svg>
  </div>
</template>

<style scoped>
.knob {
  width: 2vw;
  height: 2vw;
  user-select: none;
}

circle.mainCircle {
  fill: #ccc;
  stroke: #bbb;
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
</style>

