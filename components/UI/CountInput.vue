<template>
  <div class="flex items-center gap-2">
    <UButton
      :disabled="min >= countValue"
      class="py-2"
      color="white"
      :ui="{
        color: {
          white: {
            solid: '!text-[#0073FF] disabled:opacity-[0.5] !rounded-md',
          },
        },
      }"
      @click="substract"
      ><i class="fa-solid fa-minus"></i
    ></UButton>
    <UInput
      v-model="countValue"
      :disabled="disabled"
      readonly
      type="number"
      class="w-[50px] *:!text-center *:!shadow-none *:!ring-0"
    />
    <UButton
      :disabled="max <= countValue || disabled"
      class="py-2"
      color="white"
      :ui="{
        color: {
          white: {
            solid: '!text-[#0073FF] disabled:opacity-[0.5] !rounded-md',
          },
        },
      }"
      @click="adding"
      ><i class="fa-solid fa-plus"></i
    ></UButton>
  </div>
</template>
<script setup lang="ts">
interface Props {
  modelValue: number
  min: number
  max: number
  disabled: boolean
}
const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()
const countValue = ref(props.modelValue)

const adding = () => {
  emit('update:modelValue', ++countValue.value)
}
const substract = () => {
  emit('update:modelValue', --countValue.value)
}
</script>
<style scoped lang="scss"></style>
