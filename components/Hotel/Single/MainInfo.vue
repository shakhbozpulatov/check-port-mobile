<template>
  <div class="relative">
    <Swiper
      :slides-per-view="1"
      :modules="[Autoplay, EffectFade, Navigation]"
      :init="false"
      :effect="'fade'"
      auto-height
    >
      <SwiperSlide v-for="(item, index) in hotel.images" :key="index">
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
        v-if="hotel.images"
        class="rooms-images flex items-center bg-dark-main/40 rounded gap-1 p-1 absolute bottom-[14px] right-[10px] z-10 text-white"
      >
        <i class="fa-light fa-images fa-sm"></i>
        <p class="text-sm">+{{ hotel.images?.length }}</p>
      </div>
    </Swiper>
    <div
      v-if="hotel"
      class="container mb-3 bg-white shadow p-5 hotel-wrap rounded-lg"
    >
      <div class="flex items-center justify-between flex-wrap gap-2">
        <div class="flex flex-col">
          <div class="flex justify-between w-full">
            <div
              v-if="!isNaN(Number(hotel?.content?.stars))"
              class="custom-rate mb-3"
            >
              <i
                v-for="n in 5"
                :key="n"
                :class="[
                  'fa-star',
                  n <= Number(hotel?.content?.stars)
                    ? 'fa-solid !text-[#ffcc00]'
                    : 'fa-regular !text-[#ccc]',
                ]"
              ></i>
            </div>
            <p v-else class="text-lg mb-1 text-[#f7ba2a] tracking-widest">
              {{ hotel.content?.stars }}
            </p>
            <div
              class="rounded-full bg-[#ffffff] w-[40px] h-[40px] flex items-center justify-center absolute right-2 top-[55px] z-[110]"
              @click.prevent="onSaveFavourite"
            >
              <i
                v-if="
                  cookieStore.favouritesCodes.includes(
                    String(hotel?.content?.code),
                  )
                "
                class="fa-solid fa-bookmark text-[#0073ff]"
              ></i>
              <i v-else class="fa-light fa-bookmark text-[#0073ff]"></i>
            </div>
          </div>
          <h2 class="text-2xl font-semibold">
            {{ toCamelCase(hotel.content?.name) }}
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
              hotel?.content?.guest?.cleanliness ||
              hotel?.content?.guest?.comfort ||
              hotel?.content?.guest?.service ||
              hotel.content.guest?.recommendation_percent
            "
            class="col-span-12 md:col-span-3 bg-gray-100 rounded"
          >
            <div class="data-images rate-wrap">
              <p
                v-if="
                  parseFloat(hotel.content.guest?.recommendation_percent) < 50
                "
                class="rate-text"
              >
                {{ $t('393') }}
              </p>
              <p
                v-if="
                  parseFloat(hotel.content.guest?.recommendation_percent) >=
                    50 &&
                  parseFloat(hotel.content.guest?.recommendation_percent) < 70
                "
                class="rate-text"
              >
                {{ $t('10') }}
              </p>
              <p
                v-if="
                  parseFloat(hotel.content.guest?.recommendation_percent) >=
                    70 &&
                  parseFloat(hotel.content.guest?.recommendation_percent) < 80
                "
                class="rate-text"
              >
                {{ $t('18') }}
              </p>
              <p
                v-if="
                  parseFloat(hotel.content.guest?.recommendation_percent) >=
                    80 &&
                  parseFloat(hotel.content.guest?.recommendation_percent) < 90
                "
                class="rate-text"
              >
                {{ $t('14') }}
              </p>
              <p
                v-if="
                  parseFloat(hotel.content.guest?.recommendation_percent) >= 90
                "
                class="rate-text"
              >
                {{ $t('13') }}
              </p>
              <hr
                v-if="hotel.content.guest?.recommendation_percent"
                class="my-[5px]"
              />
              <p class="comment mb-2">{{ $t('83') }}:</p>
              <div v-if="hotel.content.guest?.cleanliness" class="mb-2">
                <label>{{ $t('405') }}</label>
                <UProgress
                  indicator
                  :value="
                    calculatePercents(
                      hotel.content.guest?.cleanliness || 0,
                    ).toFixed(1)
                  "
                />
              </div>
              <div v-if="hotel.content.guest?.comfort" class="mb-2">
                <label>{{ $t('286') }}</label>
                <UProgress
                  indicator
                  :value="
                    calculatePercents(
                      hotel.content.guest?.comfort || 0,
                    ).toFixed(1)
                  "
                />
              </div>
              <div v-if="hotel?.content?.guest?.service" class="mb-2">
                <label>{{ $t('246') }}</label>
                <UProgress
                  indicator
                  :value="
                    calculatePercents(
                      hotel?.content?.guest?.service || 0,
                    ).toFixed(1)
                  "
                />
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="
            hotel?.data?.attributes?.pets?.length ||
            hotel?.data?.attributes?.general?.length ||
            hotel?.data?.amenities?.length
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
              v-if="hotel?.data.amenities?.length"
              class="col-span-12 md:col-span-6"
            >
              <h3 id="facilities" class="mb-3 card-title text-[20px] font-bold">
                {{ $t('80') }}
              </h3>
              <ul
                class="md:columns-2 gap-4 ml-[10px] list-inside"
                style="list-style-type: disc"
              >
                <!--                    <i class="fa-solid fa-wifi"></i>-->
                <li
                  v-for="(elem, index) in hotel?.data.amenities"
                  :key="index"
                  class="card-text mb-[6px]"
                >
                  {{ elem.name }}
                </li>
              </ul>
            </div>
            <div
              v-if="
                hotel?.data.attributes?.pets?.length ||
                hotel?.data.attributes?.general?.length
              "
              class="col-span-12 md:col-span-6"
            >
              <h3 class="mb-3 card-title text-[20px] font-bold">
                {{ $t('138') }}
              </h3>
              <div class="md:columns-2 gap-1">
                <ul
                  style="list-style-type: disc"
                  class="ml-[10px] flex flex-col gap-2 list-inside"
                >
                  <!--                    <i class="fa-solid fa-wifi"></i>-->
                  <li
                    v-for="(elem, index) in hotel?.data.attributes?.pets"
                    :key="index"
                    class="card-text"
                  >
                    {{ elem.name }}
                  </li>
                </ul>
                <ul
                  style="list-style-type: disc"
                  class="ml-[10px] flex flex-col gap-2 list-inside"
                >
                  <!--                    <i class="fa-solid fa-wifi"></i>-->
                  <li
                    v-for="(elem, index) in hotel?.data.attributes?.general"
                    :key="index"
                    class="card-text"
                  >
                    {{ elem.name }}
                  </li>
                </ul>
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
    </div>
    <vue-easy-lightbox
      :visible="visibleRef"
      :imgs="getSrcMainList(hotel.images)"
      :index="indexRef"
      @hide="onHide"
    ></vue-easy-lightbox>
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

