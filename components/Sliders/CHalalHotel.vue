<template>
  <div class="hotels-info relative">
    <div class="swiper-button-next !top-[-50px] md:!top-[-30px] next-hal"></div>
    <div
      class="swiper-button-prev !top-[-50px] !right-[60px] !left-auto md:!top-[-30px] prev-hal"
    ></div>

    <swiper
      id="halal-hotel-swiper"
      :modules="modules"
      :init="false"
      :slides-per-view="5"
      :space-between="30"
      :navigation="{ nextEl: '.next-hal', prevEl: '.prev-hal' }"
      :breakpoints="{
        1028: {
          slidesPerView: 5,
          spaceBetween: 30,
        },
        980: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        430: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        0: {
          slidesPerView: 1.3,
          spaceBetween: 30,
        },
      }"
    >
      <swiper-slide
        v-for="(hotelRoute, index) in halalHotelRoutesStore"
        :key="index"
        class="hotels-content py-3"
      >
        <a
          ref="container"
          class="card p-0 !w-full m-auto m-xl-0 rounded-2xl shadow-md block"
          :href="`/${locale}/hotels/${hotelRoute?.hotelId}?type=hotel&adult=1&child_age=&location_id=${hotelRoute?.locationId}&product_id=2&lang=${locale}&currency=USD&referal_loc_type=city&transfer=gr&insurance=`"
          target="_blank"
        >
          <NuxtImg
            v-lazy-load
            placeholder="/images/default.webp"
            fit="cover"
            placeholder-class="aspect-square object-cover h-[160px] w-full md:max-w-[277px]"
            class="card-top position-relative object-cover"
            :data-url="hotelRoute.img"
            loading="lazy"
            alt="img"
          />
          <div class="card-bottom lg:max-w-[277px]">
            <div class="flex gap-1 mb-2">
              <i
                v-for="star in 5"
                :key="star"
                class="!text-[10px] fa fa-star"
                :class="{
                  '!text-yellow-500': star <= hotelRoute.star,
                  '!text-black-50': star > hotelRoute.star,
                }"
              ></i>
            </div>
            <h3
              class="text-[14px] mb-2 md:text-[16px]"
              style="
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                overflow: hidden;
                letter-spacing: 1px;
              "
            >
              {{ hotelRoute.name }}
            </h3>
            <div class="place">
              <h4 class="mb-0 text-[#AAAAAA] text-[12px]">
                {{ hotelRoute.city }}
              </h4>
            </div>
          </div>
        </a>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/swiper-bundle.css'

import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

const modules = [Navigation]
const { locale } = useI18n()

defineProps({
  halalHotelRoutesStore: {
    type: Array,
    required: true,
  },
})
</script>

<style>
.swiper-button-prev,
.swiper-button-next {
  width: 40px;
  height: 40px;
  border: 1px solid #0073ff;
  border-radius: 10rem;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8px;
  color: #0073ff;
  top: -10px;
  --swiper-navigation-size: 15px;
  --swiper-theme-color: #0073ff;
  --swiper-preloader-color: #0073ff;
}

.card-top[lazy='loading'] {
  object-fit: contain;
}
</style>
