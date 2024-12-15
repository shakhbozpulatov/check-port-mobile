<template>
  <div v-if="detail?.data?.[0]?.provider_id === 2" class="bg-white">
    <div>
      <div class="card buyer-info booking-detail mb-4">
        <div class="navbar p-3">
          <div class="flex items-center gap-3">
            <p class="card-title m-0">{{ $t('826') }}</p>
          </div>
        </div>
        <div v-for="(elem1, index) in detail.data" :key="index">
          <div class="inner-card p-3">
            <div
              v-for="(elem, i) in elem1.segments"
              :key="i + 'segment'"
              class="mb-2"
            >
              <div class="grid grid-cols-3 gap-2">
                <div>
                  <p class="time m-0">{{ elem.departure.time_format }}</p>
                  <p class="m-0">{{ elem.departure.code }}</p>
                  <p class="m-0">{{ elem.departure.city }}</p>
                  <p class="m-0">{{ elem.departure.date_format }}</p>
                </div>
                <div class="flex items-center justify-center flex-col gap-1">
                  <div class="svg-wrap">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                    >
                      <path
                        d="M482.3 192c34.2 0 93.7 29 93.7 64c0 36-59.5 64-93.7 64l-116.6 0L265.2 495.9c-5.7 10-16.3 16.1-27.8 16.1l-56.2 0c-10.6 0-18.3-10.2-15.4-20.4l49-171.6L112 320 68.8 377.6c-3 4-7.8 6.4-12.8 6.4l-42 0c-7.8 0-14-6.3-14-14c0-1.3 .2-2.6 .5-3.9L32 256 .5 145.9c-.4-1.3-.5-2.6-.5-3.9c0-7.8 6.3-14 14-14l42 0c5 0 9.8 2.4 12.8 6.4L112 192l102.9 0-49-171.6C162.9 10.2 170.6 0 181.2 0l56.2 0c11.5 0 22.1 6.2 27.8 16.1L365.7 192l116.6 0z"
                      />
                    </svg>
                  </div>
                  <p class="during-time text-center m-0">{{ elem.duration }}</p>
                </div>
                <div>
                  <p class="time text-end m-0">
                    {{ elem.arrival.time_format }}
                  </p>
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
                    <p class="m-0 font-bolder">{{ t('151') }}:</p>
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
        <div
          v-if="detail?.data[0]?.tariff?.length"
          class="px-3 flex items-end gap-2"
        >
          <p>Tariff:</p>
          <p>{{ detail?.data[0]?.ff_data.name }}</p>
        </div>
        <div class="flex items-center justify-between px-3 pb-3 mt-3">
          <p class="price-text">{{ t('363') }}:</p>
          <p class="price-text">
            {{ Math.ceil(detail.data[0]?.price) }}
            {{ detail.data[0].currency }}
          </p>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="bg-white rounded-b-lg">
    <div class="card buyer-info shadow booking-detail rounded-b-lg mb-4">
      <div class="navbar p-3">
        <div class="flex items-center gap-3">
          <p class="card-title m-0">{{ $t('826') }}</p>
        </div>
      </div>
      <div v-for="(elem1, index) in detail?.data" :key="index">
        <div
          v-for="(elem, i) in elem1.segments"
          :key="i"
          class="mb-2 inner-card pb-0"
        >
          <div class="grid grid-cols-3 gap-2">
            <div>
              <p class="m-0">
                {{ dayjs(elem.departure.date_format).format('DD.MM.YYYY') }}
              </p>
              <p class="time m-0">
                {{ elem.departure.time_format }}
              </p>
              <p class="m-0">{{ elem.departure.code }}</p>
              <p class="m-0">{{ elem.departure.city }}</p>
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
              <p class="m-0 text-end">
                {{ dayjs(elem.departure.date_format).format('DD.MM.YYYY') }}
              </p>
              <p class="time text-end m-0">
                {{ elem.arrival.time_format }}
              </p>
              <p class="m-0 text-end">{{ elem.arrival.code }}</p>
              <p class="m-0 text-end">{{ elem.arrival.city }}</p>
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
            <div class="col-span-6 md:col-span-6">
              <div class="flex items-center gap-2">
                <p class="m-0 font-bolder">{{ t('151') }}:</p>
                <p class="m-0">{{ elem.avia_company.name }}</p>
              </div>
              <div v-if="elem.plane" class="flex items-center gap-2">
                <p class="m-0 font-bolder">{{ t('294') }}:</p>
                <p class="m-0">{{ elem.plane }}</p>
              </div>
            </div>
            <div class="col-span-6 md:col-span-6">
              <div class="flex items-center justify-end gap-2">
                <p class="m-0 font-bolder">{{ t('35') }}:</p>
                <p class="m-0">{{ elem.baggage }}</p>
              </div>
            </div>
          </div>
        </div>
        <div v-for="(tariff, ind) in elem1?.tariff" :key="ind">
          <div
            v-if="tariffs.includes(String(tariff?.buy_id))"
            class="mx-4 p-2 bg-[#0073FF] rounded-md mb-4"
          >
            <div class="tarif-wrap flex items-center justify-between">
              <div class="flex items-center gap-2 text-white">
                <p>{{ t('325') }}:</p>
                <p>{{ tariff.tariff }}</p>
              </div>
              <div class="flex items-center gap-2 text-white">
                <p>{{ t('362') }}:</p>
                <p>+{{ tariff?.price_format }} USD</p>
                <!--                <el-button-->
                <!--                    @click="open(tariff)"-->
                <!--                    size="small"-->
                <!--                    plain-->
                <!--                    :icon="Delete"-->
                <!--                    circle-->
                <!--                />-->
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--      <UIPromodeCode
        :product="1"
        :price="detail?.data?.at(-1)?.price"
        @on-success="onPromoSuccess"
      />-->
      <div class="flex items-center justify-between px-3 pb-3 mt-3">
        <p class="price-text">{{ t('363') }}:</p>
        <p class="price-text flex flex-col">
          <span v-if="promoResponse"
            >{{ formatNumber(Math.ceil(promoResponse?.new_price)) }}
            {{ detail?.data[0].currency }}</span
          >
          <span :class="promoResponse ? 'line-through text-red-500' : ''"
            >{{ formatNumber(Math.ceil(detail?.data?.at(-1)?.price)) }}
            {{ detail?.data[0].currency }}</span
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import type { ITicketDetail } from '@/types/avia'
import { formatNumber } from '@/utils'

interface Props {
  detail: ITicketDetail
}
defineProps<Props>()
const { t } = useI18n()
const route = useRoute()
const emits = defineEmits<{
  (e: 'on-promo', val: string): void
}>()
const totalTarifPrice = ref(0)
const promoResponse = ref('')
const tariffs = computed(() =>
  route.query?.tariff_id ? String(route.query?.tariff_id).split(',') : [],
)
const onPromoSuccess = (e) => {
  promoResponse.value = e
  emits('on-promo', e?.promo_code)
}
onMounted(async () => {
  totalTarifPrice.value = 0
})
</script>

<style lang="scss" scoped>
@import '@/assets/style/scss/style';
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
    @include common-text-style(14px, 600, normal);
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
    p {
      font-size: 13px;
    }
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
