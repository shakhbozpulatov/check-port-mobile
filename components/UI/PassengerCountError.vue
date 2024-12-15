<template>
  <div class="text-xs text-white bg-orange-500 py-1 px-2 rounded-lg">
    {{ $t('782', { count }) }}
  </div>
</template>
<script setup lang="ts">
interface Props {
  count: number
}
defineProps<Props>()
</script>
