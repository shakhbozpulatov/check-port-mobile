<template>
  <div class="search-inputs flex flex-col gap-1 relative w-full">
    <div>
      <div class="relative flex items-center justify-between mb-1">
        <!--        <MbscSelect-->
        <!--          :data="charters"-->
        <!--          label-style="stacked"-->
        <!--          input-style="outline"-->
        <!--          placeholder="Please select..."-->
        <!--        />-->
        <USelectMenu
          v-model="form.departure"
          :placeholder="t('400')"
          option-attribute="label"
          :disabled="dashboardStore.loading"
          :ui="{
            base: '!w-full !rounded-t-[14px] !p-[10px_16px] border !h-[48px] disabled:bg-greyscale-200 disabled:!text-[#9CA3AF] transfer-select !shadow-0 focus:!ring-0 focus:border-none !ring-0',
            rounded: 'rounded-none',
            ring: 'ring-0',
          }"
          class="w-full *:*:!text-[14px]"
          :options="charters"
          @change="handleSelect"
        >
          <template #option-empty="{ query }">
            <q>{{ query }}</q> {{ $t('768') }}
          </template>
          <template #empty> {{ $t('768') }} </template>
          <template #option="data">
            <div class="py-2">
              <i class="fa-regular fa-plane-departure text-[#0073FF] mr-2"></i>
              {{ $t(data.option.label) }}
            </div>
          </template>
          <template #label>
            <div class="w-full flex justify-between items-center">
              {{ $t(form.departure?.label || '400') }}
              <img
                src="/images/icon_set/plane_up.svg"
                class="w-[20px] h-[20px]"
                alt="plane_up"
              />
            </div>
          </template>
        </USelectMenu>
        <div
          class="change-btn absolute z-10 cursor-pointer bottom-[-10px] right-0"
          @click="changeDirections"
        >
          <img src="/images/icons/change_reverse.svg" alt="" />
        </div>
      </div>
      <div class="relative">
        <USelectMenu
          v-model="form.arrival"
          :placeholder="t('400')"
          option-attribute="label"
          :disabled="dashboardStore.loading"
          :ui="{
            base: '!w-full border !p-[10px_16px] !h-[48px] disabled:bg-greyscale-200 disabled:!text-[#9CA3AF] transfer-select !shadow-0 focus:!ring-0 focus:border-none !ring-0',
            rounded: 'rounded-none',
            ring: 'ring-0',
          }"
          class="w-full *:*:!text-[14px]"
          :options="arrivalList"
          @change="handleSelectSecond"
        >
          <template #option-empty="{ query }">
            <q>{{ query }}</q> {{ $t('768') }}
          </template>
          <template #empty> {{ $t('768') }} </template>
          <template #option="data">
            <div class="py-2">
              <i class="fa-regular fa-plane-arrival text-[#0073FF] mr-2"></i>
              {{ $t(data.option.label) }}
            </div>
          </template>
          <template #label>
            <div class="w-full flex justify-between items-center">
              {{ $t(form.arrival?.label || '430') }}
              <img src="/images/icon_set/plane_down.svg" alt="plane_down" />
            </div>
          </template>
        </USelectMenu>
      </div>
    </div>
    <div class="flex flex-col gap-1">
      <div
        class="flex justify-between items-center py-2.5 px-4 bg-white h-[48px] text-sm w-full border"
        @click="datepickerModal = true"
      >
        <div
          v-if="form.start_date"
          class="flex items-center justify-start gap-10 w-full"
        >
          <div v-if="form.start_date" class="flex flex-col">
            <span class="text-[10px] text-gray-400"> {{ $t('75') }} </span>
            <span class="text-xs">
              {{ dayjs(form.start_date).format('DD MMM') }}
            </span>
          </div>
          <div v-if="form.end_date" class="flex flex-col">
            <span class="text-[10px] text-gray-400"> {{ $t('204') }} </span>
            <span class="text-xs">
              {{ dayjs(form.end_date).format('DD MMM') }}
            </span>
          </div>
        </div>
        <span v-else class="text-gray-400 h-[30px] flex items-center">{{
          $t('90')
        }}</span>
        <img
          src="/images/icon_set/calendar.svg"
          class="w-[20px] h-[20px]"
          alt="calendar"
        />
      </div>
      <div
        class="flex items-center justify-between rounded-b-[10px] border py-2.5 px-4 bg-white text-sm w-full"
        @click="passengerModal = true"
      >
        <div>
          <p class="text-[#00000066]">{{ $t('241') }}</p>
          <div>
            <span class="font-semibold mr-1 text-[#9CA3AF]">{{
              store.searchData.adult_qnt +
              store.searchData.child_qnt +
              store.searchData.infant_qnt
            }}</span>
            <span class="lg:inline hidden text-[#9CA3AF]">{{ t('240') }}</span
            >,
            <span class="text-[#9CA3AF] ms-1">
              {{
                options.find((el) => store.searchData.class === el.value).label
              }}
            </span>
          </div>
        </div>
        <img
          src="/images/icon_set/person.svg"
          class="w-[20px] h-[20px]"
          alt="person"
        />
      </div>
    </div>
    <MbscPopup
      :is-open="datepickerModal"
      display="bottom"
      theme-variant="light"
      theme="material"
      :buttons="[
        {
          text: 'Ok',
          handler: () => (datepickerModal = false),
          cssClass:
            '!w-full !bg-primary !text-white !text-[14px] !capitalize !rounded',
        },
      ]"
      css-class="small-popup rounded-popup"
      @close="datepickerModal = false"
    >
      <div class="">
        <div
          class="w-[40px] bg-[#F3F4F6] mb-4 h-[8px] rounded-full m-auto"
          @click="datepickerModal = false"
        ></div>
        <div class="flex mb-3 justify-between items-center">
          <p class="font-bold text-[16px]">{{ $t('815') }}</p>
          <UButton
            size="sm"
            color="white"
            variant="ghost"
            class="rounded-[1rem]"
            @click="datepickerModal = false"
          >
            <i class="fa-solid fa-xmark text-[16px]"></i>
          </UButton>
        </div>
        <hr />
        <MbscDatepicker
          v-model="selectedDate"
          :input-props="{
            class: 'w-full h-12 rounded-md px-2',
            placeholder: 'Please Select...',
          }"
          input-component="input"
          select="range"
          display="inline"
          :locale="calendarLocales[locale]"
          :min="new Date()"
          :labels="calendarLabels"
          date-format="DD.MM.YYYY"
          :theme-variant="useColorMode().value"
          :show-outer-days="false"
          :first-day="1"
          theme="ios"
          @close="datepickerModal = false"
          @cell-click="onActiveDateChange"
        >
        </MbscDatepicker>
        <UButton
          v-if="onlyOneWay"
          class="py-2 mt-4 justify-center w-full rounded-[1rem] h-[58px]"
          @click="datepickerModal = false"
          >{{ $t('704') }}</UButton
        >
      </div>
    </MbscPopup>
    <MbscPopup
      :is-open="passengerModal"
      display="bottom"
      close-on-overlay-click
      theme-variant="light"
      theme="material"
      css-class="small-popup rounded-popup"
      :buttons="[
        {
          text: 'Ok',
          handler: () => (passengerModal = false),
          cssClass:
            '!w-full !bg-primary !text-white !text-[14px] !capitalize !rounded',
        },
      ]"
      @close="passengerModal = false"
    >
      <div>
        <div
          class="w-[40px] bg-[#F3F4F6] mb-4 h-[8px] rounded-full m-auto"
          @click="passengerModal = false"
        ></div>
        <div class="flex mb-2 justify-between items-center">
          <p class="font-bold text-[16px]">{{ $t('814') }}</p>
          <UButton
            size="sm"
            color="white"
            class="rounded-[1rem]"
            variant="ghost"
            @click="passengerModal = false"
          >
            <i class="fa-solid fa-xmark text-[16px]"></i>
          </UButton>
        </div>
        <hr class="mb-4" />
        <UIPassengerCountError v-if="totalPassengers >= 9" :count="9" />
        <div class="content-dropdown flex flex-col gap-4 mt-5">
          <div class="flex items-center justify-between">
            <div>
              <h6 class="text-[12px] font-bolder text-[#333] m-0">
                {{ t('57') }}
              </h6>
              <p class="text-xs font-bolder text-[#333333a8] m-0">
                {{ t('308') }}
              </p>
            </div>
            <div>
              <UICountInput
                v-model="store.searchData.adult_qnt"
                :min="1"
                :max="9"
                :disabled="totalPassengers >= 9"
              />
            </div>
          </div>
          <div class="flex items-center justify-between mb-2">
            <div class="person-type">
              <h6 class="text-[12px] font-bolder text-[#333] m-0">
                {{ t('103') }}
              </h6>
              <p class="text-xs font-bolder text-[#333333a8] m-0">
                {{ t('221') }}
              </p>
            </div>
            <div>
              <UICountInput
                v-model="store.searchData.child_qnt"
                :min="0"
                :max="8"
                :disabled="totalPassengers >= 9"
              />
            </div>
          </div>
          <div class="flex items-center justify-between">
            <div class="person-type">
              <h6 class="text-[12px] font-bolder text-[#333] m-0">
                {{ t('167') }}
              </h6>
              <p class="text-xs font-bolder text-[#333333a8] m-0">
                {{ t('106') }}
              </p>
            </div>
            <div>
              <UICountInput
                v-model="store.searchData.infant_qnt"
                :min="0"
                :max="8"
                :disabled="totalPassengers >= 9"
              />
            </div>
          </div>
          <div class="mt-3">
            <URadioGroup
              v-model="store.searchData.class"
              class="direction *:!gap-4 *:!flex"
              :legend="$t('143')"
              :options="options"
              option-attribute="label"
            />
          </div>
        </div>
      </div>
    </MbscPopup>
    <UButton
      color="primary"
      :loading="dashboardStore.loading"
      class="w-full h-[48px] !bg-[#C0F202] text-black font-black justify-center rounded-[10px] !mt-[1rem]"
      @click="searchTickets"
    >
      {{ $t('253') }}
    </UButton>
  </div>
