<template>
  <div class="pt-16 mt-[50px]">
    <div
      class="px-2 pb-2.5 pt-16 flex items-center justify-between fixed z-[101] transition-200 w-full top-0 bg-white shadow-b rounded-b-2xl"
    >
      <div class="flex items-center w-full">
        <div class="text-dark text-sm ml-2 font-semibold opacity-100 w-full">
          <template v-if="directions && directions?.length">
            <div
              v-if="route.params.search !== 'regular'"
              class="flex items-center justify-between gap-2 w-full"
            >
              <div
                class="flex items-center gap-2"
                @click="isSearchActive = !isSearchActive"
              >
                <template v-for="(item, index) in directions" :key="index">
                  <div class="flex items-center gap-2">
                    <div class="flex items-center">
                      <p class="text-xs">
                        {{ item.departure_code }} - {{ item.arrival_code }}
                      </p>
                      <span class="text-xs ml-2">{{
                        dayjs(item.date).format('DD MMM, YY')
                      }}</span>
                    </div>
                    <hr class="h-6 w-0.5 bg-greyscale-200" />
                  </div>
                </template>
                <div>
                  <i
                    class="fa-light fa-user mr-1 transition text-xs duration-150"
                  ></i>
                  <span class="mr-1 text-xs">{{
                    searchData.adult_qnt +
                    searchData.child_qnt +
                    searchData.infant_qnt
                  }}</span>
                </div>
              </div>
              <UIButton
                id="editBtn"
                variant="primary"
                class="!bg-white !text-[#0073ff]"
                @click="isSearchActive = !isSearchActive"
              >
                <i class="fa-regular fa-pen-to-square"></i>
              </UIButton>
            </div>
            <div v-else class="flex items-center gap-3">
              <div
                class="flex justify-center items-center"
                @click="$router.go(-1)"
              >
                <i class="fa-light fa-chevron-left text-primary text-base"></i>
              </div>
              {{ $t('808') }}
            </div>
          </template>
        </div>
      </div>
    </div>
    <Transition name="slide-up" mode="out-in">
      <div v-if="isSearchActive" class="container mb-5">
        <div
          class="index-avia-form bg-white rounded-[1rem] p-3 shadow-lg bottom-[-280px] w-full z-10"
        >
          <h6 class="mb-4 flex items-center">
            <i class="fa-duotone fa-plane text-[20px] text-[#0073ff] me-2"></i>
            {{ $t('811') }}
          </h6>
          <AviaSearchOneWay :form="searchData" :loading="loading" />
        </div>
      </div>
    </Transition>
    <div class="px-4">
      <div
        v-if="!dashboardStore.loading && !store.filterLoader"
        class="mb-6 flex items-center justify-between gap-1"
      >
        <USelectMenu
          v-model="params.sort"
          :options="firstFilters"
          :placeholder="$t('143')"
          value-attribute="value"
          class="w-full"
          @change="onFilter"
        />
        <USelectMenu
          v-model="searchData.class"
          :options="options"
          :placeholder="$t('143')"
          value-attribute="value"
          class="w-full"
          @change="onSearchTickets"
        />
        <UIButton
          id="filterBtn"
          variant="primary"
          class="text-white bg-[#0073ff] ml-2"
          @click="filterDialog = true"
        >
          <i class="fa-sharp fa-regular fa-filter-list"></i>
        </UIButton>
      </div>
      <div class="overflow-x-hidden">
        <div
          v-if="
            store.filterLoader &&
            !store.tickets?.length &&
            dashboardStore.loading
          "
        >
          <LazyAviaOffersTicketLoader v-for="index in 6" :key="index" />
        </div>
        <template v-else>
          <LazyAviaOffersCard
            v-for="(ticket, index) in store.tickets"
            :key="index + 'offer'"
            :data="ticket"
          />
        </template>
        <div v-if="dashboardStore.loading && store.tickets?.length">
          <LazyAviaOffersTicketLoader v-for="item in 6" :key="item" />
        </div>
        <div
          v-if="!dashboardStore.loading && store.tickets?.length"
          ref="targetDiv"
          class="py-2"
        ></div>
        <div
          v-if="
            !dashboardStore.loading &&
            !store.filterLoader &&
            !store.tickets?.length &&
            !paginationLoading &&
            store.allTicketsResponse?.airlines?.length &&
            store.allTicketsResponse?.status === 'Ready'
          "
          class="bg-amber-300 rounded-lg text-white py-5 text-center col-span-12"
          role="alert"
        >
          {{ $t('437') }}
        </div>
      </div>
      <div
        v-if="
          !dashboardStore.loading &&
          !store.filterLoader &&
          !store.tickets?.length &&
          !store.allTicketsResponse?.airlines?.length &&
          store.allTicketsResponse?.status === 'Ready'
        "
        class="bg-amber-300 rounded-lg text-white py-5 text-center col-span-12"
        role="alert"
      >
        {{ $t('437') }}
      </div>
    </div>
    <MbscPopup
      :is-open="filterDialog"
      display="bottom"
      theme-variant="light"
      theme="material"
      :full-screen="true"
      :scroll-lock="false"
      css-class="small-popup"
      :buttons="[
        {
          text: 'Ok',
          handler: () => (filterDialog = false),
          cssClass:
            '!w-full !bg-primary !text-white !text-[14px] !capitalize !rounded',
        },
      ]"
      @close="filterDialog = false"
    >
      <div
        class="w-[40px] bg-[#F3F4F6] mb-4 h-[8px] rounded-full m-auto mt-10"
        @click="filterDialog = false"
      ></div>
      <div class="flex mb-3 justify-between items-center">
        <p class="font-bold text-[16px]">{{ $t('821') }}</p>
        <UButton
          size="sm"
          color="white"
          variant="ghost"
          @click="filterDialog = false"
        >
          <i class="fa-solid fa-xmark text-[16px]"></i>
        </UButton>
      </div>
      <hr class="mb-5" />
      <LazyAviaOffersFilter @on-filter="onFilter" />
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
          handler: onSearchTickets,
          cssClass: '!w-full !bg-primary !text-white !text-[14px] !capitalize',
        },
      ]"
      @close="passengerModal = false"
    >
      <div
        class="w-[40px] bg-[#F3F4F6] mb-4 h-[8px] rounded-full m-auto"
        @click="passengerModal = false"
      ></div>
      <div class="flex mb-3 justify-between items-center">
        <p class="font-bold text-[16px]">{{ $t('241') }}</p>
        <UButton
          size="sm"
          color="white"
          variant="ghost"
          @click="passengerModal = false"
        >
          <i class="fa-solid fa-xmark text-[16px]"></i>
        </UButton>
      </div>
      <hr class="mb-5" />
      <div>
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
                v-model="searchData.adult_qnt"
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
                v-model="searchData.child_qnt"
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
                v-model="searchData.infant_qnt"
                :min="0"
                :max="8"
                :disabled="totalPassengers >= 9"
              />
            </div>
          </div>
          <div class="mt-3">
            <URadioGroup
              v-model="searchData.class"
              class="direction"
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

