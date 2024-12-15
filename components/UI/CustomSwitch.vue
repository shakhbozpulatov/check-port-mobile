<template>
  <div
    class="custom-switch"
    :class="{ 'switch-on-bg': modelValue }"
    @click="toggleSwitch"
  >
    <div class="switch-handle" :class="{ 'switch-on': modelValue }"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue', 'change'])

const internalValue = ref(props.modelValue)

const toggleSwitch = () => {
  internalValue.value = !internalValue.value
}

watch(internalValue, (newVal) => {
  emit('update:modelValue', newVal)
  emit('change', newVal)
})
</script>

<style scoped>
.custom-switch {
  width: 40px;
  height: 20px;
  background-color: #eeeeee;
  border-radius: 15px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s;
}

.custom-switch .switch-handle {
  width: 18px;
  height: 18px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 1px;
  left: 1px;
  transition: left 0.3s;
}

.custom-switch .switch-handle.switch-on {
  left: 21px;
}

.custom-switch.switch-on-bg {
  background-color: #0073ff;
}

.custom-switch .switch-handle.switch-on {
  background-color: white;
}
</style>