</template>

<script setup lang="ts">
import '@mobiscroll/datepicker-vue/dist/css/mobiscroll.min.css'

import { MbscDatepicker, MbscPopup } from '@mobiscroll/datepicker-vue'
import { calendarLocales } from 'assets/data'
import dayjs from 'dayjs'
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

const $emit = defineEmits<{
  (e: 'on-search'): void
}>()
const { t, locale } = useI18n()
const dashboardStore = useDashboardStore()
const store = useAviaStore()
const mainStore = useMainStore()

const datepickerModal = ref(false)
const passengerModal = ref(false)
const charters = computed(() => mainStore.charterList)
const route = useRoute()
const router = useRouter()
const onlyOneWay = ref(false)
const selectedDate = ref([])
const calendarDates = computed(() => dashboardStore.calendarDates)
const calendarLabels = computed(() => {
  const on_prices = calendarDates.value?.on_price?.map((el) => {
    return {
      date: el.date,
      text: el.price + '$',
      textColor: '#03b115',
      color: '#fff',
      style: 'center',
    }
  })
  return on_prices ? on_prices : []
})
const calendarRtLabels = computed(() => {
  const rt_prices = calendarDates.value?.rt_price?.map((el) => {
    return {
      date: el.date,
      text: el.price + '$',
      textColor: '#03b115',
      color: '#fff',
      style: 'center',
    }
  })
  return rt_prices ? rt_prices : []
})
const form = reactive({
  departure: '',
  arrival: '',
  start_date: '',
  end_date: '',
})
const options = [
  {
    value: 'E',
    label: t('368'),
  },
  {
    value: 'B',
    label: t('37'),
  },
]
const totalPassengers = computed(
  () =>
    store.searchData.adult_qnt +
    store.searchData.child_qnt +
    store.searchData.infant_qnt,
)
const arrivalList = computed(
  () =>
    charters.value?.find(
      (el) => store.searchData.directions[0].departure_code === el.value,
    )?.charters,
)

