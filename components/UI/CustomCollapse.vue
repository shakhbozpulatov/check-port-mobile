<template>
  <div>
    <div
      role="tab"
      :aria-expanded="active ? 'true' : 'false'"
      class="flex justify-between items-center py-2 cursor-pointer"
      @click.prevent="toggle"
    >
      <slot name="header">
        <span class="text-[#303133] font-semibold text-[15px]">
          {{ title }}</span
        >
        <i
          :class="{ '-rotate-90': !active }"
          class="fa-regular fa-chevron-down font-normal text-xs transition-200"
        ></i>
      </slot>
    </div>
    <transition name="fade" mode="out-in">
      <div v-if="active" class="collapse-content">
        <div class="collapse-content-box overflow-y-auto d-scroll">
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'

interface Props {
  selected: boolean
  title?: string
}
const props = defineProps<Props>()
const { width } = useWindowSize()
const $emit = defineEmits<{
  (e: 'collapse-open', val: boolean): void
}>()
const active = ref(props.selected)
const toggle = () => {
  active.value = !active.value
  if (active.value) {
    $emit('collapse-open', active.value)
  }
}

if (width.value < 768) {
  active.value = !active.value
}
</script>

<style></style>
