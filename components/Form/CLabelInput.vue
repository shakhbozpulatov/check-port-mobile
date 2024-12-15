<template>
  <div class="input-wrap">
    <label for="name" class="label">
      <slot name="label" />
    </label>
    <div class="!w-full">
      <el-input
        :model-value="modelValue"
        :type="inputType"
        :placeholder="placeholder"
        size="large"
        class="e-input"
        :class="[inputClass, { error: error }]"
        :input-style="inputClass"
        :show-password="props.inputType === 'password'"
        @input="handleInput"
      >
        <slot name="input" />
      </el-input>
    </div>
  </div>
</template>

<script setup lang="ts">
import { convertCyrillicToLatin, isCyrillic } from '@/utils/constants'

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

interface Props {
  modelValue: string
  inputType?: string
  isLatin?: boolean
  inputClass?: string
  error?: boolean
  placeholder: string
}
const props = withDefaults(defineProps<Props>(), {
  inputType: 'text',
})
const handleInput = (e: string) => {
  const val = isCyrillic(e)
  if (val && props.isLatin) {
    emit('update:modelValue', convertCyrillicToLatin(e))
  } else {
    emit('update:modelValue', e)
  }
}
</script>

<style lang="scss">
@import '@/scss/style';
.input-wrap {
  margin-top: 10px;
  .label {
    @include common-text-style(14px, 500, normal);
    color: #344054;
    margin-bottom: 6px;
  }
  .e-input {
    border-radius: 8px;
  }
}
</style>
