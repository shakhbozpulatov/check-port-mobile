<template>
  <div class="ticket-card bg-white mb-7 w-full relative">
    <UBadge
      v-if="data?.provider_id === 1"
      :ui="{ base: '!absolute !top-3 !right-3' }"
    >
      <div class="flex items-center gap-1">
        <i class="fa-light fa-plane"></i>
        <p class="luggage !text-white">{{ $t('367') }}</p>
      </div>
    </UBadge>
    <div class="flex items-center gap-4 flex-wrap md:flex-nowrap w-full">
      <div class="flex flex-col gap-4 w-full">
        <div
          v-for="(elem, index) in data?.offers"
          :key="'avia' + index"
          class="flex flex-col"
        >
          <div
            v-if="user?.id === 1 || user?.id === 147"
            class="flex gap-2 mb-3"
          >
            <span> provider: {{ elem?.provider_id }} </span>
            <span> duration: {{ elem?.duration_minutes }} </span>
            <span> stops: {{ elem?.stops }} </span>
            <span> baggage: {{ elem?.baggage }} </span>
            <span> baggage_status: {{ elem?.baggage_status }} </span>
          </div>

          <div class="logo-wrap flex items-center justify-between gap-2">
            <UTooltip
              class="box-item"
              :text="elem.avia_company.name"
              :popper="{ plcaement: 'top' }"
            >
              <div class="avia-company-logo">
                <img :src="elem.avia_company.logo" alt="" />
              </div>
            </UTooltip>
            <div class="flex gap-1 items-center">
              <i class="fa-regular fa-suitcase-rolling text-[#0073FF]"></i>
              <p class="luggage">{{ $t('35') }}: {{ elem.baggage }}</p>
            </div>
          </div>
          <div class="w-full flex items-end flex-wrap justify-between mt-3">
            <div class="w-[40%] md:w-[12.5%]">
              <p class="text">{{ elem.departure.city }}</p>
              <p class="time">
                {{ elem.departure.time_format }}
              </p>
              <p class="text">
                {{ new Date(elem.departure.date_format).toLocaleDateString() }}
              </p>
            </div>
            <div
              class="px-3 order-[-1] md:order-[0] mt-4 md:mt-[0] mb-4 md:mb-[0] w-[100%] md:w-[75%]"
            >
              <div class="line flex justify-between !w-full">
                <div
                  class="absolute left-[-2px] bottom-[-12px] flex items-center justify-between !w-full"
                >
                  <div class="circle">
                    <UTooltip
                      class="box-item"
                      :text="elem.departure.name"
                      :popper="{ placement: 'top' }"
                    >
                      <p class="abbr absolute top-[-37px] right-[-20px]">
                        {{ elem.departure.code }}
                      </p>
                    </UTooltip>
                  </div>
                  <div
                    v-for="(stop, iSegment) in elem.segments"
                    :key="iSegment + 'segment'"
                  >
                    <UTooltip
                      v-if="stop.arrival.code !== elem.arrival.code"
                      :text="`${stop.arrival.city}, ${stop.arrival.name}`"
                      :popper="{ placement: 'top' }"
                    >
                      <div class="circle">
                        <p class="abbr absolute top-[-37px] right-[-20px]">
                          {{ stop.arrival.code }}
                        </p>
                      </div>
                    </UTooltip>
                  </div>
                  <div class="circle right-0 right relative">
                    <UTooltip
                      class="box-item"
                      :text="elem.arrival.name"
                      :popper="{ placement: 'top' }"
                    >
                      <p class="abbr absolute top-[-37px] right-[-20px]">
                        {{ elem.arrival.code }}
                      </p>
                    </UTooltip>
                  </div>
                </div>
              </div>
              <p class="road-time mt-2">{{ $t('47') }}: {{ elem.duration }}</p>
            </div>
            <div
              class="w-[40%] md:w-[12.5%] flex flex-col items-end justify-end text-end"
            >
              <p class="text">{{ elem.arrival.city }}</p>
              <p class="time">{{ elem.arrival.time_format }}</p>
              <p class="text text-end">
                {{ new Date(elem.arrival.date_format).toLocaleDateString() }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="w-full md:w-[23%] flex flex-col justify-center items-center">
        <div
          class="flex flex-row md:flex-col items-center justify-between !w-full mb-3 md:mb-0"
        >
          <p v-if="data.price_result >= 0" class="price text-center">
            +{{ formatNumber(data.price_result) }} {{ data.currency }}
          </p>
          <p v-else class="price text-center">
            {{ formatNumber(data.price_result) }}
            {{ data.currency }}
          </p>
          <UButton
            class="rounded-[1rem] mt-0 md:mt-3 justify-center"
            size="lg"
            :loading="loading"
            @click="buyTicketBtn(data)"
          >
            {{ $t('73') }}
          </UButton>
        </div>
        <!--        <UButton-->
        <!--          v-if="data.tariff_status"-->
        <!--          class="mt-2 justify-center min-w-[85px]"-->
        <!--          size="lg"-->
        <!--          @click="dialogTariff(data)"-->
        <!--          >{{ $t('325') }}</UButton-->
        <!--        >-->
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
    <CollapseTransition dimension="height" :duration="300" easing="ease-in-out">
      <div v-if="openCollapse" class="mt-4">
        <div
          v-for="(elem, i) in data?.offers"
          :key="'offer' + i"
          class="fly-info flex flex-col gap-3 border-b mb-2 pb-2 border-dashed last-of-type:border-0 last-of-type:mb-0 last-of-type:pb-0"
        >
          <div
            v-for="(segment, ind) in elem.segments"
            :key="'segment' + ind"
            class="grid grid-cols-3 md:grid-cols-12 gap-3"
          >
            <div class="md:col-span-4">
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
              <div v-if="segment.stop_time" class="flex items-start gap-2">
                <p>{{ $t('12') }}:</p>
                <p>{{ segment.stop_time }}</p>
                <!-- <p>{{ elem.departure.date_format }}</p> -->
              </div>
            </div>
            <div class="md:col-span-4">
              <div class="flex items-center gap-2">
                <p>{{ $t('63') }}:</p>
                <p>{{ segment.duration }}</p>
              </div>
              <div class="flex items-center gap-2">
                <p>{{ $t('320') }}:</p>
                <p>{{ segment.departure.terminal }}</p>
              </div>
              <div class="flex items-center gap-2">
                <p>{{ $t('294') }}:</p>
                <p>{{ segment.plane }}</p>
              </div>
            </div>
            <div class="md:col-span-4">
              <div class="flex items-start gap-2"></div>

              <div class="logo-wrap flex items-center justify-end">
                <img :src="segment.avia_company.logo" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </CollapseTransition>
    <UModal
      v-model="dialogVisible"
      class="tarif-dialog"
      width="70%"
      :before-close="handleClose"
    >
      <div>
        <div v-for="(item, index) in data?.offers" :key="index + 'offer'">
          <p class="t-direction">
            {{ item.departure.city }} ->
            {{ item.arrival.city }}
          </p>
          <div>
            <div v-if="item.tariff.length > 0">
              <!--              <div class="flex gap-3 items-start overflow-x-auto mb-3 pb-3">-->
              <!--                <div-->
              <!--                  v-for="(elem, index) in item.tariff"-->
              <!--                  :key="index"-->
              <!--                  class="h-full min-w-[60%] md:min-w-[40%] md:min-w-auto border cursor-pointer rounded-md hover:border-[#0073FF] transition-all p-3"-->
              <!--                  :class="-->
              <!--                    selectedTariff[index] === elem.buy_id-->
              <!--                      ? 'border-[#0073FF]'-->
              <!--                      : ''-->
              <!--                  "-->
              <!--                  @click="selectedTariff[index] = elem?.buy_id"-->
              <!--                >-->
              <!--                  <div>-->
              <!--                    <p class="tarif-name text-center mb-3">{{ elem.tariff }}</p>-->
              <!--                    <div v-for="(item, inx) in elem.items" :key="inx">-->
              <!--                      <div class="flex items-center gap-2 mb-1 text-wrap">-->
              <!--                        <i-->
              <!--                          v-if="item.status !== 'Нет'"-->
              <!--                          class="fa-sharp fa-solid fa-circle-check text-[#05A518]"-->
              <!--                        ></i>-->
              <!--                        <i-->
              <!--                          v-else-->
              <!--                          class="fa-sharp fa-solid fa-circle-xmark text-[#E31A17]"-->
              <!--                        ></i>-->
              <!--                        <p class="title">{{ item.title }}</p>-->
              <!--                      </div>-->
              <!--                    </div>-->
              <!--                    <div class="price-wrap w-full mt-3 p-2">-->
              <!--                      <p>-->
              <!--                        {{-->
              <!--                          Number(elem.price_format) +-->
              <!--                          Number(-->
              <!--                            formatNumber(data?.offers[0]?.priceINF?.totalB2c),-->
              <!--                          )-->
              <!--                        }}-->
              <!--                        USD-->
              <!--                      </p>-->
              <!--                    </div>-->
              <!--                  </div>-->
              <!--                </div>-->
              <!--              </div>-->

              <!--              <el-radio-group-->
              <!--                v-model="config.tariff[index]"-->
              <!--                size="large"-->
              <!--                class="!w-full"-->
              <!--              >-->
              <!--                <el-radio-button-->
              <!--                  v-for="(elem, index) in item.tariff"-->
              <!--                  :key="index"-->
              <!--                  class="mb-3 w-[100%] md:w-[33%]"-->
              <!--                  :label="elem.buy_id"-->
              <!--                >-->
              <!--                  <div>-->
              <!--                    <p class="tarif-name text-center mb-3">{{ elem.tariff }}</p>-->
              <!--                    <div v-for="(item, inx) in elem.items" :key="inx">-->
              <!--                      <div class="flex items-center gap-2 mb-1 text-wrap">-->
              <!--                        <el-icon-->
              <!--                          v-if="item.status !== 'Нет'"-->
              <!--                          color="#05A518"-->
              <!--                          size="18px"-->
              <!--                          ><CircleCheck-->
              <!--                        /></el-icon>-->
              <!--                        <el-icon v-else color="#E31A17" size="18px"-->
              <!--                          ><Remove-->
              <!--                        /></el-icon>-->
              <!--                        <p class="title">{{ item.title }}</p>-->
              <!--                      </div>-->
              <!--                    </div>-->
              <!--                    <div class="price-wrap !w-full mt-3 p-2">-->
              <!--                      <p>-->
              <!--                        {{-->
              <!--                          Number(elem.price_format) +-->
              <!--                          Number(-->
              <!--                            formatNumber(data?.offers[0]?.priceINF?.totalB2c),-->
              <!--                          )-->
              <!--                        }}-->
              <!--                        USD-->
              <!--                      </p>-->
              <!--                    </div>-->
              <!--                  </div>-->
              <!--                </el-radio-button>-->
              <!--              </el-radio-group>-->
            </div>
            <div v-else class="text-center text-base mb-4">{{ $t('326') }}</div>
          </div>
        </div>
        <!--        <div class="!w-full flex justify-center gap-3">-->
        <!--          <UButton-->
        <!--            color="red"-->
        <!--            size="lg"-->
        <!--            class="w-[200px]"-->
        <!--            @click="cancelTarifBtn"-->
        <!--            >{{ t('230') }}</UButton-->
        <!--          >-->
        <!--          <UButton-->
        <!--            class="w-[200px] items-center"-->
        <!--            size="lg"-->
        <!--            :loading="loadingTarif"-->
        <!--            @click="buyTarifBtn"-->
        <!--            >{{ t('157') }}</UButton-->
        <!--          >-->
        <!--        </div>-->
      </div>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import type { IFlight } from '@/types/tour'
import { formatNumber } from '@/utils'

interface Props {
  data: IFlight
}
defineProps<Props>()
const $emit = defineEmits<{
  (e: 'on-change-ticket'): void
  (e: 'on-close'): void
}>()
const store = useTourStore()
const authStore = useAuthStore()
// const selectedTariff = ref([])

const openCollapse = ref(false)
const user = computed(() => authStore.user)
const dialogVisible = ref(false)
const loading = ref(false)
// const choseTicket = ref(null)
const buyTicketBtn = async (ticket: IFlight) => {
  loading.value = true
  const res = await store.changeTicket(ticket?.buy_id)
  if (res?.code === 1) {
    $emit('on-change-ticket')
    $emit('on-close')
  }
  loading.value = false
}
// const dialogTariff = (ticket) => {
//   dialogVisible.value = true
//   config.product_id = ticket.product_id
//   config.provider_id = ticket.provider_id
//   config.buy_id = ticket.buy_id
//   config.uniqueTicket = []
//   config.uniqueTicket.push(ticket)
// }

// const withBaggage = computed(() => {
//   if (filtering.baggage) {
//     return 1;
//   }
//   return 0;
// });

// const buyTarifBtn = async () => {
//   if (config.tariff.length > 0) {
//     const check = {
//       product_id: config.product_id,
//       buy_id: config.buy_id,
//     }
//     const res = await checkIsExistTicket(check, t)
//     if (res.data.data.ticket === true) {
//       loading.value = false
//       await router.push('/booking')
//     } else {
//       loading.value = false
//       // toast.info(t('39'))
//     }
//
//     // toast.success(t('67'))
//     await router.push('/booking')
//     loadingTarif.value = true
//   }
// }
// const cancelTarifBtn = () => {
//   config.tariff = []
// }

// const handleClose = () => {
//   ElMessageBox.confirm(t('67'))
//     .then(() => {
//       config.tariff = []
//       dialogVisible.value = false
//     })
//     .catch(() => {
//       // catch error
//     })
// }
</script>

<style lang="scss" scoped>
@import '@/assets/style/scss/style';
.ticket-card {
  padding: 20px;
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
      transform: translateY(-30%);
      box-shadow: rgba(51, 146, 255, 0.25) 0px 0px 3px 4px;
      border-radius: 50%;
      background: #3392ff;
      width: 12px;
      height: 12px;
    }
    .left {
      transform: translate(-50%, -30%);
    }
    .right {
      transform: translate(50%, -30%);
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
