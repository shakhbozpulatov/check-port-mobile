<template>
  <div class="bg-white shadow-md p-3 rounded-md mb-3">
    <div class="flex items-center justify-between mb-3">
      <USkeleton class="h-10 w-[300px]" />
      <div class="flex gap-2">
        <USkeleton v-for="item in 2" :key="item" class="h-10 w-[150px]" />
      </div>
    </div>
    <USkeleton v-for="item in 4" :key="item" class="h-14 w-full mb-3" />
  </div>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss"></style>
