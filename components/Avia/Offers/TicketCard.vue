<template>
  <div class="ticket-card shadow mb-3">
    <div class="relative">
      <div class="flex items-center gap-4 flex-wrap md:flex-nowrap">
        <div class="flex flex-col gap-4 w-[100%] md:w-[77%]">
          <div
            v-for="(elem, index1) in data.offers"
            :key="index1 + 'ticket'"
            class="flex flex-col"
          >
            <div
              v-if="elem?.provider_id === 1"
              class="flex gap-1 absolute top-[-40px] right-3"
            >
              <div class="bg-white border-[#0073FF] border rounded p-2">
                <div
                  v-if="elem?.provider_id === 1 && elem?.block_status === false"
                  class="flex items-center gap-1"
                >
                  <i class="fa-light fa-plane text-black"></i>
                  <p class="luggage text-black">
                    {{ $t('367') }}
                  </p>
                </div>
                <div
                  v-else-if="elem?.provider_id === 1 && elem?.block_status"
                  class="flex items-center gap-1"
                >
                  <i class="fa-light fa-cubes text-black"></i>
                  <p class="luggage text-black">
                    {{ $t('442') }}
                  </p>
                </div>
              </div>
            </div>
            <div
              class="logo-wrap flex items-center flex-wrap justify-between mb-2"
            >
              <div class="avia-company-logo">
                <img :src="elem.avia_company.logo" alt="" />
              </div>
              <div v-if="elem.seats && elem.provider_id === 1">
                <div v-if="elem.seats > 9" class="flex items-start gap-1">
                  <span class="luggage">{{ `${$t('220')}: 9+` }}</span>
                </div>
                <div v-else class="flex items-start gap-1">
                  <span class="luggage">
                    {{ `${$t('220')}:${elem.seats}` }}
                  </span>
                </div>
              </div>
              <div
                v-if="!elem.seats && elem.provider_id !== 1"
                class="flex gap-1 items-center"
              >
                <div
                  v-if="data?.refundable === 'Refundable'"
                  class="flex items-center gap-1"
                >
                  <i class="fa-light fa-repeat text-[#13C514]"></i>
                  <p class="luggage">{{ $t('60') }}</p>
                </div>
                <div v-else class="flex items-center gap-1">
                  <i
                    class="fa-sharp fa-solid fa-circle-xmark text-[#E6434F]"
                  ></i>
                  <p class="luggage">{{ $t('179') }}</p>
                </div>
              </div>
              <div class="flex flex-col items-end justify-end w-full gap-2">
                <div class="flex gap-2 items-center">
                  <div class="flex items-center">
                    <i class="fa-light fa-ticket-airline text-[#3492ff]"></i>
                    <span
                      v-if="store.allTicketsResponse?.request?.class === 'E'"
                      class="luggage"
                      >: ({{ elem.class }})
                      {{ elem.class !== 'C' ? $t('368') : $t('37') }}</span
                    >
                    <span
                      v-if="store.allTicketsResponse?.request?.class === 'B'"
                      class="luggage"
                      >: ({{ elem.class }})
                      {{ $t('37') }}
                    </span>
                  </div>
                  <div
                    v-if="
                      checkBtn(
                        data.provider_id,
                        data.airline_code,
                        data.price_fare_family,
                      )
                    "
                    class="flex items-center"
                  >
                    <i class="fa-light fa-suitcase-rolling text-[#3492ff]"></i>
                    <span class="luggage">: {{ elem.baggage }}</span>
                  </div>
                </div>
                <div
                  v-if="elem.seats && elem.provider_id === 1"
                  class="flex gap-1 items-center"
                >
                  <div
                    v-if="data?.refundable === 'Refundable'"
                    class="flex items-center gap-1"
                  >
                    <i class="fa-light fa-repeat text-[#13C514]"></i>
                    <p class="luggage">{{ $t('60') }}</p>
                  </div>
                  <div v-else class="flex items-center gap-1">
                    <i
                      class="fa-sharp fa-solid fa-circle-xmark text-[#E6434F]"
                    ></i>
                    <p class="luggage">{{ $t('179') }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex">
              <div class="w-[100%] grid grid-cols-2 mt-3">
                <div class="pe-2 border-r border-dashed">
                  <p class="text">
                    {{ elem.departure.city }}
                  </p>
                  <p class="time">
                    {{ elem.departure.time_format }}
                  </p>
                  <p class="text">
                    {{ dayjs(elem.departure.date_format).format('DD.MM.YYYY') }}
                  </p>
                </div>

                <div class="flex flex-col items-end text-right justify-end">
                  <p class="text">
                    {{ elem.arrival.city }}
                  </p>
                  <p class="time">
                    {{ elem.arrival.time_format }}
                  </p>
                  <p class="text text-end">
                    {{ dayjs(elem.arrival.date_format).format('DD.MM.YYYY') }}
                  </p>
                </div>
              </div>
            </div>
            <div class="px-3 mt-10 w-full">
              <div class="line flex justify-between w-full">
                <div
                  class="absolute left-[-2px] bottom-[-12px] flex items-center justify-between w-full"
                >
                  <div class="circle left-0 left relative">
                    <UTooltip
                      :text="
                        elem.departure.name
                          ? elem.departure.name
                          : elem.departure.code
                      "
                      :popper="{ placement: 'top-start' }"
                    >
                      <p
                        class="abbr absolute cursor-pointer top-[-45px] right-[-20px]"
                      >
                        {{ elem.departure.code }}
                      </p>
                    </UTooltip>
                  </div>
                  <template
                    v-for="(stop, index) in elem.segments"
                    :key="index + 'segmentsII'"
                  >
                    <UTooltip
                      v-if="stop.arrival.code !== elem.arrival.code"
                      :text="`${
                        stop.arrival.city
                          ? stop.arrival.city
                          : stop.arrival?.code
                      }, ${
                        stop.arrival.name
                          ? stop.arrival.name
                          : elem.segments[index + 1].departure?.code
                      }`"
                      :popper="{ placement: 'top-start' }"
                    >
                      <div class="circle">
                        <p
                          class="abbr cursor-pointer absolute top-[-27px]"
                          :class="`${
                            elem.segments[index].arrival?.code !==
                            elem.segments[index + 1].departure?.code
                              ? 'right-[12px]'
                              : 'right-[-8px]'
                          }`"
                        >
                          {{ stop.arrival?.code }}
                        </p>
                        <p
                          v-if="
                            elem.segments[index].arrival?.code !==
                            elem.segments[index + 1].departure?.code
                          "
                          class="abbr absolute cursor-pointer top-[-27px] right-[-25px]"
                        >
                          <span
                            >-
                            {{ elem.segments[index + 1].departure?.code }}</span
                          >
                        </p>
                      </div>
                    </UTooltip>
                  </template>
                  <div class="circle right-0 right relative">
                    <UTooltip
                      :text="
                        elem.arrival.name
                          ? elem.arrival.name
                          : elem.arrival.code
                      "
                      :popper="{ placement: 'top-start' }"
                    >
                      <p
                        class="abbr cursor-pointer absolute top-[-45px] right-[-20px]"
                      >
                        {{ elem.arrival.code }}
                      </p>
                    </UTooltip>
                  </div>
                </div>
              </div>
              <p class="road-time mt-2">{{ $t('47') }}: {{ elem.duration }}</p>
            </div>
          </div>
        </div>
        <div
          class="w-[100%] md:w-[23%] flex flex-col justify-center items-center"
        >
          <div
            class="flex flex-row md:flex-col items-center justify-between w-full mb-3 md:mb-0"
          >
            <p class="price text-center">
              <span
                v-if="
                  data.provider_id === 4 &&
                  data.price_fare_family === true &&
                  data.airline_code === 'HY'
                "
                class="text-[#AAAAAA] text-[16px]"
                >{{ t('498') }}</span
              >
              <span
                v-if="
                  data?.offers[0]?.provider_id === 1 &&
                  data?.offers?.length === 1
                "
              >
                {{ formatNumber(data?.offers[0]?.priceINF?.totalB2c) }}
                {{ data.currency }}
              </span>
              <span
                v-else-if="
                  data?.offers[0]?.provider_id === 1 &&
                  data?.offers?.length === 2
                "
              >
                {{ formatNumber(data?.offers[1]?.priceINF?.totalB2c) }}
                {{ data.currency }}
              </span>
              <span v-else class="">
                {{ formatNumber(data.price) }}
                {{ data.currency }}
              </span>
            </p>
            <UButton
              v-if="
                checkBtn(
                  data.provider_id,
                  data.airline_code,
                  data.price_fare_family,
                )
              "
              type="primary"
              class="rounded-[1rem] mt-0 md:mt-3 w-[100px] justify-center"
              :loading="loading"
              @click="buyTicketBtn(data)"
            >
              {{ $t('157') }}
            </UButton>
          </div>
          <UButton
            v-if="data.tariff_status"
            class="w-[100px] mt-2 justify-center"
            type="primary"
            plain
            @click="dialogTariff(data)"
          >
            <div
              v-if="
                data.provider_id === 4 &&
                data.price_fare_family &&
                data.airline_code === 'HY'
              "
            >
              {{ $t('73') }}
            </div>
            <div v-else>{{ $t('327') }}</div>
          </UButton>
          <UButton
            v-if="data?.price_fare_family"
            plain
            type="primary"
            class="w-[100px] mt-2 justify-center"
            :loading="loadingTarif"
            @click="regularTariffs(data)"
          >
            <div
              v-if="
                data.provider_id === 4 &&
                data.price_fare_family === true &&
                data.airline_code === 'HY'
              "
            >
              {{ $t('73') }}
            </div>
            <div v-else>{{ $t('327') }}</div>
          </UButton>
          <button
            class="detailed-btn btn-primary flex items-center justify-center"
            type="button"
            :class="openCollapse ? 'change-arrow-direct' : null"
            @click="openCollapse = !openCollapse"
          >
            {{ $t('250') }}
            <i class="fa-light fa-chevron-down" style="color: #0073ff"></i>
          </button>
        </div>
      </div>
      <CollapseTransition
        dimension="height"
        :duration="300"
        easing="ease-in-out"
      >
        <div v-if="openCollapse" class="mt-4">
          <div
            v-for="(elem, i) in data.offers"
            :key="i + 'offers'"
            class="fly-info flex flex-col gap-3"
          >
            <div
              v-for="(segment, index) in elem.segments"
              :key="index + 'segment'"
              class="grid grid-cols-12 gap-2 mb-4"
            >
              <div
                v-if="segment.avia_company.logo"
                class="col-span-6 md:col-span-2"
              >
                <div class="logo-wrap flex items-center justify-end">
                  <img :src="segment.avia_company.logo" alt="" />
                </div>
              </div>
              <div
                :class="
                  segment.avia_company.logo ? 'col-span-6' : 'col-span-12'
                "
                class="md:col-span-5 grow-1 mb-3 md:mb-0"
              >
                <div class="flex items-center flex-wrap gap-2">
                  <p>{{ $t('176') }}:</p>
                  <p>
                    <strong
                      >{{ segment.departure.city }} -
                      {{ segment.arrival.city }}</strong
                    >
                  </p>
                </div>
                <div class="flex items-center gap-2">
                  <p>{{ $t('75') }}:</p>
                  <p>{{ segment.departure.time_format }}</p>
                </div>
                <div class="flex items-center gap-2">
                  <p>{{ $t('274') }}:</p>
                  <p>{{ segment.arrival.time_format }}</p>
                </div>
                <div v-if="segment.stop_time" class="flex items-start gap-2">
                  <p>{{ $t('12') }}:</p>
                  <p>{{ segment.stop_time }}</p>
                </div>
              </div>
              <div class="col-span-6 md:col-span-2">
                <div class="flex items-center gap-2">
                  <p>{{ $t('288') }}:</p>
                  <p>{{ segment.flight }}</p>
                </div>
                <div class="flex items-center gap-2">
                  <!-- <p>{{ elem.arrival.time_format }}</p> -->
                  <p>{{ $t('35') }}:</p>
                  <p>{{ segment.baggage }}</p>
                </div>
                <div class="flex items-center gap-2">
                  <!-- <p>{{ elem.arrival.city }}</p> -->
                  <p>{{ $t('143') }}:</p>
                  <p>({{ segment.class }})</p>
                </div>
                <template v-if="segment.stop_time">
                  <div
                    v-if="elem.stops > 0 && index + 1 < elem.segments.length"
                    class="flex items-start gap-2 mt-3"
                  >
                    <p>
                      <b class="text-[#AAAAAA]"> {{ $t('12') }}:</b>
                    </p>
                    <p>
                      <b>{{ segment.stop_time }}</b>
                    </p>
                  </div>
                </template>
              </div>
              <div class="col-span-6 md:col-span-3">
                <div class="flex items-center gap-2">
                  <p>{{ $t('63') }}:</p>
                  <p>{{ segment.duration }}</p>
                </div>
                <div class="flex items-center gap-2">
                  <p>{{ $t('330') }}:</p>
                  <p v-if="segment.departure.terminal">
                    {{ segment.departure.terminal }}
                  </p>
                  <p v-else>No data</p>
                </div>
                <div class="flex items-center gap-2">
                  <p>{{ $t('294') }}:</p>
                  <p v-if="segment.plane">{{ segment.plane }}</p>
                  <p v-else>No data</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CollapseTransition>
      <div
        v-if="data.debug?.length"
        class="flex flex-wrap items-center gap-2 mt-3"
      >
        <div v-for="(elem, key) in data.debug" :key="key" class="shrink-0">
          <p>{{ elem }}</p>
        </div>
      </div>
    </div>
    <UModal
      v-model="dialogVisible"
      class="tarif-dialog"
      :ui="{ width: 'sm:max-w-full md:!w-[50%]' }"
      :fullscreen="width < 768"
    >
      <div
        v-if="width < 768"
        class="w-full mb-3 flex justify-between items-center gap-3 p-3 pb-0 mt-10"
        @click="dialogVisible = false"
      >
        <span>{{ $t('327') }}</span>
        <i class="fa-sharp fa-solid fa-xmark"></i>
      </div>
      <div class="h-full flex flex-col justify-between p-3">
        <div v-for="(item, index) in data.offers" :key="index + 'offer'">
          <p class="t-direction">
            {{ item.departure.city }} ->
            {{ item.arrival.city }}
          </p>
          <div>
            <div v-if="item.tariff.length > 0">
              <div class="flex gap-3 items-start overflow-x-auto mb-3 pb-3">
                <div
                  v-for="(elem, ind) in item.tariff"
                  :key="ind"
                  class="h-full min-w-[60%] md:min-w-[40%] md:min-w-auto border cursor-pointer rounded-md hover:border-[#0073FF] transition-all p-3"
                  :class="
                    selectedTariff[ind] === elem.buy_id
                      ? 'border-[#0073FF]'
                      : ''
                  "
                  @click="selectedTariff[ind] = elem?.buy_id"
                >
                  <div>
                    <p class="tarif-name text-center mb-3">{{ elem.tariff }}</p>
                    <div v-for="(k, inx) in elem.items" :key="inx">
                      <div class="flex items-center gap-2 mb-1 text-wrap">
                        <i
                          v-if="k.status !== 'Нет'"
                          class="fa-sharp fa-solid fa-circle-check text-[#05A518]"
                        ></i>
                        <i
                          v-else
                          class="fa-sharp fa-solid fa-circle-xmark text-[#E31A17]"
                        ></i>
                        <p class="title">{{ k.title }}</p>
                      </div>
                    </div>
                    <div class="price-wrap w-full mt-3 p-2">
                      <p>
                        {{
                          Number(elem.price_format) +
                          Number(
                            formatNumber(data?.offers[0]?.priceINF?.totalB2c),
                          )
                        }}
                        USD
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-center text-base mb-4">{{ $t('326') }}</div>
          </div>
        </div>
        <div class="w-full flex justify-center gap-3">
          <UButton
            type="primary"
            class="w-[200px] items-center justify-center"
            size="lg"
            plain
            :loading="loadingTarif"
            @click="buyTarifBtn"
            >{{ $t('157') }}</UButton
          >
        </div>
      </div>
    </UModal>
    <MbscPopup
      :is-open="etsDialog"
      class="tarif-dialog"
      display="bottom"
      theme-variant="light"
      theme="material"
      :full-screen="true"
      :scroll-lock="false"
      css-class="small-popup"
    >
      <div class="flex h-full flex-col">
        <div
          class="w-full mb-3 flex justify-between items-center gap-3 p-3 pb-0 mt-10"
          @click="etsDialog = false"
        >
          <span>{{ $t('327') }}</span>
          <i class="fa-sharp fa-solid fa-xmark"></i>
        </div>
        <div class="flex flex-col justify-between p-3 grow">
          <div class="flex gap-3 items-start overflow-x-auto mb-3 pb-3">
            <div
              v-for="(elem, index) in regularTariffList"
              :key="index"
              class="h-full min-w-[60%] md:min-w-[40%] md:min-w-auto border cursor-pointer rounded-md hover:border-[#0073FF] transition-all p-3"
              :class="regTarif === elem.buy_id ? 'border-[#0073FF]' : ''"
              @click="regTarif = elem?.buy_id"
            >
              <div class="min-h-[340px] min-w-full flex flex-col">
                <p class="tarif-name text-center mb-3">
                  {{ elem.segments[0]?.ff_data?.name }}
                </p>
                <div>
                  <div
                    v-for="(item, inx) in elem.segments[0]?.ff_data.services"
                    :key="inx"
                    class="flex items-center gap-2 mb-1 text-wrap"
                  >
                    <i
                      v-if="item.status !== 'extra'"
                      class="fa-sharp fa-solid fa-circle-check text-[#05A518]"
                    ></i>
                    <i
                      v-else
                      class="fa-sharp fa-solid fa-circle-xmark text-[#E31A17]"
                    ></i>
                    <p class="title">{{ item.name }}</p>
                  </div>
                </div>
                <div
                  class="price-wrap w-full p-2 text-center rounded text-white !bg-[#0073FF] mt-auto"
                >
                  <p>{{ formatNumber(elem.price) }} USD</p>
                </div>
              </div>
            </div>
          </div>
          <UButton
            type="primary"
            class="w-full md:!w-[200px] items-center justify-center mt-auto"
            size="lg"
            plain
            :loading="loadingTarif"
            :disabled="regTarif === null"
            @click="buyRegTarifBtn"
            >{{ t('157') }}</UButton
          >
        </div>
      </div>
    </MbscPopup>
  </div>
</template>

<script setup lang="ts">
import '@mobiscroll/datepicker-vue/dist/css/mobiscroll.min.css'

import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue'
import { MbscPopup } from '@mobiscroll/datepicker-vue'
import dayjs from 'dayjs'
import type { Ref } from 'vue'

import type { IResponse } from '@/types'
import type { IRegularTariff } from '@/types/avia'
import type { IFlight } from '@/types/tour'
import { formatNumber } from '@/utils'
import { useAuthValidation } from '~/composables/useAuthValidation'

interface Props {
  data: IFlight
}

const props = defineProps<Props>()

const { checkRegister } = useAuthValidation()
const { t, locale } = useI18n()
const router = useRouter()
const { myToast } = useCustomToast()
const { width } = useWindowSize()
const store = useAviaStore()
const authRequired = ref(false)
const dialogVisible = ref(false)
const openCollapse = ref(false)
const loading = ref(false)
const loadingTarif = ref(false)
const etsDialog = ref(false)
const regTarif = ref(null)
const ticketItem = ref(null)
const regularTariffList: Ref<IRegularTariff[] | null> = ref(null)
const selectedTariff = ref([])
const callFunction = ref({
  func: null,
  params: null,
})
const regularTariffs = async (ticket: IFlight) => {
  loadingTarif.value = true
  ticketItem.value = ticket
  try {
    const res = await useApi().$get<IResponse<IRegularTariff[]>>(
      `/v1/tickets/get-tariff?buy_id=${ticket.buy_id}`,
    )

    regularTariffList.value = res?.data
  } catch (err) {
    console.log(err)
  }
  etsDialog.value = true
  loadingTarif.value = false
}
const checkBtn = (provider, airline, tariff) => {
  return !(provider === 4 && airline === 'HY' && tariff)
}
const buyTicketBtn = async (ticket) => {
  loading.value = true
  try {
    const res = await store.fetchTicketDetail(ticket.buy_id)
    if (res?.ticket) {
      await router.push({
        path: `/${locale.value}/avia/booking`,
        query: { buy_id: ticket.buy_id },
      })
    } else {
      loading.value = false
      myToast('warning', t('39'))
    }
  } catch (err) {
    console.log(err)
    myToast('error', err?._data?.errors?.message)
  } finally {
    loading.value = false
  }
}
const buyTarifBtn = async () => {
  loadingTarif.value = true
  const check = {
    product_id: props.data?.product_id,
    buy_id: props.data.buy_id,
  }
  try {
    const res = await useApi().$post('/v1/flight/check', {
      body: check,
      params: {
        platform: 'app',
      },
    })
    if (res?.data?.ticket === true) {
      loading.value = false
      await router.push({
        path: `/${locale.value}/avia/booking`,
        query: {
          buy_id: props.data.buy_id,
          tariff_id: selectedTariff.value.join(','),
        },
      })
    } else {
      loading.value = false
      myToast('warning', t('39'))
    }
  } catch (err) {
    console.log(err)
  } finally {
    loadingTarif.value = false
  }
}
const buyRegTarifBtn = async () => {
  if (regTarif.value) {
    loadingTarif.value = true
    const check = {
      product_id: 1,
      buy_id: regTarif.value,
    }
    try {
      const res = await useApi().$post('/v1/flight/check', {
        body: check,
        params: {
          platform: 'app',
        },
      })
      if (res?.data?.ticket) {
        loading.value = false
        await router.push({
          path: `/${locale.value}/avia/booking`,
          query: { buy_id: regTarif.value },
        })
      } else {
        loading.value = false
        myToast('warning', t('39'))
      }
    } catch (err) {
      console.log(err)
    } finally {
      loadingTarif.value = false
    }
  }
}
const dialogTariff = () => {
  dialogVisible.value = true
}
const onModalClose = () => {
  authRequired.value = false
  console.log('working', authRequired.value)
  if (!checkRegister()) return
  callFunction.value.params
    ? callFunction.value.func?.(callFunction.value.params)
    : callFunction.value.func?.()
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/scss/style.scss';
.ticket-card {
  padding: 20px 30px 20px 30px;
  border-radius: 20px;
  background: #fff;
  .text {
    @include common-text-style(14px, 400, normal);
    margin-bottom: 1px;
  }
  .time {
    @include common-text-style(24px, 600, normal);
    margin-bottom: 1px;
  }
  .avia-company-logo {
    width: 100px;
    object-fit: cover;
  }
  .line {
    border: 3px solid #d5d9de;
    border-radius: 50px;
    width: 100%;
    position: relative;
    .circle {
      transform: translateY(-50%);
      box-shadow: rgba(51, 146, 255, 0.25) 0px 0px 3px 4px;
      border-radius: 50%;
      background: #3392ff;
      width: 12px;
      height: 12px;
    }
    .left {
      transform: translate(-50%, -50%);
    }
    .right {
      transform: translate(50%, -50%);
    }
    .abbr {
      @include common-text-style(14px, 500, normal);
      color: #3392ff;
    }
  }
  .price-view {
    @include common-text-style(15px, 600, normal);
    padding: 16px 0;
  }
  .price {
    @include common-text-style(20px, 600, normal);
  }
  .road-time {
    @include common-text-style(13px, 500, normal);
    color: #33333380;
    text-align: center;
    margin-top: 2px;
  }
  .luggage {
    @include common-text-style(13px, 500, normal);
    color: #333333;
  }
  .fly-info {
    @include common-text-style(13px, 400, 20px);
    color: #000;
    p {
      margin: 0;
      svg {
        width: 16px;
        height: 16px;
        margin-right: 4px;
        path {
          fill: #0d6efd;
        }
      }
    }
    .logo-wrap {
      width: 100px;
      height: 44px;
      object-fit: cover;
      img {
        width: 100%;
      }
    }
  }
  .detailed-btn {
    width: 75%;
    padding: 0;
    border-radius: 10px 10px 0 0;
    outline: none;
    margin-top: 10px;
    @include common-text-style(13px, 500, normal);
    color: #0073ff;
    svg {
      transition: ease-in-out 0.4s;
      path {
        stroke: #fff;
      }
    }
  }
  .btn-primary {
    box-shadow: none;
  }
  .change-arrow-direct {
    svg {
      transform: rotate(-180deg);
    }
  }
}
.tooltip-base-box {
  width: 600px;
}
.tooltip-base-box .row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tooltip-base-box .center {
  justify-content: center;
}
.tooltip-base-box .box-item {
  width: 110px;
  margin-top: 10px;
}
.tarif-dialog {
  .choosen-tarif {
    background: #a5d2ffce;
  }
  .price-wrap {
    border: 1px solid #fff;
    background: #8dc6ff;
  }
  .tarif-card {
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    padding: 14px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
  }
  .tarif-card:hover {
    box-shadow:
      rgba(0, 0, 0, 0.19) 0px 10px 20px,
      rgba(0, 0, 0, 0.23) 0px 6px 6px;
  }
  .tarif-name {
    @include common-text-style(18px, 600, normal);
  }
  .title {
    @include common-text-style(15px, 500, 22px);
  }
  .t-direction {
    text-align: center;
    margin-bottom: 10px;
    @include common-text-style(20px, 500, 20px);
  }
}
</style>
