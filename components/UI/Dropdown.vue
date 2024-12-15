<template>
  <div ref="target" class="relative">
    <div @click="isOpen = true">
      <slot name="header" />
    </div>
    <div
      v-if="isOpen"
      class="absolute mt-2 z-10 p-2 rounded-md bg-white shadow"
    >
      <slot name="content" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'

const isOpen = ref(false)
const target = ref(null)

onClickOutside(target, () => {
  isOpen.value = false
})
</script>
