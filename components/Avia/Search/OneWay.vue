<template>
  <div class="flex flex-col gap-0.5 relative">
    <AviaSearchInput
      :placeholder="t('400')"
      :selected-item="innerForm.departure"
      :default-options="charterList"
      :histories="avia_departure"
      main-class="rounded-t-[10px]"
      @on-select="handleSelect"
    >
      <template #icon>
        <img
          src="/images/icon_set/plane_up.svg"
          class="w-[20px] h-[20px]"
          alt="plane_up"
        />
      </template>
    </AviaSearchInput>
    <AviaSearchInput
      :placeholder="t('430')"
      :selected-item="innerForm.arrival"
      :default-options="arrivalList"
      :histories="avia_arrival"
      @on-select="handleSelectSecond"
    >
      <template #icon>
        <img src="/images/icon_set/plane_down.svg" alt="plane_down" />
      </template>
    </AviaSearchInput>
    <div
      class="change-btn absolute right-2 top-[36px] cursor-pointer"
      @click="changeDirections"
    >
      <img src="/images/icons/change_reverse.svg" alt="" />
    </div>
    <div
      class="flex justify-between items-center py-2.5 px-4 bg-white h-[48px] text-sm w-full border"
      @click="datepickerModal = true"
    >
      <div
        v-if="searchData.directions[0].date"
        class="flex items-center justify-between gap-8"
      >
        <div v-if="searchData.directions[0].date" class="flex flex-col">
          <span class="text-[10px] text-gray-400"> {{ $t('75') }} </span>
          <span class="text-xs">
            {{ dayjs(searchData.directions[0].date).format('DD MMM') }}
          </span>
        </div>
        <div v-if="searchData.directions?.[1]?.date" class="flex flex-col">
          <span class="text-[10px] text-gray-400"> {{ $t('204') }} </span>
          <span class="text-xs">
            {{ dayjs(searchData.directions?.[1]?.date).format('DD MMM') }}
          </span>
        </div>
      </div>
      <span v-else class="text-gray-400">{{ $t('90') }}</span>
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
          <span class="mr-1 text-black">{{
            searchData.adult_qnt + searchData.child_qnt + searchData.infant_qnt
          }}</span>
          <span>{{ t('240') }}, </span>

          <span class="text-gray-400 ml-1">
            {{ options.find((el) => searchData.class === el.value).label }}
          </span>
        </div>
      </div>
      <img
        src="/images/icon_set/person.svg"
        class="w-[20px] h-[20px]"
        alt="person"
      />
    </div>
    <UButton
      color="primary"
      :loading="loading"
      class="w-full h-[48px] !bg-[#C0F202] text-black font-black justify-center rounded-[10px] !mt-[1rem]"
      @click="onSearchTickets"
    >
      {{ $t('253') }}
    </UButton>
    <MbscPopup
      :is-open="datepickerModal"
      display="bottom"
      close-on-overlay-click
      theme="material"
      full-screen
      theme-variant="light"
      :scroll-lock="false"
      :touch-ui="true"
      :buttons="[
        {
          text: isOneWay ? $t('704') : 'Ok',
          handler: () => (datepickerModal = false),
          cssClass:
            '!w-full !bg-primary !text-white !text-[14px] !capitalize !rounded-[1rem] !h-[48px] !mb-4',
        },
      ]"
      @open="onDatePickerOpen"
      @close="datepickerModal = false"
    >
      <div>
        <div
          class="w-[40px] bg-[#F3F4F6] my-5 h-[8px] rounded-full m-auto"
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
          :is-open="datepickerModal"
          close-on-overlay-click
          :input-props="{
            class: 'w-full h-[47px] border rounded-md px-2',
            placeholder: t('340'),
            readOnly: true,
          }"
          input-component="input"
          select="range"
          display="inline"
          calendar-scroll="vertical"
          calendar-type="month"
          :calendar-size="2"
          :ref-date="new Date()"
          return-format="iso8601"
          :min="new Date()"
          date-format="DD.MM.YYYY"
          :theme-variant="mode.value"
          :first-day="1"
          :locale="calendarLocales[locale]"
          theme="ios"
          @close="datepickerModal = false"
          @init="getCalendarDates"
          @cell-click="onCellClick"
        >
          <template #dayContent="date">
            <div class="flex flex-col">
              <span
                v-if="regularPrices?.[dayjs(date.date).format('YYYY-MM-DD')]"
                class="text-green-500 !text-[10px] !leading-3"
              >
                {{
                  regularPrices?.[
                    dayjs(date.date).format('YYYY-MM-DD')
                  ]?.price?.toFixed(0)
                }}$
              </span>
            </div>
          </template>
        </MbscDatepicker>
      </div>
    </MbscPopup>
    <MbscPopup
      :is-open="passengerModal"
      theme-variant="light"
      display="bottom"
      theme="material"
      :buttons="[
        {
          text: 'Ok',
          handler: () => (passengerModal = false),
          cssClass:
            '!w-full !bg-primary !text-white !text-[14px] !capitalize !rounded',
        },
      ]"
      css-class="small-popup rounded-popup"
      @close="passengerModal = false"
    >
      <div>
        <UIPassengerCountError v-if="totalPassengers >= 9" :count="9" />
        <div
          class="w-[40px] bg-[#F3F4F6] h-[8px] mb-4 rounded-full m-auto"
          @click="passengerModal = false"
        ></div>
        <div class="flex mb-3 justify-between items-center">
          <p class="font-bold text-[16px]">{{ $t('814') }}</p>
          <UButton
            size="sm"
            color="white"
            variant="ghost"
            class="rounded-[1rem]"
            @click="passengerModal = false"
          >
            <i class="fa-solid fa-xmark text-[16px]"></i>
          </UButton>
        </div>
        <hr />

        <div class="content-dropdown flex flex-col gap-[22px] mt-5">
          <div class="flex items-center justify-between">
            <div>
              <h6 class="text-[13px] font-bolder text-[#333] m-0">
                {{ t('57') }}
              </h6>
              <p class="text-xs font-bolder text-[#333333a8] m-0">
                {{ t('308') }}
              </p>
            </div>
            <div>
              <UICountInput
                v-model="searchData.adult_qnt"
                :min="1"
                :max="9"
                :disabled="totalPassengers >= 9"
              />
            </div>
          </div>
          <div class="flex items-center justify-between">
            <div class="person-type">
              <h6 class="text-[13px] font-bolder text-[#333] m-0">
                {{ t('103') }}
              </h6>
              <p class="text-xs font-bolder text-[#333333a8] m-0">
                {{ t('221') }}
              </p>
            </div>
            <div>
              <UICountInput
                v-model="searchData.child_qnt"
                :min="0"
                :max="8"
                :disabled="totalPassengers >= 9"
              />
            </div>
          </div>
          <div class="flex items-center justify-between">
            <div class="person-type">
              <h6 class="text-[13px] font-bolder text-[#333] m-0">
                {{ t('167') }}
              </h6>
              <p class="text-xs font-bolder text-[#333333a8] m-0">
                {{ t('106') }}
              </p>
            </div>
            <div>
              <UICountInput
                v-model="searchData.infant_qnt"
                :min="0"
                :max="8"
                :disabled="totalPassengers >= 9"
              />
            </div>
          </div>
          <div>
            <URadioGroup
              v-model="searchData.class"
              class="direction *:flex *:gap-3"
              :legend="$t('143')"
              :options="options"
              option-attribute="label"
            />
          </div>
        </div>
      </div>
    </MbscPopup>
  </div>