const searchQuery = computed(() => {
  return {
    dep_code: store.searchData.directions[0].departure_code,
    arr_code: store.searchData.directions[0].arrival_code,
    dep_date: store.searchData.directions[0].date,
    back_date:
      store.searchData.directions.length > 1
        ? store.searchData.directions[1].date
        : '',
    adult: store.searchData.adult_qnt,
    child: store.searchData.child_qnt,
    inf: store.searchData.infant_qnt,
    class: store.searchData.class,
  }
})
const searchTickets = async () => {
  store.searchData.directions[0].date = dayjs(form.start_date).format(
    'YYYY-MM-DD',
  )
  if (store.searchData.directions?.length > 1) {
    store.searchData.directions.pop()
  }
  if (onlyOneWay.value) {
    form.end_date = ''
  }
  if (form.end_date && !onlyOneWay.value) {
    const data = {
      date: dayjs(form.end_date).format('YYYY-MM-DD'),
      dep_type: store.searchData.directions[0].arr_type,
      arr_type: store.searchData.directions[0].dep_type,
      departure_code: store.searchData.directions[0].arrival_code,
      arrival_code: store.searchData.directions[0].departure_code,
    }
    store.searchData.directions.push(data)
  }
  if (
    store.searchData.directions[0].departure_code &&
    store.searchData.directions[0].arrival_code &&
    store.searchData.directions[0].date
  ) {
    dashboardStore.loading = true
    await router.replace({ query: searchQuery.value })
    store.routeChange = false
    $emit('on-search')
  }
}
const handleSelect = (item) => {
  store.searchData.directions[0].departure_code = item?.value
  getCalendarDates()
}
const handleSelectSecond = (code) => {
  store.searchData.directions[0].arrival_code = code?.value

  getCalendarDates()
}

