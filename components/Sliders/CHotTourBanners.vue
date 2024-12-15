<template>
  <div class="mb-3">
    <h1 class="content-title my-3 h5 transition-200">
      {{ $t('663') }}
    </h1>
    <swiper
      :modules="modules"
      :slides-per-view="3"
      :init="false"
      :space-between="12"
      class="pagination-slider"
      :pagination="{ clickable: true }"
      :breakpoints="{
        980: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        430: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        0: {
          slidesPerView: 1.5,
          spaceBetween: 15,
        },
      }"
    >
      <swiper-slide v-for="(banner, index) in data" :key="index">
        <NuxtLinkLocale :to="`/tours/?${banner.link}`">
          <NuxtImg
            v-lazy-load
            loading="lazy"
            placeholder="/images/default.webp"
            fit="cover"
            placeholder-class="aspect-square object-cover h-[290px] max-w-[494px]"
            :data-url="banner?.banner"
            alt="img"
            class="object-cover rounded-2xl overflow-hidden bg-white w-full"
          />
        </NuxtLinkLocale>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script setup lang="ts">
import { Autoplay, Pagination } from 'swiper/modules'

const modules = [Pagination, Autoplay]
const { data } = await useAsyncData('hot-tours', () =>
  useApi().$get('https://b2c.asialuxe.app/api/banner/hot/'),
)
</script>
<style scoped lang="scss"></style>
