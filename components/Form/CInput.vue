<template>
  <div>
    <label
      v-if="text"
      :for="id"
      class="text-dark text-[12px] font-medium mb-1 block"
    >
      {{ text }} <span class="text-[#3392FF]">*</span></label
    >
    <div
      class="flex items-center focus-within:border-blue rounded-[1rem] max-h-[40px]"
      :class="{ '!border-red-500': error }"
    >
      <slot name="prefix"></slot>
      <input
        v-bind="{
          placeholder,
          type,
          minlength,
          maxlength,
          id,
          required,
          disabled,
          readonly,
        }"
        :value="modelValue"
        class="outline-none border border-[#ddd] w-full py-2 px-3 rounded-[1rem] h-[48px] text-black text-base"
        :class="inputClass"
        @input="handleInput($event.target?.value)"
        @focus="emit('focus')"
        @blur="emit('blur')"
        @change="emit('change')"
      />
      <slot name="suffix"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { convertCyrillicToLatin, isCyrillic } from '@/utils'

interface Props {
  modelValue: string
  type?: string
  placeholder: string
  id?: string
  maxlength?: number
  minlength?: number
  required?: boolean
  readonly?: boolean
  disabled?: boolean
  error?: boolean
  text?: string
  isLatin?: boolean
  inputClass?: string
}
const props = withDefaults(defineProps<Props>(), {
  type: 'text',
})
const emit = defineEmits<{
  (e: 'update:modelValue', val: string): void
  (e: 'focus'): void
  (e: 'blur'): void
  (e: 'change'): void
}>()
const handleInput = (e: string) => {
  const val = isCyrillic(e)
  if (val && props.isLatin) {
    emit('update:modelValue', convertCyrillicToLatin(e))
  } else {
    emit('update:modelValue', e)
  }
}
</script>