import type { IHotelSingle, ISingleImage } from '@/types/hotel'

interface Props {
  hotel: IHotelSingle
}
const props = defineProps<Props>()
const cookieStore = useCookieStore()

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
const onSaveFavourite = () => {
  cookieStore.saveFavouritesData({
    code: String(props.hotel?.content?.code),
    stars: props.hotel?.content?.stars,
    address: props.hotel?.content?.address?.city,
    name: props.hotel?.content?.name,
    image: props.hotel?.images?.[0]?.links?.['1000px']?.href,
  })
}
cookieStore.getFavourites()
onMounted(() => {
  contentHeight.value = contentDiv.value?.offsetHeight
})
</script>

<style lang="scss" scoped>
@import '@/assets/style/scss/style.scss';
.hotel-wrap {
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.07);
  padding: 20px;
  .rooms-images {
    @include common-text-style(12px, 400, normal);
    color: #333;
    background-color: #fff;
    border-radius: 6px;
  }
  .hotel-images {
    border-radius: 10px;
    background: rgba(243, 243, 243, 0.76);
    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.07);
    overflow: hidden;
    height: 246px;
    width: 100%;
  }
  .img {
    object-fit: cover;
  }
  .rate-wrap {
    padding: 8px 12px;
    .rate-text {
      @include common-text-style(18px, 500, normal);
    }
  }
  .comment {
    @include common-text-style(16px, 500, normal);
    margin-top: 20px;
  }

  .pas-menu-btn {
    padding: 24px 10px;
    font-size: 16px;
    font-weight: 400;
  }
  .hotel-name {
    @include common-text-style(24px, 600, normal);
    margin-bottom: 4px;
  }
  .location {
    @include common-text-style(14px, 400, normal);
  }
  .dotted {
    width: 4px;
    height: 4px;
    background: #666;
    border-radius: 50%;
  }

  .input-item {
    .label-text {
      @include common-text-style(12px, 500, normal);
      color: #494949;
    }
  }
  .title-name {
    @include common-text-style(28px, 600, 30px);
    margin: 12px 0;
  }
  .location {
    @include common-text-style(13px, 500, normal);
  }
  .desc {
    @include common-text-style(14px, 500, 20px);
  }
  .card-title {
    @include common-text-style(20px, 600, normal);
  }
  .card-text {
    @include common-text-style(14px, 400, normal);
  }
  .direction-text {
    @include common-text-style(16px, 600, normal);
  }
  .date {
    @include common-text-style(16px, 600, normal);
    color: #3392ff;
  }
  .time {
    @include common-text-style(16px, 400, normal);
  }

  .hotel-card {
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.09);
    background: rgba(255, 255, 255);
    border-radius: 10px;
    overflow: hidden;
    .img-wrap {
      width: 180px;
      height: 140px;
      .img {
        height: 100%;
        width: 100%;
      }
    }
    .name-room {
      @include common-text-style(20px, 600, normal);
    }
    .text-room {
      @include common-text-style(14px, 400, normal);
      color: rgba(0, 0, 0, 0.67);
      margin-top: 4px;
      margin-bottom: 20px;
    }
    .hotel-items {
      @include common-text-style(14px, 500, normal);
    }
    .price {
      @include common-text-style(25px, 500, normal);
    }
    .price-desc {
      @include common-text-style(10px, 400, normal);
      color: rgba(0, 0, 0, 0.7);
    }
    .price-text {
      @include common-text-style(14px, 500, normal);
      color: #55ba3c;
    }
    .best {
      background: rgba(85, 186, 60, 0.14);
    }
  }
}
.search-bar {
  margin: 20px 0;
  padding: 20px;
  border-radius: 10px;
  background: rgba(51, 146, 255, 0.18);
}

@media screen and (max-width: 768px) {
  .hotel-card .img-wrap {
    width: 100% !important;
  }
}

.debug-border:not(:last-child) .border-d {
  border-bottom: 1px dashed gray;
}

.fa-star {
  font-size: 24px;
  margin-right: 4px;
  color: #ccc; /* цвет неактивных звезд */
}

.fa-star.fa-solid {
  color: #ffcc00; /* цвет активных звезд */
}
</style>
