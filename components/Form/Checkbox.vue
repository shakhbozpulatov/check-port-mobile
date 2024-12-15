<template>
  <label
    class="inline-flex items-center gap-x-2 transition ease-out cursor-pointer group"
    :class="(labelCLass, disabled ? 'cursor-no-drop' : 'cursor-pointer')"
  >
    <span
      class="border-2 cursor-pointer flex-center border-[#dcdfe6] bg-white rounded w-5 h-5 flex-shrink-0 relative overflow-hidden transition-all"
      :class="{
        '!bg-primary border-none rotate-0 transition-all': modelValue,
      }"
    >
      <i
        class="text-xs text-white flex items-center justify-center mt-0.5 transition-all"
        :class="[
          {
            'opacity-100 transition-all fa-duotone fa-solid fa-check':
              modelValue,
          },
        ]"
      ></i>
      <input
        ref="check"
        type="checkbox"
        :value="id"
        v-bind="{ name }"
        :checked="modelValue"
        :disabled="disabled"
        :class="disabled ? 'cursor-no-drop' : 'cursor-pointer'"
        class="w-5 h-5 opacity-0 absolute top-0 left-0 checked:text-white"
        @change="handleInput"
      />
    </span>
    <span class="flex items-center justify-between w-full gap-2">
      <slot>
        <span class="font-medium text-sm group-hover:text-red transition-all">{{
          toCamelCase(text)
        }}</span>
      </slot>
      <i
        class="icon-chevron-down text-xl text-red transition-all"
        :class="{
          'opacity-100': showIcon,
          'rotate-180 transition-all': isOpen,
        }"
      ></i>
    </span>
  </label>
</template>
<script setup lang="ts">
defineProps<{
  text?: string
  id?: number | string
  labelCLass?: string
  showIcon?: boolean
  parent?: boolean
  isOpen?: boolean
  modelValue: boolean
  name?: string
  disabled?: boolean | undefined
}>()
const toCamelCase = (str) => {
  return str
    .toLowerCase()
    .split(' ')
    .map((word, index) => {
      if (index === 0) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    .join(' ')
}
const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
}>()

const handleInput = (e: Event) => {
  emit('update:modelValue', e.target?.checked)
}
</script>
