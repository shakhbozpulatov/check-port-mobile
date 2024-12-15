<template>
  <div class="flex flex-col gap-0.5 w-full">
    <LazyTourAutoCompleteInput
      :placeholder="t('400')"
      :default-options="parentDefaultCities(t)"
      :selected-item="form.fromQuery"
      main-class="!rounded-t-[10px]"
      @on-select="handleSelect"
    >
      <template #icon>
        <img
          src="/images/icon_set/plane_up.svg"
          class="w-[20px] h-[20px]"
          alt="plane_up"
        />
      </template>
    </LazyTourAutoCompleteInput>
    <LazyTourAutoCompleteHotel
      :placeholder="t('430')"
      :default-options="defaultDirections"
      :selected-item="form.toQuery"
      @on-select="handleSelectDirection"
    >
      <template #icon>
        <img src="/images/icon_set/plane_down.svg" alt="plane_down" />
      </template>
    </LazyTourAutoCompleteHotel>
    <Transition name="fade" mode="out-in">
      <div
        v-if="transfers?.length || routes?.length"
        class="flex flex-col gap-0.5"
      >
        <USelectMenu
          v-if="routes?.length"
          v-model="searchData.round_trip"
          :placeholder="$t('337')"
          class="w-full *:*:!text-[14px]"
          value-attribute="code"
          option-attribute="name"
          :options="routes"
          :disabled="dashboardStore.loading"
          size="xl"
          :ui="{
            base: 'disabled:bg-greyscale-200 disabled:!text-[#9CA3AF] transfer-select',
            rounded: 'rounded-none',
            ring: 'ring-0',
          }"
        />
        <USelectMenu
          v-if="transfers?.length"
          v-model="searchData.transfer"
          :placeholder="$t('337')"
          class="w-full *:*:!text-[14px]"
          value-attribute="code"
          option-attribute="label"
          :options="transfers"
          :disabled="dashboardStore.loading"
          size="xl"
          :ui="{
            base: 'disabled:bg-greyscale-200 disabled:!text-[#9CA3AF] transfer-select',
            rounded: 'rounded-none',
            ring: 'ring-0',
          }"
        />
      </div>
    </Transition>
    <div class="flex flex-col gap-0.5">
      <div
        class="flex justify-between items-center py-2.5 px-4 bg-white h-[48px] text-sm w-full border"
        @click="datepickerModal = true"
      >
        <div v-if="form.dates[0]" class="flex items-center gap-10 w-full">
          <div v-if="form.dates[0]" class="flex flex-col">
            <span class="text-[10px] text-gray-400"> {{ $t('75') }} </span>
            <span class="text-xs">
              {{ dayjs(form.dates[0]).format('DD MMM') }}
            </span>
          </div>
          <div v-if="form.dates[1]" class="flex flex-col">
            <span class="text-[10px] text-gray-400"> {{ $t('204') }} </span>
            <span class="text-xs">
              {{ dayjs(form.dates[1]).format('DD MMM') }}
            </span>
          </div>
        </div>
        <span v-else class="text-gray-400 h-[30px] flex items-center">
          {{ $t('90') }}
        </span>
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
            {{ searchData.adult + searchData.child_age.length }}
            {{ t('422') }},
            <span class="text-gray-400">
              {{
                classOptions(t).find((el) => searchData.class === el.value)
                  .label
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
    <UButton
      color="primary"
      :loading="dashboardStore.loading"
      class="w-full h-[48px] !bg-[#C0F202] text-black font-black justify-center rounded-[10px] !mt-[1rem]"
      @click="getTourOffers"
    >
      {{ $t('253') }}
    </UButton>
    <MbscPopup
      :is-open="datepickerModal"
      display="bottom"
      close-on-overlay-click
      css-class="small-popup rounded-popup"
      :buttons="[
        {
          text: 'Ok',
          handler: () => (datepickerModal = false),
          cssClass:
            '!w-full !bg-primary !text-white !text-[14px] !capitalize !rounded',
        },
      ]"
      theme-variant="light"
      theme="material"
      @close="datepickerModal = false"
    >
      <div
        class="w-[40px] bg-[#F3F4F6] mb-4 h-[8px] rounded-full m-auto"
        @click="datepickerModal = false"
      ></div>
      <div class="flex mb-3 justify-between items-center">
        <p class="font-bold text-[16px]">{{ $t('815') }}</p>
        <UButton
          size="sm"
          color="white"
          class="rounded-[1rem]"
          variant="ghost"
          @click="datepickerModal = false"
        >
          <i class="fa-solid fa-xmark text-[16px]"></i>
        </UButton>
      </div>
      <hr />
      <MbscDatepicker
        v-model="form.dates"
        :input-props="{
          class: 'w-full h-12 rounded-md px-2',
          placeholder: 'Please Select...',
        }"
        input-component="input"
        select="range"
        display="inline"
        :colors="[...coloredDays, ...coloredRtDays]"
        :labels="calendarLabels"
        :show-outer-days="false"
        :controls="['calendar']"
        date-format="DD.MM.YYYY"
        :locale="calendarLocales[locale]"
        circular
        calendar-type="month"
        return-format="iso8601"
        :min="new Date()"
        width="400px"
        :theme-variant="useColorMode().value"
        :first-day="1"
        theme="ios"
        @change="onCalendarChange"
      >
        <template #dayContent="date">
          <div
            v-if="
              calendarData?.icon && (isCharter(date) || isCharterReturn(date))
            "
            class="w-full flex justify-center"
          >
            <img
              :src="calendarData?.icon"
              alt=""
              class="w-4 rounded-full top-[14px]"
              :class="isCharter(date) && isCharterReturn(date) ? 'mt-1' : ''"
            />
          </div>
        </template>
      </MbscDatepicker>
    </MbscPopup>
    <MbscPopup
      :is-open="passengerModal"
      display="bottom"
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
      <UIPassengerCount
        :form="searchData"
        :disabled="dashboardStore.loading"
        :min-count="1"
        is-class
      />
    </MbscPopup>
  </div>
