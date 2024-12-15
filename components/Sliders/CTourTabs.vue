<template>
  <UTabs
    :items="items"
    class="w-full"
    :ui="{
      list: {
        marker: {
          background: '!bg-[#0073ff] !rounded-[1rem]',
        },
        shadow: 'shadow',
        padding: 'p-0',
        height: '',
        base: 'mb-[10px] !rounded-[1rem] tour-tabs',
      },
    }"
  >
    <template #default="{ item, selected }">
      <span
        class="text-black text-[12px]"
        :class="[selected && 'text-white']"
        >{{ item.label }}</span
      >
    </template>
    <template #item="{ item }">
      <div v-if="item.key === 'exclusive'">
        <swiper
          :modules="modules"
          :init="false"
          :slides-per-view="1.5"
          :space-between="10"
          class="pagination-slider !pl-0.5 !pb-5"
          :pagination="{ clickable: true }"
        >
          <swiper-slide v-for="(item, index) in hotelRoutesData" :key="index">
            <NuxtLinkLocale
              :to="item?.url"
              class="shadow rounded-3xl bg-white flex flex-col pb-3 gap-3"
            >
              <div class="flex gap-2 items-center justify-center">
                <img
                  :src="item?.img"
                  alt="img"
                  class="rounded-t-xl aspect-ratio object-cover h-[150px] w-full"
                />
              </div>
              <div class="px-3 flex flex-col gap-2">
                <div class="flex gap-3 items-center">
                  <UBadge
                    size="sm"
                    color="amber"
                    variant="soft"
                    class="!rounded-[1rem] !text-[10px]"
                  >
                    {{ item.star }}
                    <i
                      class="!text-[10px] ml-1 fa fa-star !text-yellow-500"
                    ></i>
                  </UBadge>
                  <span class="text-[10px] text-gray-500">{{ item.city }}</span>
                </div>
                <p class="text-sm font-bold text-left line-clamp-1">
                  {{ item.name }}
                </p>
                <div class="flex justify-between items-center">
                  <p class="font-bold text-[12px]">
                    {{ item.price }}
                    <span class="font-normal text-gray-500"
                      >/ 1 {{ $t('58') }}</span
                    >
                  </p>
                </div>
              </div>
            </NuxtLinkLocale>
          </swiper-slide>
        </swiper>
      </div>
      <div v-if="item.key === 'halal'">
        <swiper
          :modules="modules"
          :init="false"
          :slides-per-view="1.5"
          :space-between="10"
          class="pagination-slider min-h-max xl:max-h-[520px] 2xl:min-h-[550px] !pl-1"
          :pagination="{ clickable: true }"
        >
          <swiper-slide v-for="(item, index) in halalHotelData" :key="index">
            <NuxtLinkLocale
              :to="`/hotels/${item?.hotelId}?search_id=0&adult=1&child_age=[]&currency=USD&type=hotel`"
              class="shadow rounded-3xl bg-white flex flex-col pb-3 gap-3"
            >
              <div class="flex gap-2 items-center justify-center">
                <img
                  :src="item?.img"
                  alt="img"
                  class="rounded-t-xl aspect-ratio object-cover h-[150px] w-full"
                />
              </div>
              <div class="px-3 flex flex-col gap-2">
                <div class="flex gap-3 items-center">
                  <UBadge
                    size="sm"
                    color="amber"
                    variant="soft"
                    class="!rounded-[1rem] !text-[10px]"
                  >
                    {{ item.star }}
                    <i
                      class="!text-[10px] ml-1 fa fa-star !text-yellow-500"
                    ></i>
                  </UBadge>
                  <span class="text-[10px] text-gray-500">{{ item.city }}</span>
                </div>
                <p class="text-sm font-bold text-left line-clamp-1">
                  {{ item.name }}
                </p>
                <div class="flex justify-between items-center">
                  <p class="font-bold text-[12px]">
                    {{ item.price }}
                    <span class="font-normal text-gray-500"
                      >/ 1 {{ $t('58') }}</span
                    >
                  </p>
                </div>
              </div>
            </NuxtLinkLocale>
          </swiper-slide>
        </swiper>
      </div>
    </template>
  </UTabs>
</template>

<script setup lang="ts">
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/swiper-bundle.css'

import dayjs from 'dayjs'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
const { t } = useI18n()

const modules = [Pagination, Autoplay]

const items = [
  {
    key: 'exclusive',
    label: t('370'),
  },
  {
    key: 'halal',
    label: t('686'),
  },
]

const hotelRoutesData = ref(null)
const halalHotelData = ref(null)

onMounted(async () => {
  try {
    const hotels = await useApi().$get(
      'https://b2c.asialuxe.app/api/banner/content/?type=hotels',
    )
    hotelRoutesData.value = hotels.splice(0, 3).map((el) => {
      return {
        ...el,
        price:
          el.id === '22' ? '10 096$' : el.id === '31' ? '2 908$' : '3 358$',
        begin_date: '2024-09-16',
        end_date: '2024-09-20',
      }
    })
    const halals = await useApi().$get(
      'https://b2c.asialuxe.app/api/banner/halal/',
    )
    halalHotelData.value = halals.splice(0, 3).map((el) => {
      return {
        ...el,
        price: el.id === '118' ? '494$' : el.id === '119' ? '700$' : '1 696$',
        begin_date: '2024-09-16',
        end_date: '2024-09-20',
      }
    })
  } catch (err) {
    console.log(err)
  }
})
</script>

<style lang="scss">
.tour-tabs button:last-child {
  background: #0073ff20 !important;
  border-radius: 1rem;
}
.tour-tabs {
  gap: 10px;
  box-shadow: none !important;
  background-color: inherit !important;
}
</style>
