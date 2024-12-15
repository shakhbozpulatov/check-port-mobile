<template>
  <div class="flex flex-col gap-0.5 w-full">
    <LazyHotelSearchInput
      :placeholder="$t('177')"
      :default-options="defaultHotelList($t)"
      :selected-item="form.direction"
      class="outline-0"
      main-class="!rounded-t-[10px]"
      @on-select="handleSelect"
    >
      <template #icon>
        <i class="fa-light fa-location-dot text-[24px] text-[#0073ff]"></i>
      </template>
    </LazyHotelSearchInput>
    <Transition>
      <USelectMenu
        v-if="transfers?.length"
        v-model="searchData.transfer"
        :placeholder="$t('337')"
        class="w-full *:*:!text-[14px]"
        value-attribute="code"
        option-attribute="label"
        :options="transfers"
        :disabled="transfers.length === 0 || dashboardStore.loading"
        size="xl"
        :ui="{
          base: 'disabled:bg-greyscale-200 disabled:!text-[#9CA3AF] transfer-select',
          rounded: 'rounded-none',
          ring: 'ring-0',
        }"
      >
      </USelectMenu>
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
              {{ dayjs(form.dates[0]).locale(locale).format('DD MMM') }}
            </span>
          </div>
          <div v-if="form.dates[1]" class="flex flex-col">
            <span class="text-[10px] text-gray-400"> {{ $t('204') }} </span>
            <span class="text-xs">
              {{ dayjs(form.dates[1]).locale(locale).format('DD MMM') }}
            </span>
          </div>
        </div>
        <span v-else class="text-gray-400 flex items-center h-[32px]">
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
            {{ t('422') }}
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
      :loading="loading"
      class="w-full h-[48px] !bg-[#C0F202] text-black font-black justify-center rounded-[10px] !mt-[1rem]"
      @click="searchHotels"
    >
      {{ $t('253') }}
    </UButton>
    <MbscPopup
      :is-open="datepickerModal"
      display="bottom"
      close-on-overlay-click
      theme-variant="light"
      theme="material"
      :buttons="[
        {
          text: 'Ok',
          handler: () => (datepickerModal = false),
          cssClass:
            '!w-full !bg-primary !text-white !text-[14px] !capitalize !rounded-[1rem] !h-[48px] !mb-4',
        },
      ]"
      full-screen
      @close="datepickerModal = false"
    >
      <div
        class="w-[40px] bg-[#F3F4F6] my-5 h-[8px] rounded-full m-auto"
        @click="datepickerModal = false"
      ></div>
      <div class="flex mb-3 justify-between items-center">
        <p class="font-bold text-[16px]">{{ $t('815') }}</p>
        <UButton
          size="sm"
          color="white"
          class="rounded-[10px]"
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
          placeholder: $t('73'),
        }"
        input-component="input"
        select="range"
        :calendar-size="2"
        :ref-date="new Date()"
        display="inline"
        :show-outer-days="false"
        :controls="['calendar']"
        calendar-type="month"
        return-format="iso8601"
        date-format="DD.MM.YYYY"
        :locale="calendarLocales[locale]"
        :min="new Date()"
        width="400px"
        :first-day="1"
        theme="ios"
        :theme-variant="useColorMode().value"
      />
    </MbscPopup>
    <MbscPopup
      :is-open="passengerModal"
      display="bottom"
      theme-variant="light"
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
      <div
        class="w-[40px] bg-[#F3F4F6] mb-4 h-[8px] rounded-full m-auto"
        @click="passengerModal = false"
      ></div>
      <div class="flex mb-2 justify-between items-center">
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
      <hr class="mb-4" />
      <UIPassengerCount
        :form="searchData"
        :disabled="dashboardStore.loading"
        :min-count="1"
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
import { useRoute, useRouter } from 'vue-router'

import { calendarLocales, classOptions, defaultHotelList } from '@/assets/data'
import { useApi } from '@/composables/useApi'
import type { IDirection } from '@/types/tour'
import { useHotelStore } from '~/stores/hotel'

interface Props {
  noRequest?: boolean
}
const props = defineProps<Props>()
const router = useRouter()
const route = useRoute()
const store = useHotelStore()
const dashboardStore = useDashboardStore()
const { myToast } = useCustomToast()

const { t, locale } = useI18n()
const datepickerModal = ref(false)
const passengerModal = ref(false)
const selectedItem: Ref<IDirection | null> = ref(null)
const loading = ref(false)

const form = reactive({
  direction: (route.query?.search as string) ?? '',
  dates: [],
  adult: 1,
  child_age: [],
})
const transferLabels = {
  gr: t('86'),
  in: t('136'),
  no: t('504'),
}
const searchData = reactive({
  adult: 1,
  child_age: [] as string[],
  begin_date: route.query?.begin_date ?? '',
  end_date: route.query?.end_date ?? '',
  currency: useCookie('currency').value ?? 'USD',
  lang: locale.value ?? 'en',
  location_id: route.query?.location_id ?? '',
  product_id: 2,
  referal_loc_type: route.query?.loc_type ?? '',
  transfer: route.query.transfer ?? 'gr',
  type: route.query?.loc_type ?? '',
})
const rules = {
  begin_date: { required },
  end_date: { required },
  location_id: { required },
  transfer: { required },
}
const v$ = useVuelidate(rules, searchData)