</template>

<script setup lang="ts">
import '@mobiscroll/datepicker-vue/dist/css/mobiscroll.min.css'

import { MbscDatepicker, MbscPopup } from '@mobiscroll/datepicker-vue'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import dayjs from 'dayjs'
import type { Ref } from 'vue'
import { useI18n } from 'vue-i18n'

import {
  calendarLocales,
  classOptions,
  parentDefaultCities,
  tourDefaultCities,
  tourDefaultDirections,
} from '@/assets/data'
import { useApi } from '@/composables/useApi'
import type { IDirection } from '@/types/tour'
import type { IAirportSearch } from '~/types'

interface Props {
  noRequest?: boolean
}
const props = defineProps<Props>()
const route = useRoute()
const router = useRouter()

const { t, locale } = useI18n()
const store = useTourStore()
const { myToast } = useCustomToast()
const dashboardStore = useDashboardStore()
const datepickerModal = ref(false)
const passengerModal = ref(false)

const emits = defineEmits<{
  (e: 'on-reset-page'): void
}>()

const form = reactive({
  fromQuery: (route.query?.dep_name as string) ?? '',
  toQuery: (route.query?.arr_name as string) ?? '',
  hotelQuery: '',
  dates: [] as string[],
})
const searchData = reactive({
  product_id: 8,
  adult: route.query.adult ? Number(route.query.adult) : 2,
  child_age: route.query.child_age ? route.query.child_age?.split(',') : [],
  currency: useCookie('currency').value ?? 'USD',
  class: route.query.class ?? 'E',
  lang: locale.value,
  transfer: (route.query.transfer as string) ?? 'gr',
  round_trip: route.query.round_trip ? Number(route.query.round_trip) : 1,
  referal_loc_type: (route.query.loc_type as string) ?? null,
  sub_loc_id: (route.query.sub_loc_id as string) ?? null,
  departure: {
    airport_code: (route.query.dep as string) ?? '',
    date: (route.query.dep_date as string) ?? '',
  },
  arrival: {
    location_id: (route.query.location_id as string) ?? null,
    type: (route.query.loc_type as string) ?? '',
    date: (route.query.arr_date as string) ?? '',
  },
  instant_booking: route.query.instant_booking ?? '0',
})
const selectedDirection: Ref<IDirection | null> = ref(null)
const rules = {
  departure: {
    date: { required },
    airport_code: { required },
  },
  arrival: {
    location_id: { required },
    date: { required },
    type: { required },
  },
}
const transferLabels = {
  gr: t('86'),
  in: t('136'),
  no: t('504'),
}
const v$ = useVuelidate(rules, searchData)
// Computed values
const calendarData = computed(() => dashboardStore.calendarDates)
const calendarLabels = computed(() => {
  const on_prices = calendarData.value?.on_price?.map((el) => {
    return {
      date: el.date,
      text: selectedDirection.value?.id == '325475' ? t('340') : t('charters'),
      textColor: '#03b115',
      color: '#fff',
      style: 'center',
    }
  })
  const rt_prices = calendarData.value?.rt_price?.map((el) => {
    return {
      date: el.date,
      text: selectedDirection.value?.id == '325475' ? t('204') : t('charters'),
      textColor: '#03b115',
      color: '#fff',
      style: 'center',
    }
  })
  if (selectedDirection.value?.id == '325475' && on_prices && rt_prices) {
    return [...on_prices, ...rt_prices]
  } else {
    return on_prices ? on_prices : []
  }
})
const coloredDays = computed(() => {
  const res = calendarData.value?.on_price?.map((el) => {
    return {
      date: el.date,
      background: '#b2f1c080',
    }
  })
  return res ? res : []
})
const coloredRtDays = computed(() => {
  const res = calendarData.value?.rt_price?.map((el) => {
    return {
      date: el.date,
      background: 'rgba(246,225,11,0.93)',
    }
  })
  return res ? res : []
})
const onCalendarChange = (e) => {
  console.log(e)
}
const transfers = computed(() =>
  dashboardStore.rules?.transfer?.map((el) => {
    return {
      label: transferLabels[el?.code] || el?.name,
      code: el?.code,
    }
  }),
)
const routes = computed(() => dashboardStore.rules?.round_trip)
const defaultDirections = computed(
  () =>
    tourDefaultCities(t).find(
      (item) => item?.code === searchData.departure.airport_code,
    )?.directions || tourDefaultDirections(t),
)

