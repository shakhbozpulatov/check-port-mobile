<template>
  <div>
    <FormCheckbox
      v-for="(city, index) in options"
      :key="index"
      :model-value="modelValue.includes(String(city.name))"
      @update:model-value="onUpdateModelValue(String(city.name))"
    >
      <div v-if="!isNaN(Number(city?.name))">
        <div class="custom-rate">
          <i
            v-for="n in 5"
            :key="n"
            :class="[
              'fa-star !text-[18px]',
              n <= Number(city?.name)
                ? 'fa-solid !text-[#ffcc00]'
                : 'fa-regular !text-[#ccc]',
            ]"
          ></i>
        </div>
      </div>
      <span v-else class="text-[17px] ms-1 text-[#f7ba2a] tracking-widest">{{
        city.name
      }}</span>
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