import { MbscPopup } from '@mobiscroll/datepicker-vue'
import dayjs from 'dayjs'
const route = useRoute()
const { t } = useI18n()
const { y } = useWindowScroll()
const store = useAviaStore()
const dashboardStore = useDashboardStore()
const directions = computed(
  () => parseRouteParams(route.params.search as string).directions,
)

const loading = ref(false)
const searchData = reactive({
  onlyCharter: 0,
  product_id: 1,
  adult_qnt: 1,
  child_qnt: 0,
  infant_qnt: 0,
  class: 'E',
  currency: useCookie('currency').value || 'USD',
  in_one_days: 0,
  charter_three_days: 0,
  only_baggage: 0,
  sorting_price: 1,
  directions: [
    {
      dep_type: '',
      arr_type: '',
      departure_code: '',
      arrival_code: '',
      date: '',
    },
  ],
})
const totalPassengers = computed(
  () => searchData.adult_qnt + searchData.child_qnt + searchData.infant_qnt,
)
const filterDialog = ref(false)
const targetDiv = ref(null)
const isSearchActive = ref(false)
const page = ref(1)
// 687
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
const paginationLoading = ref(false)
const passengerModal = ref(false)
const firstFilters = computed(() => {
  return [
    {
      label: t('407'),
      value: 'duration',
    },
    {
      label: t('408'),
      value: 'price',
    },
  ]
})
const params = computed(() => {
  return {
    sort: 'price',
    stops: route.query?.stops?.split(',') ?? undefined,
    only_baggage: route.query?.only_baggage || 0,
    airlines: route.query?.airlines?.split(',') ?? undefined,
    depTimes: route.query?.depTimes?.split(',') ?? undefined,
    arrTimes: route.query?.arrTimes?.split(',') ?? undefined,
    page: page.value,
    min_price: store.filterParams.min_price || undefined,
    max_price: store.filterParams.max_price || undefined,
  }
})
function parseRouteParams(route: string) {
  // Extract the last 4 characters for flightClass and quantities
  const passengerInfo = route.slice(-4) // Last 4 characters
  const directionsParam = route.slice(0, -5) // Everything except the last 5 characters (including '_')
  // // Extract flight class and passenger quantities
  const flightClass = passengerInfo[0] // First character is the flight class
  const adult_qnt = parseInt(passengerInfo[1], 10) // Second character is adult quantity
  const child_qnt = parseInt(passengerInfo[2], 10) // Third character is child quantity
  const infant_qnt = parseInt(passengerInfo[3], 10) // Fourth character is infant quantity

  // // Split directions into individual segments
  const directions = directionsParam.split('-').map((segment) => {
    const departure_code = segment.slice(0, 3)
    const date = segment.slice(3, 13).replace(/_/g, '-') // Convert back to YYYY-MM-DD format
    const arrival_code = segment.slice(13)
    return {
      departure_code,
      date,
      arrival_code,
      dep_type: '',
      arr_type: '',
    }
  })
  return { directions, flightClass, adult_qnt, child_qnt, infant_qnt }
}

