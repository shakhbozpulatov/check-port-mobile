<template>
  <div class="grid grid-cols-12 gap-3">
    <div class="col-span-12 md:col-span-8">
      <swiper
        v-if="sliderImg?.length"
        :modules="modules"
        :init="false"
        :slides-per-view="1"
        :space-between="10"
        class="pagination-slider !pb-5"
        :pagination="{ clickable: true }"
        :breakpoints="{
          980: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          430: {
            slidesPerView: 1.3,
            spaceBetween: 10,
          },
          0: {
            slidesPerView: 1.3,
            spaceBetween: 10,
          },
        }"
      >
        <template v-for="(item, index) in sliderImg">
          <swiper-slide v-if="item?.archive !== '1'" :key="index">
            <NuxtLinkLocale
              :to="
                item.type === '2'
                  ? '/' + locale + '/' + item.id
                  : '/' + locale + item.link
              "
            >
              <NuxtImg
                v-lazy-load
                placeholder="/images/default.webp"
                placeholder-class="rounded-2xl shadow w-full md:max-h-[253px] lg:max-h-[335px] xl:max-h-[420px] 2xl:max-h-[510px]"
                :data-url="
                  img(getImages(item), { format: 'webp', quality: 70 })
                "
                :alt="item.banner_mob"
                class="rounded-2xl shadow w-full h-full md:max-h-[253px] lg:max-h-[335px] xl:max-h-[420px] 2xl:max-h-[510px] aspect-video"
              />
            </NuxtLinkLocale>
          </swiper-slide>
        </template>
      </swiper>
    </div>
  </div>
</template>
<script setup lang="ts">
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/swiper-bundle.css'

import { useWindowSize } from '@vueuse/core'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { ref } from 'vue'

const { locale } = useI18n()

const modules = [Pagination, Autoplay]
const { width } = useWindowSize()

const sliderImg = ref([])
const img = useImage()
const singleImage = ref(null)
const getImages = (item) => {
  return width.value > 576 ? item.banner_desc : item.banner_mob
}
onMounted(async () => {
  try {
    sliderImg.value = await useApi().$get(
      'https://b2c.asialuxe.app/api/banner/top/',
    )
    singleImage.value = await useApi().$get(
      'https://b2c.asialuxe.app/api/banner/single/',
    )
  } catch (err) {
    console.log(err)
  }
})
</script>
<style lang="scss">
.swiper-pagination-bullet.swiper-pagination-bullet-active {
  background-color: #0073ff !important;
  border: 2px solid #0073ff;
  width: 30px;
  border-radius: 10px;
}

.swiper-pagination-bullet {
  width: 8px;
  height: 8px;
  background-color: #e8e8e8 !important;
  opacity: 1 !important;
  border: none;
}

.pagination-slider {
  padding-bottom: 50px;
}
</style>
