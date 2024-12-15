<template>
  <div>
    <NuxtPage />
  </div>
</template>
<script setup lang="ts">
const store = useMainStore()

useAsyncData(() =>
  Promise.allSettled([store.getCharters(), store.getCharterList()]).catch(
    (err) => console.log(err),
  ),
)
</script>
