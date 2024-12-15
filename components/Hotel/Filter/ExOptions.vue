<template>
  <div>
    <FormCheckbox
      v-for="(city, index) in options"
      :key="index"
      :model-value="modelValue.includes(city.id)"
      @update:model-value="onUpdateModelValue(city.id)"
    >
      <div
        class="flex items-center gap-1"
        :class="city.id === 1 ? 'text-[#0073FF]' : ''"
      >
        <img
          v-if="city?.id === 1"
          src="/images/mini_logo_blue.svg"
          alt=""
          class="w-[15px] h-[15px] mb-1"
        />
        <span>
          {{ city.id === 1 ? 'Asialuxe Exclusive' : city.name }}
        </span>
      </div>
    </FormCheckbox>
  </div>
</template>
<script setup lang="ts">
interface Props {
  modelValue: string[]
  options?: { [key: string]: string | number }[]
  labelKey?: string
  valueKey?: string
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
