<template>
  <div>
    <div>
      <Swiper
        :slides-per-view="1"
        :modules="[Autoplay, EffectFade, Navigation]"
        :init="false"
        :effect="'fade'"
        auto-height
      >
        <SwiperSlide v-for="(item, index) in data.images" :key="index">
          <div class="relative">
            <img
              alt="img"
              class="w-full object-cover !max-h-[250px]"
              :src="item?.links['1000px'].href"
              @click="showImg(1)"
            />
          </div>
        </SwiperSlide>
        <div
          v-if="data.images"
          class="rooms-images flex items-center bg-dark-main/40 rounded gap-1 p-1 absolute bottom-[14px] right-[10px] z-10 text-white"
        >
          <i class="fa-light fa-images fa-sm"></i>
          <p class="text-sm">+{{ data.images?.length }}</p>
        </div>
      </Swiper>
    </div>
    <div
      v-if="data"
      class="mb-3 bg-white shadow p-5 hotel-wrap rounded-lg transition-200"
    >
      <div class="flex items-center justify-between flex-wrap gap-2">
        <div class="flex flex-col">
          <div v-if="!isNaN(Number(data?.content?.stars))">
            <div class="custom-rate mb-3">
              <i
                v-for="n in 5"
                :key="n"
                :class="[
                  'fa-star',
                  n <= Number(data?.content?.stars) ? 'fa-solid' : 'fa-regular',
                ]"
              ></i>
            </div>
          </div>
          <p v-else class="text-lg mb-1 text-[#f7ba2a] tracking-widest">
            {{ data.content?.stars }}
          </p>
          <h2 class="text-2xl font-semibold">
            {{ toCamelCase(data.content?.name) }}
          </h2>
          <div class="flex items-center gap-2">
            <i class="fa-light fa-location-dot fa-xs"></i>
            <a href="#map" class="location text-blue-500 text-xs"
              >{{ $t('257') }}
            </a>
          </div>
        </div>
        <div class="flex flex-col items-end">
          <a href="#price-scroll">
            <UBadge effect="dark">{{ $t('268') }}</UBadge>
          </a>
        </div>
      </div>
      <div class="mt-3">
        <div class="grid grid-cols-12 gap-6">
          <div
            v-if="
              data?.content?.guest?.cleanliness ||
              data?.content?.guest?.comfort ||
              data?.content?.guest?.service ||
              data.content.guest?.recommendation_percent
            "
            class="col-span-12 md:col-span-3 bg-gray-100 rounded"
          >
            <div class="data-images rate-wrap">
              <p
                v-if="
                  parseFloat(data.content?.guest?.recommendation_percent) < 50
                "
                class="rate-text"
              >
                {{ $t('393') }}
              </p>
              <p
                v-if="
                  parseFloat(data.content?.guest?.recommendation_percent) >=
                    50 &&
                  parseFloat(data.content?.guest?.recommendation_percent) < 70
                "
                class="rate-text"
              >
                {{ $t('10') }}
              </p>
              <p
                v-if="
                  parseFloat(data.content.guest?.recommendation_percent) >=
                    70 &&
                  parseFloat(data.content.guest?.recommendation_percent) < 80
                "
                class="rate-text"
              >
                {{ $t('18') }}
              </p>
              <p
                v-if="
                  parseFloat(data.content.guest?.recommendation_percent) >=
                    80 &&
                  parseFloat(data.content.guest?.recommendation_percent) < 90
                "
                class="rate-text"
              >
                {{ $t('14') }}
              </p>
              <p
                v-if="
                  parseFloat(data.content.guest?.recommendation_percent) >= 90
                "
                class="rate-text"
              >
                {{ $t('13') }}
              </p>
              <hr
                v-if="data.content.guest?.recommendation_percent"
                class="my-[5px]"
              />
              <p class="comment mb-2">{{ $t('83') }}:</p>
              <div v-if="data.content.guest?.cleanliness" class="mb-2">
                <label>{{ $t('405') }}</label>
                <UProgress
                  :value="
                    calculatePercents(
                      data.content.guest?.cleanliness || 0,
                    ).toFixed(1)
                  "
                />
              </div>
              <div v-if="data.content.guest?.location" class="mb-2">
                <label>{{ $t('286') }}</label>
                <UProgress
                  :value="
                    calculatePercents(
                      data.content.guest?.location || 0,
                    ).toFixed(1)
                  "
                />
              </div>
              <div v-if="data?.content?.guest?.service" class="mb-2">
                <label>{{ $t('246') }}</label>
                <UProgress
                  :value="
                    calculatePercents(
                      data?.content?.guest?.service || 0,
                    ).toFixed(1)
                  "
                />
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="
            data?.data?.attributes?.pets?.length ||
            data?.data?.attributes?.general?.length ||
            data?.data?.amenities?.length
          "
          class="mt-[30px]"
        >
          <div
            ref="contentDiv"
            class="grid grid-cols-12 gap-3"
            :class="{
              'h-auto overflow-visible': showBtn,
              'overflow-hidden max-h-[250px] h-full': !showBtn,
            }"
          >
            <div
              v-if="data?.data.amenities?.length"
              class="col-span-12 md:col-span-6"
            >
              <h3 id="facilities" class="mb-3 card-title text-[20px] font-bold">
                {{ $t('80') }}
              </h3>
              <ul
                class="grid grid-cols-12 gap-1 ml-[10px]"
                style="list-style-type: disc"
              >
                <!--                    <i class="fa-solid fa-wifi"></i>-->
                <li
                  v-for="(elem, index) in data?.data.amenities"
                  :key="index"
                  class="card-text col-span-6 md:col-span-4 mb-[6px]"
                >
                  {{ elem.name }}
                </li>
              </ul>
            </div>
            <div
              v-if="
                data?.data.attributes?.pets?.length ||
                data?.data.attributes?.general?.length
              "
              class="col-span-12 md:col-span-6"
            >
              <h3 class="mb-3 card-title text-[20px] font-bold">
                {{ $t('138') }}
              </h3>
              <div class="grid grid-cols-12 gap-1">
                <div
                  v-for="(elem, index) in data?.data.attributes?.pets"
                  :key="index"
                  class="col-span-12 md:col-span-6 mb-[6px] ml-[10px]"
                >
                  <ul
                    style="list-style-type: disc"
                    class="flex items-center gap-2"
                  >
                    <!--                    <i class="fa-solid fa-wifi"></i>-->
                    <li class="card-text">{{ elem.name }}</li>
                  </ul>
                </div>
                <div
                  v-for="(elem, index) in data?.data.attributes?.general"
                  :key="index"
                  class="col-span-12 md:col-span-6 mb-[6px] ml-[10px]"
                >
                  <ul
                    style="list-style-type: disc"
                    class="flex items-center gap-2"
                  >
                    <!--                    <i class="fa-solid fa-wifi"></i>-->
                    <li class="card-text">{{ elem.name }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="contentHeight > 240"
            class="cursor-pointer text-[#0073FF] text-center text-[15px] mt-3"
          >
            <p @click="showBtn = !showBtn">
              {{ showBtn ? $t('456') : $t('256') }}
            </p>
          </div>
        </div>
      </div>
      <vue-easy-lightbox
        :visible="visibleRef"
        :imgs="getSrcMainList(data.images)"
        :index="indexRef"
        @hide="onHide"
      ></vue-easy-lightbox>
    </div>
  </div>
</template>
<script setup lang="ts">
import 'vue-easy-lightbox/external-css/vue-easy-lightbox.css'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/swiper-bundle.css'

import { Autoplay, EffectFade, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import VueEasyLightbox from 'vue-easy-lightbox'

import type { ITourSingle } from '@/types/tour'
import type { ISingleImage } from '~/types/hotel'

interface Props {
  data: ITourSingle
}
defineProps<Props>()

const contentHeight = ref(0)
const contentDiv = ref(null)
const showBtn = ref(false)
const visibleRef = ref(false)
const indexRef = ref(0)
const showImg = (index) => {
  indexRef.value = index
  visibleRef.value = true
}
const toCamelCase = (str) => {
  if (!str) return str
  return str
    .toLowerCase()
    .split(' ')
    .map((word, index) => {
      if (index === 0) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    .join(' ')
}
const onHide = () => (visibleRef.value = false)
const getSrcMainList = (elem: ISingleImage[]) => {
  return elem?.map((src) => src.links['1000px'].href)
}
const calculatePercents = (n: string) => {
  return (parseFloat(n) * 100) / 5
}
onMounted(() => {
  contentHeight.value = contentDiv.value?.offsetHeight
})
</script>
