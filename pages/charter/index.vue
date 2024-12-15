<template>
  <div>
    <UIHeader without-image> {{ $t('810') }} </UIHeader>
    <div class="mt-28">
      <div class="py-4 flex flex-col items-center transition-200 container">
        <Transition name="slide-up" mode="out-in">
          <div
            v-if="isSearch"
            class="bg-white w-full rounded-lg p-3 shadow-lg z-10"
          >
            <h6 class="mb-4 flex items-center gap-3">
              <img src="/images/mini_logo_blue.svg" alt="logo" width="20px" />
              <span>{{ $t('831') }}</span>
            </h6>
            <LazyCharterSearch @on-search="onSearchTickets" />
          </div>
        </Transition>
      </div>
      <div class="container">
        <template v-if="Object.keys($route.query)?.length">
          <div
            v-if="!dashboardStore.loading && store.allTicketsResponse?.count"
            class="mb-3 flex items-center justify-between flex-wrap gap-3 col-span-12"
          >
            <LazyFormRadioBox
              v-model="params.sort"
              class="w-[265px]"
              :options="firstFilters"
              label-key="label"
              value-key="value"
              @update:model-value="onFilter"
            />
            <UButton
              class="rounded-[1rem] my-3 ms-auto"
              @click="filterDialog = true"
              ><i class="fa-sharp fa-light fa-filter-list"></i
            ></UButton>
          </div>
          <div>
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
        </template>
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
      <ClientOnly>
        <div
          v-if="dashboardStore.loading"
          class="rounded-2xl shadow h-fit col-span-12 md:col-span-3 bg-white"
        >
          <LazyUIFilterPreloader />
        </div>
        <div v-else>
          <div
            class="w-[40px] bg-[#F3F4F6] mb-4 h-[8px] rounded-full m-auto"
            @click="filterDialog = false"
          ></div>
          <div class="flex mb-3 justify-between items-center">
            <p class="font-bold text-[16px]">{{ $t('821') }}</p>
            <UButton
              size="sm"
              color="white"
              class="rounded-[1rem]"
              variant="ghost"
              @click="filterDialog = false"
            >
              <i class="fa-solid fa-xmark text-[16px]"></i>
            </UButton>
          </div>
          <hr class="mb-5" />
          <LazyAviaOffersFilter @on-filter="onFilter" />
        </div>
      </ClientOnly>
    </MbscPopup>
  </div>
</template>
<script setup lang="ts">
import { MbscPopup } from '@mobiscroll/datepicker-vue'

const route = useRoute()
const { t } = useI18n()
const store = useAviaStore()
const dashboardStore = useDashboardStore()
const isSearch = ref(false)
const targetDiv = ref(null)
const page = ref(1)
const paginationLoading = ref(false)
const filterDialog = ref(false)
// Computed values
const firstFilters = [
  {
    label: t('407'),
    value: 'duration',
  },
  {
    label: t('408'),
    value: 'price',
  },
]

const params = computed(() => {
  return {
    sort: store.filterParams.sort,
    stops: route.query?.stops?.split(',') ?? undefined,
    only_baggage: route.query?.only_baggage ?? 0, // 1
    airlines: route.query?.airlines?.split(',') ?? undefined,
    depTimes: route.query?.depTimes?.split(',') ?? undefined,
    arrTimes: route.query?.arrTimes?.split(',') ?? undefined,
    page: page.value,
    min_price: route.query?.min_price ?? undefined,
    max_price: route.query?.max_price ?? undefined,
  }
})

const onSearchTickets = async () => {
  page.value = 1
  try {
    store.filterLoader = true
    store.searchData.onlyCharter = 1
    console.log(store.searchData, 'index searchData')
    await store.searchTickets(store.searchData)
    await store.getAllTickets(params.value)
    store.filterParams.min_price = store.allTicketsResponse?.min_price || 0
    store.filterParams.max_price = store.allTicketsResponse?.max_price || 10000
  } catch (e) {
    console.log(e)
  } finally {
    dashboardStore.loading = false
    store.filterLoader = false
    // useCalcExpireTime().calcExpire(store.searchResponse.limit)
  }
}
const onFilter = async () => {
  store.filterLoader = true
  page.value = 1
  try {
    await store.getAllTickets(params.value)
  } catch (e) {
    console.log(e)
  } finally {
    store.filterLoader = false
  }
}
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
// onBeforeUnmount(() => {
//   store.routeChange = true
//   dashboardStore.loading = false
//   // if (store.allTicketsResponse) {
//   //   store.$reset()
//   // }
// })
onMounted(() => {
  isSearch.value = true
})
useSeoMeta({
  title: t('771'),
  ogTitle: t('771'),
  description: t('772'),
  ogDescription: t('772'),
})
</script>
