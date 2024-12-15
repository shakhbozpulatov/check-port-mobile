<template>
  <div class="bg-white px-2 py-3 rounded transition">
    <div v-for="(elem, index) in 3" :key="index + 'elem'" class="mb-5">
      <USkeleton class="!w-[70%] !h-5 mb-2" variant="h1" />
      <USkeleton class="!w-full mb-3 h-10" variant="button" />
      <div class="flex flex-col">
        <USkeleton class="!w-[30%] h-4 mb-3" variant="text" />
        <div class="flex items-center gap-2 mb-3">
          <USkeleton class="w-5 h-5 rounded-full" variant="circle" />
          <USkeleton class="!w-2/3 h-5" variant="text" />
        </div>
        <div class="flex items-center gap-2 mb-3">
          <USkeleton class="w-5 h-5 rounded-full" variant="circle" />
          <USkeleton class="w-2/3 h-5" variant="text" />
        </div>
        <div class="flex items-center gap-2 mb-3">
          <USkeleton class="w-5 h-5 rounded-full" variant="circle" />
          <USkeleton class="w-2/3 h-5" variant="text" />
        </div>
        <div class="flex items-center gap-2">
          <USkeleton class="w-5 h-5 rounded-full" variant="circle" />
          <USkeleton class="w-2/3 h-5" variant="text" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