</template>

<script setup lang="ts">
import '@mobiscroll/datepicker-vue/dist/css/mobiscroll.min.css'

import { MbscDatepicker, MbscPopup } from '@mobiscroll/datepicker-vue'
import { calendarLocales } from 'assets/data'
import dayjs from 'dayjs'
import { computed } from 'vue'

import type { IAirportSearch } from '~/types'
import type { ISearch } from '~/types/avia'

interface Props {
  main?: boolean
  form: ISearch
  loading: boolean
}
const props = defineProps<Props>()
const $emit = defineEmits<{
  (e: 'on-search'): void
}>()
const { t, locale } = useI18n()
const mode = useColorMode()
const datepickerModal = ref(false)
const passengerModal = ref(false)
const dashboardStore = useDashboardStore()
const mainStore = useMainStore()
const store = useAviaStore()
const router = useRouter()
const avia_departure = useCookie('avia_departure')
const avia_arrival = useCookie('avia_arrival')
const airports = computed(() => dashboardStore.airports)
const charterList = computed(() => mainStore.charterList)
const arrivalList = computed(
  () =>
    charterList.value?.find(
      (el) => searchData.directions[0].departure_code === el.value,
    )?.charters,
)
const searchData = unref(props.form)

const totalPassengers = computed(
  () => searchData.adult_qnt + searchData.child_qnt + searchData.infant_qnt,
)

const selectedDate = ref([])
const innerForm = reactive({
  departure: '',
  arrival: '',
})
const isOneWay = ref(false)
const regularPrices = ref(null)

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

const changeDirections = () => {
  const departure_code = searchData.directions[0].departure_code
  const query = innerForm.departure
  searchData.directions[0].departure_code =
    searchData.directions[0].arrival_code
  searchData.directions[0].arrival_code = departure_code
  innerForm.departure = innerForm.arrival
  innerForm.arrival = query
  getCalendarDates()
}
const onDatePickerOpen = () => {
  searchData.directions[0].date = ''
  if (searchData.directions.length > 1) {
    searchData.directions.pop()
  }
}
const onDatePickerFocus = (e) => {
  console.log('onDatePickerFocus: ', e)
}
const handleSelect = (item: IAirportSearch) => {
  searchData.directions[0].departure_code = item?.code
  searchData.directions[0].dep_type = item?.type
  if (item.type !== 'city') {
    innerForm.departure = item?.name
  } else {
    innerForm.departure = item?.name
  }
  getCalendarDates()
  const recent = avia_departure.value || []
  const index = recent?.findIndex((el) => el.code === item.code)
  if (index !== -1) return
  if (recent?.length > 5) recent.shift()
  recent.push(item)
  avia_departure.value = JSON.stringify(recent)
}