//
// const nightsCount = computed(() => {
//   const start = dep_date.value || new Date(form.dates?.[0]) | 0
//   if (!start) return 0
//   const end = arr_date.value || new Date(form.dates?.[1]) | 0
//   const timeDiff = end - start
//   return Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
// })
const queryFilter = computed(() => {
  return {
    category: route.query?.category?.split(',') ?? undefined,
    type: route.query?.type?.split(',') ?? undefined,
    hotel_themes: route.query?.hotel_themes?.split(',') ?? undefined,
    night_min: route.query?.night_min ?? undefined,
    night_max: route.query?.night_max ?? undefined,
    price_range_min: route.query?.price_range_min ?? undefined,
    price_range_max: route.query?.price_range_max ?? undefined,
    exoptions: route.query?.exoptions?.split(',') ?? undefined,
    exregions:
      route.query?.exregions?.split(',').map((el) => el.replace(/_/, ', ')) ??
      undefined,
    sort: 'price_asc',
    page: 1,
    hotelNames: route.query?.hotelNames
      ? route.query?.hotelNames?.split(',')
      : undefined,
    search_mode: route.params?.search_mode,
    dmc_list: route.query?.dmc_list?.split(',') ?? [],
    instant_booking: route.query?.instant_booking ?? '0',
  }
})
// Methods
const handleSelect = async (item: IAirportSearch) => {
  console.log(item)
  form.fromQuery = item?.name
  searchData.departure.airport_code = item.code
  if (searchData.departure.airport_code && selectedDirection.value?.id) {
    await dashboardStore.getTourCalendarData(
      item.code,
      selectedDirection.value?.id,
      undefined,
    )
  }
}
const getLocId = (db: string, id: string) => {
  return new Promise((resolve, reject) => {
    useApi()
      .$get('https://b2c.asialuxe.app/api/search-new/', {
        params: {
          db:
            db === 'HOTEL'
              ? 'catalog'
              : db === 'AIRPORT'
                ? 'airport'
                : 'region',
          ids: id,
        },
      })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
const handleSelectDirection = async (item: IDirection) => {
  form.toQuery = item.name
  selectedDirection.value = item
  searchData.arrival.location_id = item.id
  searchData.arrival.type = item.type
  if (item?.eps_search) {
    searchData.arrival.location_id = await getLocId(item.type, item.id)
    selectedDirection.value.id = searchData.arrival.location_id
  }
  if (searchData.departure.airport_code && selectedDirection.value?.id) {
    await dashboardStore.getTourCalendarData(
      searchData.departure.airport_code,
      selectedDirection.value?.id,
      undefined,
    )
  }
}

const isCharter = (date) => {
  return calendarData.value?.on?.includes(dayjs(date.date).format('YYYY-MM-DD'))
}
const isCharterReturn = (date) => {
  return calendarData.value?.rt?.includes(dayjs(date.date).format('YYYY-MM-DD'))
}

const getTourOffers = async () => {
  searchData.departure.date = dayjs(form.dates[0]).format('YYYY-MM-DD')
  searchData.arrival.date = dayjs(form.dates[1]).format('YYYY-MM-DD')
  searchData.arrival.location_id = String(searchData.arrival.location_id)
  if (selectedDirection.value?.type) {
    searchData.arrival.type = selectedDirection.value?.type
    searchData.referal_loc_type = selectedDirection.value?.type
  }
  v$.value.$touch()
  if (v$.value.$invalid || searchData.arrival.date === 'Invalid Date') {
    myToast('warning', t('263'))
    // toast.warning(t('263'))
    return
  }
  try {
    dashboardStore.loading = true
    emits('on-reset-page')
    dashboardStore.loading = true
    await router.push({
      path: `/${locale.value}/tours`,
      query: {
        dep: searchData.departure.airport_code,
        dep_name: form.fromQuery,
        arr_name: form.toQuery,
        location_id: searchData.arrival.location_id,
        loc_type: searchData.arrival.type,
        dep_date: searchData.departure.date,
        arr_date: searchData.arrival.date,
        adult: searchData.adult,
        child_age: searchData.child_age.length
          ? searchData.child_age?.join(',')
          : undefined,
        round_trip: searchData.round_trip,
        transfer: searchData.transfer,
        class: searchData.class,
        exregions: undefined,
        exoptions: undefined,
        instant_booking: searchData.instant_booking,
      },
    })
    if (store.allTourOffers) store.allTourOffers.status = 'InProgress'
    if (!props.noRequest) {
      await store.searchTour(searchData)
      await store.fetchTourOffers(queryFilter.value)
    }
    dashboardStore.loading = false
  } catch (err) {
    console.log(err)
  } finally {
    dashboardStore.loading = false
  }
}
const initiator = async () => {
  const dep_date = new Date(route.query?.dep_date as string)
  const today = new Date()
  if (route.query?.dep_date && route.query?.arr_date) {
    form.dates = [
      route.query?.dep_date as string,
      route.query?.arr_date as string,
    ]
  } else {
    if (!Object.keys(route.query)?.length) return
    const dep = new Date(today)
    dep.setDate(today.getDate() + 1)
    const arr = new Date(dep)
    arr.setDate(dep.getDate() + 7)
    form.dates = [
      dayjs(dep).format('YYYY-MM-DD'),
      dayjs(arr).format('YYYY-MM-DD'),
    ]
    searchData.departure.date = dayjs(dep).format('YYYY-MM-DD')
    searchData.arrival.date = dayjs(arr).format('YYYY-MM-DD')
  }
  if (route.query?.location_id && route.query?.loc_type) {
    selectedDirection.value = {
      id: Number(route.query?.location_id),
      type: route.query?.loc_type,
    }
  }
  if (route.query.dep && route.query.location_id) {
    await dashboardStore.getTourCalendarData(
      route.query.dep as string,
      route.query.location_id as string,
      undefined,
    )
    if (route.query?.dep_date && route.query?.arr_date && today > dep_date) {
      if (calendarData.value?.on?.length) {
        form.dates = [
          calendarData.value?.on[0] as string,
          calendarData.value?.on[1] as string,
        ]
        searchData.departure.date = calendarData.value?.on[0]
        searchData.arrival.date = calendarData.value?.on[1]
      } else {
        const dep = new Date(today)
        dep.setDate(today.getDate() + 1)
        const arr = new Date(dep)
        arr.setDate(dep.getDate() + 7)
        form.dates = [
          dayjs(dep).format('YYYY-MM-DD'),
          dayjs(arr).format('YYYY-MM-DD'),
        ]
        searchData.departure.date = dayjs(dep).format('YYYY-MM-DD')
        searchData.arrival.date = dayjs(arr).format('YYYY-MM-DD')
      }
    }
  }
  v$.value.$touch()
  if (!v$.value.$invalid) {
    dashboardStore.loading = true
    if (route.query?.dep === 'TAS') form.fromQuery = 'Ташкент'
    if (store.allTourOffers) store.allTourOffers.status = 'InProgress'
    await store.searchTour(searchData, route.params.search_mode as string)
    await store.fetchTourOffers(queryFilter.value)
  }
}
initiator()

watch(
  () => store.selectedDefaults.location_id,
  async () => {
    if (!store.selectedDefaults.location_id) return

    searchData.arrival.type = 'airport'
    searchData.arrival.location_id = store.selectedDefaults.location_id
    searchData.departure.airport_code = 'TAS'
    form.fromQuery = 'Ташкент'
    selectedDirection.value = {
      id: Number(store.selectedDefaults.location_id),
      type: 'airport',
      name: store.selectedTourDefault?.name,
    }
    form.toQuery = store.selectedTourDefault?.name || ''
    if (store.selectedDefaults.location_id) {
      await dashboardStore.getTourCalendarData(
        'TAS',
        store.selectedDefaults.location_id,
        undefined,
      )
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    store.selectedDefaults.location_id = ''
    store.selectedTourDefault = null
  },
  {
    immediate: true,
  },
)
</script>
