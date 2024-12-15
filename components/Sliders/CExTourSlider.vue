<template>
  <div
    v-if="
      customTourBannersStore?.some((el) => !el?.info_tour && !el?.umra_status)
    "
    class="mb-3"
  >
    <h1 class="content-title my-3 h5 transition-200">
      {{ $t('507') }}
    </h1>
    <swiper
      :modules="modules"
      :init="false"
      :slides-per-view="3"
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
      <swiper-slide>
        <a :href="`/custom-tours/income-list`" class="shadow-md drop-shadow">
          <NuxtImg
            v-lazy-load
            placeholder="/images/default.webp"
            :data-url="
              lang === 'uz'
                ? '/images/banners/city_break_uz.jpg'
                : lang === 'en'
                  ? '/images/banners/city_break_en.jpg'
                  : lang === 'tr'
                    ? '/images/banners/city_break_tr.jpg'
                    : '/images/banners/city_break_ru.jpg'
            "
            alt="img"
            loading="lazy"
            placeholder-class="aspect-square object-cover h-[290px] max-w-[494px]"
            class="object-cover bg-white w-full rounded-2xl"
          />
        </a>
      </swiper-slide>
      <template v-for="(banner, index) in sliderImgs">
        <swiper-slide
          v-if="!banner?.info_tour && !banner?.umra_status"
          :key="index"
        >
          <a
            target="_blank"
            :href="`/${locale}/custom-tours/${banner?.id}`"
            class="drop-shadow"
          >
            <NuxtImg
              v-lazy-load
              placeholder="/images/default.webp"
              placeholder-class="aspect-square object-cover h-[290px] max-w-[494px]"
              :data-url="banner?.img"
              :alt="banner?.img"
              loading="lazy"
              class="bg-white w-full rounded-2xl"
            />
          </a>
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

import { useApi } from '~/composables/useApi'

const modules = [Pagination, Autoplay]
const customTourBannersStore = ref([])
const { locale } = useI18n()
const sliderImgs = ref({})
const lang = useCookie('i18n_redirect')

const getTourList = function () {
  useApi()
    .$get('https://b2c.asialuxe.app/api/tours_ex/list.php')
    .then((res) => {
      customTourBannersStore.value = res
      sliderImgs.value = res.map((element: object) => {
        return {
          img: element.img,
          id: element.id,
          umra_status: element.umra_status,
          info_tour: element.info_tour,
        }
      })
    })
}

getTourList(locale.value)
</script>

<style scoped lang="scss">
.pagination-slider {
  padding-bottom: 50px;
}
</style>
