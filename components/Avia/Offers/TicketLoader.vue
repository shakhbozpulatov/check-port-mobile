<template>
  <div
    class="grid grid-cols-12 bg-white p-5 shadow rounded-2xl gap-4 md:gap-3 mb-4"
  >
    <div class="col-span-12 md:col-span-10 grid grid-cols-12 gap-4 items-end">
      <div class="col-span-6 flex flex-col justify-end md:col-span-2">
        <USkeleton variant="text" class="mb-3 w-full h-4 !hidden md:!block" />
        <USkeleton variant="text" class="mb-2 w-full h-4" />
        <USkeleton variant="h3" class="mb-2 w-full h-4" />
        <USkeleton variant="text" class="w-full h-4" />
      </div>
      <div
        class="col-span-12 order-[-1] md:order-[0] md:col-span-8 flex flex-wrap gap-4 items-start"
      >
        <div class="grid md:hidden grid-cols-3 w-full gap-3 col-span-12">
          <USkeleton variant="text" />
          <div></div>
          <USkeleton variant="text" />
        </div>
        <div class="flex items-start w-full gap-2">
          <USkeleton class="w-5 h-5 rounded-full" />
          <div class="w-full flex flex-col items-center">
            <USkeleton class="w-full !h-[15px] mb-1" />
            <USkeleton class="!w-[30%] h-4" />
          </div>
          <USkeleton class="w-5 h-5 rounded-full" />
        </div>
      </div>
      <div class="col-span-6 flex flex-col justify-end md:col-span-2">
        <USkeleton variant="text" class="mb-3 w-full h-4 !hidden md:!block" />
        <USkeleton variant="text" class="mb-2 w-full h-4" />
        <USkeleton variant="h3" class="mb-2 w-full h-4" />
        <USkeleton variant="text" class="w-full h-4" />
      </div>
    </div>
    <div
      class="col-span-12 md:col-span-2 gap-2 flex flex-col flex-wrap items-center justify-center"
    >
      <div class="flex flex-row w-full gap-2 md:flex-col items-center">
        <USkeleton variant="h1" class="md:!w-2/3 h-7" />
        <USkeleton variant="h1" class="md:!w-2/3 h-7" />
      </div>
      <USkeleton variant="text" class="!w-2/3 h-5" />
    </div>
  </div>
</template>
<script setup lang="ts"></script>
