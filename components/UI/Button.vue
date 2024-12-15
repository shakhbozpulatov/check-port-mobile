<template>
  <button
    v-bind="{ type, id }"
    class="py-1.5 px-4 transition-200 transform active:!scale-95 rounded-lg text-sm group"
    :class="variants[variant]"
  >
    <slot />
  </button>
</template>
<script setup lang="ts">
interface Props {
  type?: 'button' | 'submit'
  variant?: 'primary' | 'success' | 'light'
  id: string
}
withDefaults(defineProps<Props>(), {
  type: 'submit',
  variant: 'primary',
})

const variants = {
  primary: 'border border-blue hover:text-white hover:bg-blue',
  success: 'border border-green-500',
  light: 'bg-[#0073ff20] text-[#0073ff]',
}
</script>
