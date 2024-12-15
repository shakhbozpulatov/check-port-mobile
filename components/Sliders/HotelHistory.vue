<template>
  <div
    v-if="history?.length"
    class="p-[10px] rounded-3xl shadow-[0_0_9.1px_0_#0000001C] mb-4"
  >
    <div class="grid grid-cols-12 relative">
      <div class="col-span-12 md:col-span-8">
        <p class="text-[18px] font-bold !mb-3">{{ $t('840') }}</p>
        <div class="swiper-button-next !top-[10px] next-hal"></div>
        <div
          class="swiper-button-prev !top-[10px] !right-[45px] !left-auto prev-hal"
        ></div>

        <swiper
          v-if="history"
          :modules="modules"
          :init="false"
          :slides-per-view="1.8"
          :navigation="{ nextEl: '.next-hal', prevEl: '.prev-hal' }"
          :space-between="10"
          class="min-h-max xl:max-h-[520px] 2xl:min-h-[550px]"
          :pagination="{ clickable: true }"
        >
          <swiper-slide
            v-for="(item, index) in [...history].reverse()"
            :key="index"
            :class="index >= 1 ? '!h-[250px]' : ''"
          >
            <NuxtLinkLocale :to="`/hotels/${item?.code}?type=hotel`">
              <div class="flex flex-col gap-3 bg-white border rounded-2xl">
                <img
                  :src="item?.image"
                  alt="img"
                  class="rounded-t-2xl aspect-video object-cover h-[150px] w-full"
                />
                <div class="p-3 pt-0">
                  <div class="flex gap-3 items-center mb-2">
                    <UBadge
                      size="sm"
                      color="amber"
                      variant="soft"
                      class="!rounded-[1rem] !text-[10px]"
                    >
                      {{ item?.stars }}
                      <i
                        class="!text-[10px] ml-1 fa fa-star !text-yellow-500"
                      ></i>
                    </UBadge>
                    <span class="text-left line-clamp-1 text-[12px]">{{
                      item?.address
                    }}</span>
                  </div>
                  <p class="text-sm font-bold text-left line-clamp-1">
                    {{ item?.name }}
                  </p>
                </div>
              </div>
            </NuxtLinkLocale>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/swiper-bundle.css'
import 'swiper/css/navigation'

import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

const modules = [Pagination, Autoplay, Navigation]
const additionalData = useCookie('additional_data')
const history = computed(() => {
  if (additionalData.value?.history) {
    return additionalData.value?.history
  } else {
    return []
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
  bottom: -10px !important;
}

.swiper-button-prev,
.swiper-button-next {
  width: 21px !important;
  height: 21px !important;
  border: 1px solid #0073ff;
  border-radius: 10rem;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5px;
  color: #0073ff;
  --swiper-navigation-size: 15px;
  --swiper-theme-color: #0073ff;
  --swiper-preloader-color: #0073ff;
}

.swiper-button-prev:after,
.swiper-button-next:after {
  font-size: 10px;
}

.swiper-pagination {
  bottom: -5px !important;
}
</style>
