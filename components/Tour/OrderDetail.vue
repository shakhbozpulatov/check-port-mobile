<template>
  <div v-if="data" class="card shadow buyer-info booking-detail bg-white mb-4">
    <div class="navbar p-3">
      <div class="flex items-center gap-3">
        <p class="card-title m-0">{{ t('826') }}</p>
      </div>
    </div>
    <div
      v-for="(elem1, index) in data?.flight_data"
      :key="index"
      class="bg-white"
    >
      <div class="inner-card p-3">
        <div
          v-for="(elem, i) in elem1.segments"
          :key="i + 'segment'"
          class="mb-2"
        >
          <div class="grid grid-cols-3 gap-3">
            <div>
              <p class="time m-0">{{ elem.departure.time_format }}</p>
              <p class="m-0">{{ elem.departure.code }}</p>
              <p class="m-0">{{ elem.departure.city }}</p>
              <p class="m-0">{{ elem.departure.date_format }}</p>
            </div>
            <div class="flex items-center justify-center flex-col gap-1">
              <div class="svg-wrap">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                  <path
                    d="M482.3 192c34.2 0 93.7 29 93.7 64c0 36-59.5 64-93.7 64l-116.6 0L265.2 495.9c-5.7 10-16.3 16.1-27.8 16.1l-56.2 0c-10.6 0-18.3-10.2-15.4-20.4l49-171.6L112 320 68.8 377.6c-3 4-7.8 6.4-12.8 6.4l-42 0c-7.8 0-14-6.3-14-14c0-1.3 .2-2.6 .5-3.9L32 256 .5 145.9c-.4-1.3-.5-2.6-.5-3.9c0-7.8 6.3-14 14-14l42 0c5 0 9.8 2.4 12.8 6.4L112 192l102.9 0-49-171.6C162.9 10.2 170.6 0 181.2 0l56.2 0c11.5 0 22.1 6.2 27.8 16.1L365.7 192l116.6 0z"
                  />
                </svg>
              </div>
              <p class="during-time text-center m-0">{{ elem.duration }}</p>
            </div>
            <div>
              <p class="time text-end m-0">{{ elem.arrival.time_format }}</p>
              <p class="m-0 text-end">{{ elem.arrival.code }}</p>
              <p class="m-0 text-end">{{ elem.arrival.city }}</p>
              <p class="m-0 text-end">{{ elem.departure.date_format }}</p>
            </div>
          </div>
          <hr class="my-2" />
          <div class="flex items-center justify-between">
            <p class="m-0 font-bolder">{{ t('288') }}</p>
            <div class="img-wrap">
              <img :src="elem.avia_company.logo" alt="" />
            </div>
          </div>
          <hr class="my-2" />
          <div class="grid grid-cols-12 gap-3">
            <div class="col-span-12 md:col-span-6">
              <div class="flex items-center gap-2">
                <p class="m-0 font-bolder">{{ t('27') }}:</p>
                <p class="m-0">{{ elem.avia_company.name }}</p>
              </div>
              <div class="flex items-center gap-2">
                <p class="m-0 font-bolder">{{ t('294') }}:</p>
                <p class="m-0">{{ elem.plane }}</p>
              </div>
            </div>
            <div class="col-span-12 md:col-span-6">
              <div class="flex items-center justify-end gap-2">
                <p class="m-0 font-bolder">{{ t('35') }}:</p>
                <p class="m-0">{{ elem.baggage }}</p>
              </div>
              <div class="flex items-center justify-end gap-2">
                <p class="m-0 font-bolder">{{ t('330') }}:</p>
                <p class="m-0">{{ elem.departure.terminal }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="inner-card bg-white">
      <div class="flex items-center justify-between mt-2">
        <p>
          <b>{{ t('226') }}:</b>
        </p>
        <p class="text-[#AAAAAA]">
          {{ data?.hotel_data.hotel_name }}
        </p>
      </div>

      <div class="flex items-center justify-between mt-2">
        <p>
          <b>{{ t('194') }}:</b>
        </p>
        <p class="text-[#AAAAAA]">
          {{ data.hotel_data.room_code }}
        </p>
      </div>

      <div class="flex items-center justify-between mt-2">
        <p><b>Checkin-Checkout:</b></p>
        <p class="text-[#AAAAAA]">
          {{ dayjs(data.hotel_data.begin_date).format('DD.MM.YYYY') }}
          -
          {{ dayjs(data.hotel_data.end_date).format('DD.MM.YYYY') }}
        </p>
      </div>

      <div class="mt-4">
        <p class="hotel-name">
          {{ data.hotel_data.room_name }}
        </p>
      </div>

      <div class="mt-4 ps-3">
        <ul class="list-disc">
          <li
            v-for="(item, index) in data?.hotel_data.amenities"
            :key="index"
            class="text-[14px]"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>

      <hr class="my-3" />
    </div>
    <div class="px-3 pb-3 bg-white">
      <div
        v-if="data?.hotel_data?.transfer_type"
        class="price-text flex justify-between"
      >
        <span class="">{{ t('337') }}: </span>
        <span
          v-if="data?.hotel_data?.transfer_type == 'in'"
          class="!font-normal"
          >{{ t('136') }}</span
        >
        <span
          v-else-if="data?.hotel_data?.transfer_type == 'gr'"
          class="!font-normal"
          >{{ t('86') }}</span
        >
        <span
          v-else-if="data?.hotel_data?.transfer_type == 'no'"
          class="!font-normal"
          >{{ t('188') }}</span
        >
        <span v-else class="!font-normal text-[12px] ml-5">{{
          data?.hotel_data?.transfer_name
        }}</span>
      </div>
      <div
        v-if="data?.hotel_data?.insurance_price > 0"
        class="price-text flex justify-between mt-3"
      >
        <span>{{ t('317') }}: </span>
        <span class="!font-normal">{{ t('501') }}</span>
      </div>
    </div>
    <!--    <UIPromodeCode
      :product="8"
      :price="data?.total_price - (data?.discount_price || 0)"
      class="py-4 dark:!bg-dark-700"
      @on-success="onPromoSuccess"
    />-->
    <div class="flex items-center justify-between px-3 pb-3 bg-white">
      <p class="price-text">{{ t('426') }}:</p>
      <div class="flex flex-col items-end">
        <p v-if="promoResponse">
          {{ formatNumber(promoResponse?.new_price?.toFixed(2)) }}
          {{ data?.hotel_data.currency }}
        </p>
        <p
          class="price-text"
          :class="
            data?.discount_price
              ? 'line-through !text-[16px] !font-normal text-[#aaaaaa]'
              : ''
          "
        >
          {{ formatNumber(Math.ceil(data?.total_price).toFixed(2)) }}
          {{ data?.hotel_data.currency }}
        </p>
        <p v-if="data?.discount_price" class="price-text">
          {{
            formatNumber(
              Math.ceil(data?.total_price - data?.discount_price).toFixed(2),
            )
          }}
          {{ data?.hotel_data.currency }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import type { ITourOrderCheck } from '@/types/tour'
import { formatNumber } from '@/utils/index.js'

interface Props {
  loading: boolean
  data: ITourOrderCheck
}
defineProps<Props>()
const emits = defineEmits<{
  (e: 'on-promo', val: string): void
}>()
const promoResponse = ref('')

const onPromoSuccess = (e) => {
  promoResponse.value = e
  emits('on-promo', e?.promo_code)
}
const { t } = useI18n()
</script>

<style lang="scss" scoped>
@import '@/assets/style/scss/style';
.hotel-name {
  font-size: 18px !important;
}
.buyer-info {
  border: 0;
  .navbar {
    background: #0073ff;
    border-radius: 4px 4px 0 0;
    .card-title {
      font-weight: 600;
      font-size: 18px;
      line-height: 20px;
      color: #fff;
    }
  }
  .price-text {
    @include common-text-style(18px, 600, normal);
  }
  .total-price {
    border-radius: 0 0 4px 4px;
    .price {
      font-size: 15px !important;
    }
  }
}
.booking-detail {
  .inner-card {
    padding: 20px 20px 30px;
    .time {
      font-weight: 700;
      color: #222222;
      font-size: 18px;
    }
    //p {
    //  font-size: 13px;
    //}
    .svg-wrap {
      width: 20px;
      height: 20px;
      svg {
        path {
          fill: #0073ff;
        }
      }
    }
    .during-time {
      font-size: 14px;
      font-weight: 600;
    }
    .img-wrap {
      width: 75px;
      img {
        width: 100%;
      }
    }
    .tarif-wrap {
      padding: 10px;
      border-radius: 4px;
      background: #0073ff;
      color: #fff;
      margin-top: 10px;
    }
  }
  .inner-card-item:not(:first-child) {
    margin-top: 18px;
  }
}
</style>
