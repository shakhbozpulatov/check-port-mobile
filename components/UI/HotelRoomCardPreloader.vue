<template>
  <div>
    <div class="grid gap-3 grid-cols-1 md:grid-cols-2 mb-3">
      <div
        v-for="index in 2"
        :key="index"
        class="flex flex-col gap-3 justify-center items-center"
      >
        <USkeleton variant="text" class="shadow !w-1/3" />
        <div class="w-full bg-white rounded shadow p-3 grid grid-cols-3 gap-2">
          <div class="flex flex-col justify-between">
            <USkeleton variant="text" class="shadow !m-0 mb-3" />
            <USkeleton variant="text" class="shadow !m-0 !w-1/2 mb-3" />
          </div>
          <div class="flex flex-col items-end gap-3 justify-between">
            <USkeleton variant="text" class="shadow !m-0 !w-1/2 mb-3" />
            <USkeleton variant="text" class="shadow !m-0 mb-3" />
          </div>
          <div class="flex flex-col gap-3 justify-between">
            <USkeleton variant="text" class="shadow !m-0 mb-3" />
            <USkeleton variant="text" class="shadow !m-0 !w-1/2 mb-3" />
          </div>
        </div>
      </div>
    </div>
    <div
      class="p-3 grid-cols-12 grid rounded gap-3 w-full shadow bg-[#3392ff2e] mb-3"
    >
      <div
        v-for="index in 2"
        :key="index"
        class="flex flex-col gap-2 md:col-span-4 col-span-12"
      >
        <USkeleton variant="text" class="shadow !w-1/3" />
        <USkeleton variant="button" class="shadow !w-full" />
      </div>
      <div
        v-for="index in 2"
        :key="index"
        class="flex flex-col gap-2 md:col-span-2 justify-end col-span-12"
      >
        <USkeleton v-if="index === 1" variant="text" class="shadow !w-1/3" />
        <USkeleton variant="button" class="shadow !w-full" />
      </div>
    </div>
    <div class="shadow p-3 rounded bg-white mb-3">
      <USkeleton variant="h3" class="shadow !w-1/5" />
      <div
        v-for="index in 3"
        :key="index"
        class="grid grid-cols-12 rounded gap-3 border mb-3"
      >
        <div class="col-span-12 md:col-span-3">
          <USkeleton variant="image" class="shadow !w-full !h-[150px]" />
        </div>
        <div
          class="p-3 gap-3 col-span-12 md:col-span-9 grid grid-cols-1 md:grid-cols-3"
        >
          <div class="flex flex-col justify-center gap-3">
            <USkeleton variant="h3" class="shadow !w-1/2" />
            <USkeleton variant="p" class="shadow !w-1/4" />
            <div class="flex gap-3">
              <USkeleton
                v-for="index in 3"
                :key="index"
                variant="text"
                class="shadow"
              />
            </div>
          </div>
          <div class="flex items-center gap-3">
            <USkeleton variant="circle" class="shadow !w-[15px] !h-[15px]" />
            <USkeleton variant="text" class="shadow !w-full" />
          </div>
          <div class="flex gap-3">
            <div class="flex flex-col gap-3 w-full justify-center items-end">
              <USkeleton variant="h3" class="shadow" />
              <USkeleton variant="caption" class="shadow !w-1/3" />
            </div>
            <div class="w-full flex items-center">
              <USkeleton variant="button" class="shadow !w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
