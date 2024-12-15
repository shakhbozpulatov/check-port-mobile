<template>
  <div v-if="newsData.length" class="mb-3">
    <h1 class="content-title my-3 h5 transition-200">
      {{ $t('683') }}
    </h1>
    <swiper
      v-if="newsData.length"
      :modules="modules"
      :init="false"
      :slides-per-view="4"
      :space-between="12"
      class="pagination-slider"
      :auto-height="true"
      :pagination="{ clickable: true }"
      :breakpoints="{
        980: {
          slidesPerView: 4,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 2,
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
      <template v-for="(sales, index) in newsData" :key="index">
        <swiper-slide>
          <a target="_blank" :href="`${sales?.link}`">
            <div class="relative pt-3">
              <NuxtImg
                v-lazy-load
                placeholder="/images/default.webp"
                fit="cover"
                placeholder-class="aspect-square w-full max-w-[388px] h-[206px] object-cover"
                loading="lazy"
                :data-url="sales?.anons_photo"
                :alt="sales?.anons_photo"
                class="aspect-video rounded-t-2xl object-cover w-full max-w-[388px] md:h-[190px] lg:h-[206px]"
              />
            </div>
            <div
              class="rounded-b-2xl border bg-white border-t-0 p-3 pt-2 transition-200 md:max-w-[388px]"
            >
              <p class="text-[12px] text-[#AAAAAA]">
                {{ sales?.date_create }}
              </p>
              <p
                class="line-clamp-3 h-[68px] overflow-hidden transition-200"
                v-html="sales?.anons_text"
              ></p>
            </div>
          </a>
        </swiper-slide>
      </template>
    </swiper>
  </div>
</template>
<script setup lang="ts">
import { Autoplay, Pagination } from 'swiper/modules'
const modules = [Pagination, Autoplay]
const newsData = ref([])
const { locale } = useI18n()

const { data } = await useAsyncData('sale', () =>
  $fetch('https://b2c.asialuxe.app/api/banner/sale/'),
)
newsData.value = data.value
</script>

<style scoped lang="scss">
.pagination-slider {
  padding-bottom: 50px;
}

.news_description {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
