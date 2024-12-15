<template>
  <div class="h-[50vh] flex justify-center items-center w-full">
    <div
      class="bg-white flex flex-col items-center justify-center rounded-md shadow p-3 md:w-1/3 m-auto"
    >
      <div class="m-auto mb-4">
        <img
          class="logo md:h-[55px] h-[40px]"
          src="/images/ny_logo.svg"
          alt=""
        />
        <img
          class="logo md:h-[55px] h-[40px] hidden"
          src="/images/logo_white.svg"
          alt=""
        />
      </div>
      <div class="grid gap-3 grid-cols-1 md:grid-cols-2">
        <a
          target="_blank"
          href="https://play.google.com/store/apps/details?id=uz.asialuxe.twa.nga"
          ><UButton class="w-full"
            ><i class="fa-brands fa-google-play me-2"></i>
            {{ $t('741') }}</UButton
          ></a
        >
        <a
          target="_blank"
          href="https://apps.apple.com/uz/app/asialuxe-travel/id1557116939"
        >
          <UButton class="w-full"
            ><i class="fa-brands fa-app-store-ios me-2"></i>
            {{ $t('740') }}</UButton
          ></a
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: t('668'),
  ogTitle: t('668'),
  description: t('667'),
  ogDescription: t('667'),
})
</script>
