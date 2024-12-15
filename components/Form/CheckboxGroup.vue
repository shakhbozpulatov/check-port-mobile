<template>
  <div class="flex flex-col gap-2">
    <FormCheckbox
      v-for="(item, index) in options"
      :key="index"
      :disabled="disabled"
      :model-value="modelValue.includes(item[valueKey] || item)"
      :text="item[labelKey] || item"
      @update:model-value="onUpdateModelValue(item[valueKey] || item)"
    />
  </div>
</template>
<script setup lang="ts">
interface Props {
  modelValue: string[]
  options?: { [key: string]: string | number }[]
  labelKey?: string
  valueKey?: string
  disabled?: boolean
}
const props = defineProps<Props>()
const $emit = defineEmits<{
  (e: 'update:modelValue', val: string[]): void
}>()
const selected = ref(props.modelValue)
const onUpdateModelValue = (id: string) => {
  if (selected.value.includes(id)) {
    selected.value.splice(
      selected.value.findIndex((el) => el === id),
      1,
    )
  } else {
    selected.value.push(id)
  }
  $emit('update:modelValue', selected.value)
}
</script>