const onSearchTickets = async () => {
  page.value = 1
  store.filterLoader = true
  store.routeChange = false
  loading.value = true
  dashboardStore.loading = true
  passengerModal.value = false
  isSearchActive.value = false
  try {
    await store.searchTickets(searchData)
    await store.getAllTickets(params.value)
    store.filterParams.min_price = store.allTicketsResponse?.min_price || 0
    store.filterParams.max_price = store.allTicketsResponse?.max_price || 10000
  } catch (e) {
    console.log(e)
  } finally {
    dashboardStore.loading = false
    loading.value = false
    store.filterLoader = false
    useCalcExpireTime().calcExpire(store.searchResponse?.limit)
  }
}
const onFilter = async () => {
  store.filterParams.sort = params.value.sort
  page.value = 1
  try {
    store.filterLoader = true
    await store.getAllTickets(params.value)
  } catch (e) {
    console.log(e)
  } finally {
    store.filterLoader = false
  }
}
watch(
  () => y.value,
  (val) => {
    if (val > 400) isSearchActive.value = false
  },
)
onMounted(() => {
  if (route.params.search !== 'regular') {
    const parsedParams = parseRouteParams(route.params.search as string)
    searchData.directions = parsedParams.directions
    searchData.adult_qnt = parsedParams.adult_qnt
    searchData.child_qnt = parsedParams.child_qnt
    searchData.infant_qnt = parsedParams.infant_qnt
    searchData.class = parsedParams.flightClass
    onSearchTickets()
  } else {
    isSearchActive.value = true
  }
})
useIntersectionObserver(targetDiv, async ([{ isIntersecting }]) => {
  if (
    isIntersecting &&
    store.allTicketsResponse?.count > store.tickets?.length
  ) {
    page.value++
    try {
      paginationLoading.value = true
      await store.getAllTickets(params.value)
    } catch (err) {
      console.log(err)
    } finally {
      paginationLoading.value = false
    }
  }
})
useSeoMeta({
  title: t('769'),
  ogTitle: t('769'),
  description: t('770'),
  ogDescription: t('770'),
})
</script>

<style>
.direction > fieldset {
  display: flex;
  gap: 1rem;
}
</style>
