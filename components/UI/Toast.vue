<template>
  <div
    class="max-w-[350px] w-full transition duration-200 ease-in overflow-hidden"
  >
    <div class="gap-2">
      <span :class="iconClass[type]"></span>
      <p class="leading-100 text-left w-full text-black mb-1">
        {{ text }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  show?: boolean
  text?: string
  type: 'success' | 'error' | 'warning'
}

defineProps<Props>()

const iconClass = {
  success: 'icon-check text-green-500',
  error: 'icon-xmark-lg text-red-500',
}
</script>

<style scoped>
@keyframes toast {
  from {
    transform: translateY(-100%) translateX(-50%);
  }
  to {
    transform: translateY(0) translateX(-50%);
  }
}

.toast-enter-active {
  animation: toast 0.3s;
}

.toast-leave-active {
  animation: toast 0.3s reverse;
}
</style>
