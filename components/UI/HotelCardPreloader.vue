<template>
  <div class="w-full mb-3 transition-200 rounded-lg overflow-hidden shadow">
    <div class="flex w-full bg-white rounded-lg">
      <USkeleton
        variant="image"
        style="width: 68%; height: 320px; border-radius: 0"
      />
      <div class="flex flex-col gap-3 w-full p-3 transition-200">
        <USkeleton variant="h1" class="h-[40px] !w-[200px]" />
        <div class="flex items-center justify-between w-full mb-3">
          <USkeleton variant="h1" class="h-[40px] !w-[300px]" />
          <USkeleton variant="h1" class="h-[40px] !w-[100px]" />
        </div>
        <div class="flex items-center gap-2 w-full">
          <USkeleton variant="h1" class="h-[40px] !w-[150px]" />
          <USkeleton variant="h1" class="h-[40px] !w-[150px]" />
        </div>
        <div class="flex items-center gap-2 w-full mb-3">
          <USkeleton variant="h1" class="h-[40px] !w-[100px]" />
          <USkeleton variant="h1" class="h-[40px] !w-[100px]" />
          <USkeleton variant="h1" class="h-[40px] !w-[100px]" />
        </div>
        <div class="flex flex-col items-end gap-2 w-full mb-3">
          <USkeleton variant="h1" class="!w-[130px]" />
          <USkeleton variant="button" class="h-[40px] !w-[130px]" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
