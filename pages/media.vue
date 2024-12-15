<template>
  <div>
    <UIHeader> {{ $t('679') }} </UIHeader>
    <NuxtImg
      format="webp"
      class="rounded shadow mb-3 min-h-[200px] object-contain"
      :src="`/images/slider_banner/media_detail_${locale}.jpg`"
      alt="img"
    />
    <div class="container mt-4">
      <div class="p-3 bg-white rounded shadow">
        <div v-if="locale === 'uz'">
          <h1 class="h2">{{ $t('751') }}</h1>
          <p>{{ $t('752') }}</p>
        </div>
        <SlidersCNewsList class="mt-4" :count="'all'" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()
const links = [
  {
    label: t('79'),
    icon: 'i-heroicons-home',
    to: `/${locale.value}`,
  },
  {
    label: t('679'),
    icon: '',
  },
]

useSeoMeta({
  title: t('192'),
  ogTitle: t('192'),
  description: t('746'),
  ogDescription: t('746'),
})
</script>