const changeDirections = () => {
  const departure_code = store.searchData.directions[0].departure_code
  const query = form.departure
  store.searchData.directions[0].departure_code =
    store.searchData.directions[0].arrival_code
  store.searchData.directions[0].arrival_code = departure_code
  form.departure = form.arrival
  form.arrival = query
  getCalendarDates()
}

function getCalendarDates() {
  if (
    store.searchData.directions[0].arrival_code &&
    store.searchData.directions[0].departure_code
  ) {
    dashboardStore.getTourCalendarData(
      store.searchData.directions[0].departure_code,
      store.searchData.directions[0].arrival_code,
      1,
    )
  }
}
const disableDate = function (date) {
  return date < new Date(Date.now() - 86400000)
}
const disableDateArrival = function (date) {
  return date < new Date(form.start_date).getTime()
}
const onActiveDateChange = (e) => {
  if (e.active === 'start') {
    onlyOneWay.value = true
    form.start_date = dayjs(e.date).format('YYYY-MM-DD')
  } else if (e.active === 'end' && store.searchData.directions[0].date) {
    onlyOneWay.value = false
    form.end_date = dayjs(e.date).format('YYYY-MM-DD')
  }
}
const initiator = async () => {
  store.searchData.class = route.query.class ?? 'E'
  store.searchData.directions[0].dep_type = 'city'
  store.searchData.directions[0].arr_type = 'city'
  store.searchData.directions[0].arrival_code = route.query?.arr_code ?? ''
  store.searchData.directions[0].departure_code = route.query?.dep_code ?? ''
  store.searchData.directions[0].date = route.query?.dep_date ?? ''
  form.start_date = route.query?.dep_date ?? ''
  form.end_date = route.query?.back_date
  store.searchData.adult_qnt = route.query?.adult
    ? Number(route.query.adult)
    : 1
  store.searchData.child_qnt = route.query?.child
    ? Number(route.query.child)
    : 0
  store.searchData.infant_qnt = route.query?.inf ? Number(route.query.inf) : 0
  if (route.query?.dep_code) {
    form.departure = charters.value?.find(
      (el) => el.value === route.query?.dep_code,
    )
  }
  if (route.query?.arr_code) {
    form.arrival = arrivalList.value?.find(
      (el) => el.value === route.query?.arr_code,
    )
  }
  getCalendarDates()
  await searchTickets()
}
watch(
  () => route.query?.default_ticket,
  () => {
    if (route.query?.default_ticket === '1') {
      store.allTicketsResponse = null
      store.tickets = []
      dashboardStore.loading = true
      debounce(
        'initiator',
        () => {
          initiator()
        },
        500,
      )
    }
  },
)
onUnmounted(() => {
  if (store.allTicketsResponse) {
    store.$reset()
  }
  store.searchData.directions = [
    {
      dep_type: '',
      arr_type: '',
      departure_code: '',
      arrival_code: '',
      date: '',
    },
  ]
  dashboardStore.$reset()
  store.routeChange = true
})
initiator()
</script>

<style lang="scss" scoped>
@media only screen and (max-width: 576px) {
  .search-inputs {
    flex-direction: column;
    .input-item {
      width: 100%;
      display: block !important;
      .input-wrap {
        width: 100% !important;
      }
      .input-wrap {
        margin-bottom: 14px;
        > div {
          width: 100%;
        }
      }
      .change-btn {
        top: 44%;
        img {
          width: 35px;
          height: 35px;
        }
      }
    }
    .input-item:last-child {
      margin-top: 30px;
      > div {
        margin-bottom: 12px;
      }
    }
  }
}
</style>
<style>
.pointer-events-none {
  display: none !important;
}
</style>
