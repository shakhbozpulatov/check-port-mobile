<template>
  <div ref="slider" class="custom-slider minmax">
    <div class="minmax-indicator"></div>
    <input
      id="min"
      ref="inputMin"
      type="range"
      name="min"
      :min="min"
      :max="max"
      :value="minValue"
      @input="onInput"
      @change="emit('on-change')"
    />
    <output for="min"></output>
    <input
      id="max"
      ref="inputMax"
      type="range"
      name="max"
      :min="min"
      :max="max"
      :value="maxValue"
      @input="onInput"
      @change="emit('on-change')"
    />
  </div>
</template>
<script setup>
import { ref, watchEffect } from 'vue'

// define component props for the slider component
const { min, max, minValue, maxValue } = defineProps({
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  step: {
    type: Number,
    default: 1,
  },
  minValue: {
    type: Number,
    default: 50,
  },
  maxValue: {
    type: Number,
    default: 80,
  },
})

// define emits for the slider component
const emit = defineEmits(['update:minValue', 'update:maxValue', 'on-change'])

// define refs for the slider element and the slider values
const slider = ref(null)
const inputMin = ref(null)
const inputMax = ref(null)
const sliderMinValue = ref(minValue)
const sliderMaxValue = ref(maxValue)

// function to get the percentage of a value between the min and max values
const getPercent = (value, min, max) => {
  return ((value - min) / (max - min)) * 100
}
// function to set the css variables for width, left and right
const setCSSProps = (left, right) => {
  slider.value.style.setProperty('--progressLeft', `${left}%`)
  slider.value.style.setProperty('--progressRight', `${right}%`)
}

// watchEffect to emit the updated values, and update the css variables
// when the slider values change
watchEffect(() => {
  if (slider.value) {
    // emit slider values when updated
    emit('update:minValue', sliderMinValue.value)
    emit('update:maxValue', sliderMaxValue.value)

    // calculate values in percentages
    const leftPercent = getPercent(sliderMinValue.value, min, max)
    const rightPercent = 100 - getPercent(sliderMaxValue.value, min, max)

    // set the CSS variables
    setCSSProps(leftPercent, rightPercent)
  }
})

// validation sliderMinValue do not greater than sliderMaxValue and opposite
const onInput = ({ target }) => {
  if (target.name === 'min') {
    target.value > sliderMaxValue.value
      ? (target.value = sliderMaxValue.value)
      : (sliderMinValue.value = parseFloat(target.value))
  }

  if (target.name === 'max') {
    target.value < sliderMinValue.value
      ? (target.value = sliderMinValue.value)
      : (sliderMaxValue.value = parseFloat(target.value))
  }
}
</script>
<style>
@import '@/assets/style/scss/_range_slider.scss';
</style>
