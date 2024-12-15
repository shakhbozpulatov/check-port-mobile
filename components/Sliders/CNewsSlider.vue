<template>
  <div v-if="newsData?.some((el) => el?.smi)" class="mb-3">
    <div class="flex gap-3 justify-between">
      <h1 class="content-title my-3 h5 transition-200">
        {{ $t('679') }}
      </h1>
      <NuxtLinkLocale class="text-[#0073FF]" to="/media">
        {{ $t('746') }} <i class="ms-2 fa-regular fa-angle-right"></i
      ></NuxtLinkLocale>
    </div>

    <swiper
      :modules="modules"
      :init="false"
      :slides-per-view="5"
      :space-between="12"
      class="pagination-slider"
      :pagination="{ clickable: true }"
      :breakpoints="{
        1280: {
          slidesPerView: 5,
          spaceBetween: 15,
        },
        980: {
          slidesPerView: 4,
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
      <template v-for="(news, index) in newsData.slice(0, 5)">
        <swiper-slide v-if="news?.smi" :key="index">
          <NuxtLinkLocale :to="`/news/${news?.id}`" class="md:max-w-[289px]">
            <div class="relative pt-3">
              <div
                class="absolute top-0 left-0 bg-white z-10 flex gap-1 items-center rounded p-1"
              >
                <NuxtImg
                  :src="news?.icon"
                  :alt="news?.icon"
                  class="rounded-full aspect-auto"
                  width="40px"
                />
                <!--                <span class="text-[12px]">{{ news?.ex_name }}</span>-->
              </div>
              <NuxtImg
                v-lazy-load
                placeholder="/images/default.webp"
                fit="cover"
                placeholder-class="aspect-square object-cover w-full md:max-w-[288px] h-[162px]"
                loading="lazy"
                :data-url="
                  news?.anons_img_mob ? news?.anons_img_mob : news?.anons_img
                "
                alt="news image"
                class="rounded-t-2xl aspect-square object-cover w-full md:max-w-[288px] h-[162px]"
              />
            </div>
            <div
              class="rounded-b-2xl border bg-white transition-200 max-h-[113px] overflow-hidden border-t-0 p-3 pt-2 lg:max-w-[288px]"
            >
              <p class="text-[12px] text-[#AAAAAA]">
                {{ news?.date_create }}
                <!--                {{ dayjs(news.date_create).format('DD/MM/YYYY') }}-->
              </p>
              <p class="line-clamp-2 h-[48px] overflow-hidden transition-200">
                {{ news?.name }}
              </p>
              <p
                class="text-[12px] slider-news-descr line-clamp-3 h-[50px] overflow-hidden transition-200 news_description"
                v-html="getTruncatedDescription(news?.description)"
              ></p>
            </div>
          </NuxtLinkLocale>
        </swiper-slide>
      </template>
    </swiper>
  </div>
</template>
<script setup lang="ts">
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/swiper-bundle.css'

import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
const modules = [Pagination, Autoplay]
const newsData = ref([])
interface Props {
  count: string
}
defineProps<Props>()
const data = async () => {
  await useApi()
    .$get('https://b2c.asialuxe.app/api/banner/news/?limit=5')
    .then((res) => {
      newsData.value = res
    })
    .catch((err) => {
      console.log(err)
    })
}

const getTruncatedDescription = (text: string) => {
  const words = text.split(' ')
  return words.length > 10 ? words.slice(0, 10).join(' ') + '...' : text
}
data()
</script>

<style lang="scss">
.pagination-slider {
  padding-bottom: 50px;
}

.news_description {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.slider-news-descr img.w-50,
.slider-news-descr img,
.slider-news-descr img.m-auto {
  display: none !important;
}
</style>
