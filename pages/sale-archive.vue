<template>
  <div>
    <UIHeader without-image> {{ $t('871') }} </UIHeader>
    <div class="container mt-32">
      <div
        class="p-3 bg-white rounded shadow dark:text-white-100 dark:bg-dark-700"
      >
        <!--        <NuxtImg
          format="webp"
          class="rounded shadow mb-3"
          :src="
            locale === 'uz'
              ? '/images/slider_banner/archive_detail_uz.jpg'
              : '/images/slider_banner/archive_detail_ru.jpg'
          "
          alt="img"
        />-->
        <div v-if="locale === 'uz'" class="dark:text-white-100">
          <h1 class="h2">{{ $t('871') }}</h1>
          <p>{{ $t('871') }}</p>
        </div>
        <SlidersCArchiveList class="mt-4" :count="'all'" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

useSeoMeta({
  title: t('871'),
  ogTitle: t('871'),
  description: t('871'),
  ogDescription: t('871'),
})
</script>
<style scoped lang="scss"></style>
