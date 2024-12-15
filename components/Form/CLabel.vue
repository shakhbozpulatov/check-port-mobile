<template>
  <label :for="forId" class="text-dark text-[12px] font-medium">
    {{ text }} <span class="text-[#3392FF]">*</span></label
  >
</template>
<script setup lang="ts">
interface Props {
  required?: boolean
  forId?: string
  text: string
}
defineProps<Props>()
</script>
