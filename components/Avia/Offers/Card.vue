<template>
  <div>
    <div
      class="rounded-[1rem] bg-white border p-3 mb-3 grid grid-cols-1 gap-3 relative"
      @click="ticketDialog = true"
    >
      <template v-for="(ticket, index) in data.offers" :key="index + 'ticket'">
        <div>
          <div class="flex gap-3 items-center justify-between">
            <img :src="ticket.avia_company.logo" alt="logo" class="h-[40px]" />
            <div class="flex items-center text-[12px]">
              <i class="fa-light fa-ticket-airline text-[#3492ff]"></i
              ><span class="luggage"
                >: ({{ ticket.class }})
                <template
                  v-if="store.allTicketsResponse?.request?.class === 'E'"
                  >{{ ticket.class !== 'C' ? $t('368') : $t('37') }}</template
                ><template v-else>{{ $t('37') }}</template>
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
              class="flex items-center text-[12px]"
            >
              <i class="fa-light fa-suitcase-rolling text-[#3492ff]"></i
              ><span class="luggage">: {{ ticket.baggage }}</span>
            </div>
            <b v-if="index === 0">
              <span
                v-if="
                  data?.offers[0]?.provider_id === 1 &&
                  data?.offers?.length === 1
                "
              >
                {{
                  formatNumber(Math.ceil(data?.offers[0]?.priceINF?.totalB2c))
                }}
                {{ data.currency }}
              </span>
              <span
                v-else-if="
                  data?.offers[0]?.provider_id === 1 &&
                  data?.offers?.length === 2
                "
              >
                {{
                  formatNumber(Math.ceil(data?.offers[1]?.priceINF?.totalB2c))
                }}
                {{ data.currency }}
              </span>
              <span v-else class="">
                {{ formatNumber(Math.ceil(data.price)) }}
                {{ data.currency }}
              </span>
            </b>
          </div>
          <div class="grid grid-cols-8 gap-3 items-center justify-between">
            <div class="col-span-2 flex flex-col items-start gap-2">
              <p class="text-[14px]">{{ ticket?.departure?.time_format }}</p>
              <p class="text-[14px]">
                {{ dayjs(ticket?.departure?.date_format).format('DD.MM.YYYY') }}
              </p>
              <UBadge
                variant="soft"
                color="primary"
                size="sm"
                class="bg-[#0073ff30] font-bold text-[10px]"
              >
                {{ ticket?.departure?.code }}</UBadge
              >
            </div>
            <div class="col-span-4">
              <img
                :src="`/images/icons/ticket_route.svg`"
                alt="img"
                class="w-full"
              />
            </div>
            <div class="col-span-2 flex flex-col items-end gap-2">
              <p class="text-[14px]">{{ ticket?.arrival?.time_format }}</p>
              <p class="text-[14px]">
                {{ dayjs(ticket?.arrival?.date_format).format('DD.MM.YYYY') }}
              </p>
              <UBadge
                variant="soft"
                color="primary"
                size="sm"
                class="bg-[#0073ff30] font-bold text-[10px]"
                >{{ ticket?.arrival?.code }}</UBadge
              >
            </div>
          </div>
          <hr class="my-2" />
          <div class="flex gap-3 items-center justify-between">
            <div class="flex gap-3 items-center">
              <span class="text-[12px] text-gray-400 shrink-0"
                >{{ ticket?.duration }}
                <span v-if="ticket?.stops !== 0">
                  ({{ ticket?.stops }} {{ $t('416') }})
                </span>
              </span>
              <div
                v-if="ticket.provider_id === 1"
                class="flex gap-3 items-center"
              >
                <i
                  class="fa-sharp fa-light fa-circle-dot text-gray-400 text-[12px]"
                ></i>
                <div class="flex items-center gap-3">
                  <img
                    src="/images/mini_logo_blue.svg"
                    alt="logo"
                    width="18px"
                  />
                  <span class="text-[12px] text-gray-400">{{
                    $t('charters')
                  }}</span>
                </div>
              </div>
              <!--              <span class="text-[12px] text-gray-400">1h 25m in CDG</span>-->
            </div>
            <div
              v-if="data.offers.length === 1"
              class="text-[12px] text-[#0073ff] text-center"
              @click="ticketDialog = true"
            >
              {{ $t('250') }}
            </div>
          </div>
        </div>
        <hr
          v-if="data.offers.length - 1 > index"
          class="flex items-center border border-dashed w-[90%] mx-auto my-5 before:content-[''] before:w-10 before:h-10 before:bg-[#f8f8f8] before:absolute before:rounded-[1rem] before:-left-6 before:rotate-45 after::content-[''] after:w-10 after:h-10 after:bg-[#f8f8f8] after:absolute after:rounded-xl after:-right-6 after:rotate-45"
        />
        <div
          v-if="data.offers.length > 1 && data.offers.length - 1 === index"
          class="text-[12px] text-[#0073ff] text-center"
          @click="ticketDialog = true"
        >
          {{ $t('250') }}
        </div>
      </template>
    </div>
    <MbscPopup
      :is-open="ticketDialog"
      class="tarif-dialog"
      display="bottom"
      theme-variant="light"
      theme="material"
      :full-screen="true"
      :scroll-lock="false"
      css-class="small-popup relative"
    >
      <div class="mb-44">
        <div
          class="w-[40px] bg-[#F3F4F6] mb-4 h-[8px] rounded-full m-auto mt-10"
          @click="ticketDialog = false"
        ></div>
        <div class="flex mb-3 justify-between items-center">
          <p class="font-bold text-[16px]">{{ $t('836') }}</p>
          <UButton
            size="sm"
            color="white"
            class="rounded-[1rem]"
            variant="ghost"
            @click="ticketDialog = false"
          >
            <i class="fa-solid fa-xmark text-[16px]"></i>
          </UButton>
        </div>
        <hr class="mb-5" />
        <div>
          <div
            v-for="(ticket, index) in data.offers"
            :key="index + 'ticket'"
            class="grid grid-cols-1 gap-3 p-3 shadow rounded-[1rem] mb-3"
          >
            <div class="flex gap-3 justify-between">
              <div class="flex flex-col gap-2">
                <i
                  class="fa-light fa-plane-departure text-[24px] text-[#0073ff]"
                ></i>
                <div>
                  <b class="text-[20px]">{{ ticket.departure?.time_format }}</b>
                  <p class="text-[14px]">
                    {{
                      dayjs(ticket.departure?.date_format).format('DD.MM.YYYY')
                    }}
                  </p>
                </div>
                <p class="text-[12px]">{{ ticket.departure?.code }}</p>
              </div>
              <div class="flex flex-col items-end gap-2">
                <i
                  class="fa-light fa-plane-arrival text-[24px] text-[#0073ff]"
                ></i>
                <div class="text-right">
                  <b class="text-[20px]">{{ ticket.arrival?.time_format }}</b>
                  <p class="text-[14px]">
                    {{
                      dayjs(ticket.arrival?.date_format).format('DD.MM.YYYY')
                    }}
                  </p>
                </div>
                <p class="text-[12px]">{{ ticket.arrival?.code }}</p>
              </div>
            </div>
            <div class="border rounded-[1rem] p-4 grid grid-cols-2 gap-3">
              <div>
                <template v-if="data?.refundable === 'Refundable'">
                  <i class="fa-light fa-repeat text-[#13C514] me-2"></i>
                  <span class="text-[14px]">
                    {{ $t('60') }}
                  </span>
                </template>
                <template v-else>
                  <i
                    class="fa-sharp fa-solid fa-circle-xmark text-[#E6434F] me-2"
                  ></i>
                  <span class="text-[14px]"> {{ $t('179') }} </span></template
                >
              </div>
              <div v-if="ticket.seats && ticket.provider_id === 1">
                <div v-if="ticket.seats" class="flex items-start gap-1">
                  <span class="luggage text-[14px]"
                    >{{ $t('220') }}: {{ ticket.seats }}</span
                  >
                </div>
              </div>
              <div>
                <div
                  v-if="
                    ticket?.provider_id === 1 && ticket?.block_status === false
                  "
                  class="flex items-center gap-2"
                >
                  <img
                    :src="`/images/mini_logo_blue.svg`"
                    alt="logo"
                    width="18px"
                  />
                  <span class="text-[14px]">{{ $t('367') }}</span>
                </div>
                <div
                  v-else-if="ticket?.provider_id === 1 && ticket?.block_status"
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
              v-for="(segment, ind) in ticket.segments"
              :key="ind"
              class="grid grid-cols-1 gap-3 p-3 border rounded-[1rem]"
            >
              <div class="flex gap-3 flex-col">
                <div class="flex justify-between gap-3">
                  <div>
                    <img
                      :src="segment.avia_company.logo"
                      alt="logo"
                      class="h-[50px]"
                    />
                    <div class="flex gap-3 items-center">
                      <span class="text-[12px] text-gray-400">{{
                        dayjs(segment.departure?.date_format).format(
                          'DD.MM.YYYY',
                        )
                      }}</span>
                      <i
                        class="fa-sharp fa-light fa-circle-dot text-gray-400 text-[12px]"
                      ></i>
                      <span class="text-[12px] text-gray-400">
                        <template
                          v-if="
                            store.allTicketsResponse?.request?.class === 'E'
                          "
                          >{{
                            segment.class !== 'C' ? $t('368') : $t('37')
                          }}</template
                        ><template v-else>{{ $t('37') }}</template>
                      </span>
                    </div>
                  </div>
                  <b>{{ segment.flight }}</b>
                </div>
                <hr class="border-dashed mb-3" />
                <div class="grid grid-cols-2 gap-3">
                  <div class="flex flex-col gap-1">
                    <span class="text-[12px]">{{ $t('62') }}</span>
                    <div>
                      <i
                        class="fa-light fa-plane-departure text-[#0073ff] me-2"
                      ></i>
                      <span class="text-[14px]">
                        {{ segment.departure?.time_format }} ({{
                          segment.departure.code
                        }})
                      </span>
                    </div>
                  </div>
                  <div class="flex flex-col gap-1">
                    <span class="text-[12px]">{{ $t('64') }}</span>
                    <div>
                      <i
                        class="fa-light fa-plane-arrival text-[#0073ff] me-2"
                      ></i>
                      <span class="text-[14px]"
                        >{{ segment.arrival?.time_format }} ({{
                          segment.arrival.code
                        }})</span
                      >
                    </div>
                  </div>
                  <div class="flex flex-col gap-1">
                    <span class="text-[12px]">{{ $t('64') }}</span>
                    <div>
                      <i class="fa-light fa-timer text-[#3492ff] me-2"></i>
                      <span class="text-[14px]">{{ segment?.duration }}</span>
                    </div>
                  </div>
                  <div class="flex flex-col gap-1">
                    <span class="text-[12px]">{{ $t('35') }}</span>
                    <div>
                      <i
                        class="fa-light fa-suitcase-rolling text-[#3492ff] me-2"
                      ></i>
                      <span class="text-[14px]">
                        {{
                          segment?.baggage !== '0Kg' || '0' || '0 Pc'
                            ? segment?.baggage
                            : $t('853')
                        }}
                      </span>
                    </div>
                  </div>
                  <div class="flex flex-col gap-1">
                    <span class="text-[12px]">{{ $t('330') }}</span>
                    <div>
                      <i
                        class="fa-light fa-right-to-bracket text-[#3492ff] me-2"
                      ></i>
                      <span class="text-[14px]">
                        {{ segment?.departure?.terminal || '-' }}
                      </span>
                    </div>
                  </div>
                  <div class="flex flex-col gap-1">
                    <span class="text-[12px]">{{ $t('144') }}</span>
                    <div>
                      <i
                        class="fa-light fa-person-seat text-[#0073ff] me-2"
                      ></i>
                      <span class="text-[14px]">{{ segment?.class }}</span>
                    </div>
                  </div>
                  <div v-if="segment?.plane" class="flex flex-col gap-1">
                    <span class="text-[12px]">{{ $t('294') }}</span>
                    <div>
                      <i class="fa-light fa-plane text-[#3492ff] me-2"></i>
                      <span class="text-[14px]">{{ segment?.plane }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="fixed bottom-0 bg-white w-full left-0 py-6 px-7">
        <UButton
          v-if="data?.price_fare_family"
          plain
          type="primary"
          class="w-full !h-[48px] my-2 justify-center rounded-[1rem]"
          :loading="loadingTarif"
          @click="regularTariffs(data)"
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
          v-if="data.tariff_status"
          class="w-full !h-[48px] my-2 justify-center rounded-[1rem]"
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
          v-if="
            checkBtn(
              data.provider_id,
              data.airline_code,
              data.price_fare_family,
            )
          "
          type="primary"
          class="rounded-[1rem] mt-0 md:mt-3 w-full !h-[48px] justify-center"
          :loading="loading"
          @click="buyTicketBtn(data)"
        >
          {{ $t('157') }}
        </UButton>
      </div>
    </MbscPopup>
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
      <div
        class="w-[40px] bg-[#F3F4F6] mb-4 h-[8px] rounded-full m-auto mt-10"
        @click="etsDialog = false"
      ></div>
      <div class="flex mb-3 justify-between items-center">
        <p class="font-bold text-[16px]">{{ $t('327') }}</p>
        <UButton
          size="sm"
          color="white"
          class="rounded-[1rem]"
          variant="ghost"
          @click="etsDialog = false"
        >
          <i class="fa-solid fa-xmark text-[16px]"></i>
        </UButton>
      </div>
      <hr class="mb-5" />
      <div class="flex h-full flex-col">
        <div class="flex flex-col justify-between p-3 relative">
          <div class="flex gap-3 items-start overflow-x-auto">
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
                  class="price-wrap w-full p-2 text-center rounded text-white !bg-[#0073FF] mt-auto rounded-[1rem]"
                >
                  <p>{{ formatNumber(elem.price) }} USD</p>
                </div>
              </div>
            </div>
          </div>
          <div class="fixed bottom-0 left-0 container py-6">
            <UButton
              type="primary"
              class="w-full items-center justify-center h-[48px] rounded-2xl"
              size="lg"
              plain
              :loading="loadingTarif"
              :disabled="regTarif === null"
              @click="buyRegTarifBtn"
              >{{ t('157') }}</UButton
            >
          </div>
        </div>
      </div>
    </MbscPopup>
  </div>
</template>

<script setup lang="ts">
import '@mobiscroll/datepicker-vue/dist/css/mobiscroll.min.css'

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

const store = useAviaStore()
const authRequired = ref(false)
const dialogVisible = ref(false)
const ticketDialog = ref(false)
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
