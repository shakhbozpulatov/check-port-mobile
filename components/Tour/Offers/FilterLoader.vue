<template>
  <div
    style="--el-skeleton-circle-size: 20px"
    class="bg-white px-2 py-3 rounded transition"
  >
    <div v-for="elem in 3" :key="elem + 'elem'" class="mb-3">
      <USkeleton class="!w-[70%] !h-6 mb-2" variant="h1" />
      <USkeleton class="!w-full mb-3" variant="button" />
      <div class="flex flex-col">
        <USkeleton class="!w-[30%] mb-3" variant="text" />
        <div class="flex items-center gap-2 mb-3">
          <USkeleton class="w-[20px]" variant="circle" />
          <USkeleton class="!w-[30%]" variant="text" />
        </div>
        <div class="flex items-center gap-2 mb-3">
          <USkeleton class="w-[20px]" variant="circle" />
          <USkeleton class="!w-[30%]" variant="text" />
        </div>
        <div class="flex items-center gap-2 mb-3">
          <USkeleton class="w-[20px]" variant="circle" />
          <USkeleton class="!w-[30%]" variant="text" />
        </div>
        <div class="flex items-center gap-2">
          <USkeleton class="w-[20px]" variant="circle" />
          <USkeleton class="!w-[30%]" variant="text" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
