<template>
  <div>
    <div class="mb-3 bg-white shadow p-5 hotel-wrap rounded-lg">
      <div class="grid grid-cols-2 gap-3 mb-3">
        <div class="flex flex-col gap-3">
          <USkeleton variant="text" class="shadow md:!w-[200px]" />
          <USkeleton variant="h3" class="shadow md:!w-[300px]" />
          <USkeleton variant="text" class="shadow md:!w-[100px]" />
        </div>
        <div class="flex items-start justify-end">
          <USkeleton variant="button" class="shadow md:!w-[100px]" />
        </div>
      </div>
      <div class="grid grid-cols-12 gap-1 md:gap-6">
        <div class="col-span-12 md:col-span-9 mb-3 mb-md-0">
          <div class="flex items-center hotel-images gap-[4px]">
            <div class="w-[50%] !h-[171px]">
              <USkeleton variant="image" class="img !w-full !h-full" />
            </div>
            <div
              class="flex-col gap-[10px] w-[50%] sm:w-[35%] md:w-[35%] lg:w-[35%] xl:w-[35%] !h-[171px]"
            >
              <USkeleton variant="image" class="!w-full img !h-[49%] mb-1" />
              <USkeleton variant="image" class="!w-full img !h-[49%]" />
            </div>
            <div class="flex flex-col gap-[4px] w-[15%] h-[171px]">
              <USkeleton variant="image" class="w-full img !h-[50%] mb-1" />
              <USkeleton variant="image" class="w-full img !h-[50%]" />
            </div>
          </div>
        </div>
        <div
          class="col-span-12 md:col-span-3 bg-gray-100 shadow rounded p-3 h-[171px]"
        >
          <div class="data-images rate-wrap">
            <USkeleton variant="text" class="!w-[200px]" />
            <USkeleton variant="h3" class="!w-[200px]" />
            <div v-for="index in 2" :key="index" class="mb-2">
              <USkeleton variant="p" class="!w-1/2" />
              <USkeleton variant="text" class="!w-full" />
            </div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-5 mt-3">
        <div v-for="index in 2" :key="index">
          <USkeleton variant="h3" class="shadow md:!w-[300px]" />
          <div class="grid gap-3 grid-cols-1 md:grid-cols-2">
            <div v-for="index in 8" :key="index" class="flex gap-2">
              <USkeleton variant="circle" class="shadow !w-[15px] !h-[15px]" />
              <USkeleton variant="text" class="shadow !w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
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
    <div class="shadow bg-white p-3 rounded mb-3 flex flex-col gap-3">
      <USkeleton variant="h3" class="shadow !w-1/5" />
      <USkeleton variant="text" class="shadow !w-1/3" />
      <USkeleton variant="image" class="shadow !w-full !h-[400px]" />
    </div>
  </div>
</template>
<script setup lang="ts"></script>