const transfers = computed(() =>
  dashboardStore.hotelTransfer?.map((el) => {
    return {
      label: transferLabels[el?.code] || el?.name,
      code: el?.code,
    }
  }),
)
const queryFilter = computed(() => {
  return {
    category: route.query?.category ?? undefined,
    type: route.query?.type ?? undefined,
    hotel_themes: route.query?.hotel_themes ?? undefined,
    exoptions: route.query?.exoptions ?? undefined,
    dmc_list: route.query?.dmc_list ?? undefined,
    exregions:
      route.query?.exregions?.split(',').map((el) => el.replace(/_/, ', ')) ??
      undefined,
    board: route.query?.boards_hotel ?? undefined,
    night_min: route.query?.night_min ?? undefined,
    night_max: route.query?.night_max ?? undefined,
    price_range_min: route.query?.price_range_min ?? undefined,
    price_range_max: route.query?.price_range_max ?? undefined,
    sort: route.query?.sort ?? 'price_asc',
    sub_loc_id: route.query?.sub_loc_id || undefined,
    page: 1,
    hotelNames: route.query?.hotelNames
      ? route.query?.hotelNames?.split(',')
      : undefined,
    instant_booking: route.query?.instant_booking ?? '0',
    discount: route.query?.discount,
    friday: route.query?.friday ?? undefined,
  }
})
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
const handleSelect = async (item: IDirection) => {
  if (!item) return

  form.direction = item?.name
  selectedItem.value = item
  searchData.type = item.type
  searchData.referal_loc_type = item.type
  searchData.location_id = item.id
  if (item?.eps_search) {
    searchData.location_id = await getLocId(item.type, item.id)
  }
  form.direction = item?.name
  await dashboardStore.getHotelTransfer(searchData.location_id)
}
// const nightsCount = computed(() => {
//   const start = dep_date.value || new Date(form.dates[0])
//   const end = arr_date.value || new Date(form.dates[1])
//   const timeDiff = end - start
//   return Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
// })
// function calculateNightCount(date: Date) {
//   arr_date.value = new Date(date)
// }
// function onCalendarChange(e: string[]) {
//   dep_date.value = e[0]
// }
// const disableDate = function (date: Date) {
//   return date < new Date(Date.now() - 86400000)
// }
const searchHotels = async () => {
  searchData.begin_date = dayjs(form.dates[0]).format('YYYY-MM-DD') ?? ''
  searchData.end_date = dayjs(form.dates[1]).format('YYYY-MM-DD') ?? ''
  searchData.currency = useCookie('currency').value || 'USD'
  searchData.lang = locale.value
  v$.value.$touch()
  if (v$.value.$invalid || !form.dates[0] || !form.dates[1]) {
    myToast('error', t('858'))
    return
  }
  if (searchData.type === 'HOTEL') {
    await router.push({
      path: `/${locale.value}/hotels/${searchData.location_id}`,
      query: {
        search_id: 0,
        adult: searchData.adult,
        child_age: searchData.child_age?.join(','),
        currency: searchData.currency,
        type: searchData.type,
        begin_date: searchData.begin_date,
        end_date: searchData.end_date,
        referal_loc_type: searchData.referal_loc_type,
        lang: searchData.lang,
        transfer: searchData.transfer,
      },
    })
  } else {
    store.loading = true
    dashboardStore.loading = true
    loading.value = true
    await router.push({
      path: `/${locale.value}/hotels`,
      query: {
        hotelNames: route.query?.hotelNames,
        location_id: searchData.location_id,
        begin_date: searchData.begin_date,
        end_date: searchData.end_date,
        loc_type: searchData.type,
        search: form.direction,
        transfer: searchData.transfer,
        adult: searchData.adult,
        child_age: searchData.child_age?.join(','),
        searched: 'true',
      },
    })
    if (!props.noRequest) {
      await store.getHotelOffers(searchData, queryFilter.value)
    }
    dashboardStore.loading = false
    loading.value = false
  }
  // toast.warning(t("263"));
}

onMounted(async () => {
  if (route.query.searched) {
    if (route.query?.adult) form.adult = Number(route.query?.adult)
    if (route.query?.begin_date && route.query?.end_date) {
      form.dates = [
        route.query?.begin_date as string,
        route.query?.end_date as string,
      ]
    }
    if (route.query?.adult) searchData.adult = Number(route.query.adult)
    if (route.query?.child_age) {
      const child = route.query.child_age as string
      searchData.child_age = child?.split(',')
    }
    v$.value.$touch()
    if (!v$.value.$invalid) {
      store.loading = true
      dashboardStore.loading = true
      loading.value = true
      await store.getHotelOffers(searchData, queryFilter.value)
      await dashboardStore.getHotelTransfer(searchData.location_id as string)
      dashboardStore.loading = false
      loading.value = false
    }
  }
})
</script>

<style>
.transfer-select .iconify {
  color: #0073ff;
}
</style>