const handleSelectSecond = (item: IAirportSearch) => {
  searchData.directions[0].arrival_code = item?.code
  searchData.directions[0].arr_type = item?.type
  if (item.type !== 'city') {
    innerForm.arrival = item?.name
  } else {
    innerForm.arrival = item?.name
  }
  getCalendarDates()
  const recent = avia_arrival.value || []
  const index = recent?.findIndex((el) => el.code === item.code)
  if (index !== -1) return
  if (recent?.length > 5) recent.shift()
  recent.push(item)

  avia_arrival.value = JSON.stringify(recent)
}
async function getCalendarDates() {
  if (
    searchData.directions[0].arrival_code &&
    searchData.directions[0].departure_code
  ) {
    try {
      regularPrices.value = await useApi().$get(
        `/v1/tickets/calendar?route=${searchData.directions[0].departure_code}${searchData.directions[0].arrival_code}`,
      )
    } catch (err) {
      console.log(err)
    }
  }
}
function generateRouteParams(
  directions: Array<{
    dep_type: string
    arr_type: string
    departure_code: string
    arrival_code: string
    date: string
  }>,
  flightClass: string,
  adult_qnt: number,
  child_qnt: number,
  infant_qnt: number, // 'class' is a reserved keyword in JS/TS, so using 'flightClass'
): string {
  const directionsParam = directions
    .map((direction) => {
      const { departure_code, date, arrival_code } = direction

      // Format date (assuming date is in the format YYYY-MM-DD)
      const formattedDate = date.replace(/-/g, '_') // Replacing hyphen with underscore

      // Concatenate to form the individual route parameter
      return `${departure_code}${formattedDate}${arrival_code}`
    })
    .join('-') // Join multiple items with a separator, e.g., '-'

  // Append the additional parameters at the end
  return `${directionsParam}_${flightClass}${adult_qnt}${child_qnt}${infant_qnt}`
}

const onSearchTickets = async () => {
  datepickerModal.value = false
  if (
    searchData.directions[0].departure_code &&
    searchData.directions[0].arrival_code &&
    searchData.directions[0].date
  ) {
    searchData.directions[0].date = dayjs(searchData.directions[0].date).format(
      'YYYY-MM-DD',
    )
    dashboardStore.loading = true
    await router.push(
      `/${locale.value}/avia/search/${generateRouteParams(searchData.directions, searchData.class, searchData.adult_qnt, searchData.child_qnt, searchData.infant_qnt)}`,
    )
    store.routeChange = false
    $emit('on-search')
  }
}
const onCellClick = (e) => {
  if (e.active === 'start') {
    isOneWay.value = true
    searchData.directions[0].date = dayjs(e.date).format('YYYY-MM-DD')
  } else if (e.active === 'end' && searchData.directions[0].date) {
    isOneWay.value = false
    if (searchData.directions.length > 1) {
      searchData.directions.pop()
    }
    searchData.directions.push({
      date: dayjs(e.date).format('YYYY-MM-DD'),
      departure_code: searchData.directions[0].arrival_code,
      arrival_code: searchData.directions[0].departure_code,
      arr_type: searchData.directions[0].dep_type,
      dep_type: searchData.directions[0].arr_type,
    })
  }
}

const fetchDirections = async () => {
  try {
    if (searchData.directions[0].departure_code) {
      await dashboardStore.getAirports(searchData.directions[0].departure_code)
      const airport = airports.value.find(
        (el) => el.code === searchData.directions[0].departure_code,
      )
      if (airport) {
        searchData.directions[0].dep_type = airport?.type
        if (airport.type !== 'city') {
          innerForm.departure = `${airport?.name}, ${airport?.city_name}`
        } else {
          innerForm.departure = `${airport?.name}, ${airport?.country_name}`
        }
      }
    }
    if (searchData.directions[0].arrival_code) {
      await dashboardStore.getAirports(searchData.directions[0].arrival_code)
      const airport = airports.value.find(
        (el) => el.code === searchData.directions[0].arrival_code,
      )
      if (airport) {
        searchData.directions[0].arr_type = airport?.type
        if (airport.type !== 'city') {
          innerForm.arrival = `${airport?.name}, ${airport?.city_name}`
        } else {
          innerForm.arrival = `${airport?.name}, ${airport?.country_name}`
        }
      }
    }
  } catch (error) {
    console.log(error)
  }
}
onMounted(() => {
  fetchDirections()
  if (!charterList.value?.length) {
    mainStore.getCharterList()
  }
})
</script>
