<template>
  <div class="flex">
    <div
      v-for="(item, index) in options"
      :key="index"
      class="py-1 px-3 bg-white border shrink-0 text-xs cursor-pointer rounded-sm transition-200"
      :class="{
        'border-blue-500 text-blue-500': modelValue === item[valueKey],
      }"
      @click="$emit('update:modelValue', item[valueKey])"
    >
      {{ item[labelKey] }}
    </div>
  </div>
</template>
<script setup lang="ts">
interface Props {
  options: { [key: string]: string }[]
  labelKey: string
  valueKey: string
  modelValue: string
}

defineProps<Props>()
const $emit = defineEmits<{
  (e: 'update:modelValue', val: string): void
}>()
</script>
