<template>
  <div>
    <UIHeader without-image> {{ $t('809') }} </UIHeader>
    <div class="mt-24">
      <div class="py-4 flex flex-col items-center transition-200 container">
        <Transition name="slide-up" mode="out-in">
          <div v-if="isSearch" class="bg-white w-full rounded-lg p-3 shadow-lg">
            <h6 class="mb-4 flex items-center">
              <i
                class="fa-duotone fa-earth-asia text-[20px] text-[#0073ff] me-2"
              ></i>
              {{ $t('830') }}
            </h6>
            <LazyTourSearch />
          </div>
        </Transition>
      </div>
      <div class="container">
        <LazyTourOffersMain
          v-if="Object.keys($route.query)?.length"
          :pagination-loading="paginationLoading"
          @on-paginate="onPaginate"
          @on-reset-page="page = 1"
          @on-search="onSearchHotels"
          @on-clear-filter="onClearFilter"
          @on-change-ticket="onSearchHotels"
          @on-calculate_late_checkin="onCalculateCheckin"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const store = useTourStore()
const isSearch = ref(false)
const page = ref(1)
const paginationLoading = ref(false)

const queryFilter = computed(() => {
  return {
    category: route.query?.category?.split(',') ?? undefined,
    type: route.query?.type?.split(',') ?? undefined,
    hotel_themes: route.query?.hotel_themes?.split(',') ?? undefined,
    board: route.query?.boards_hotel?.split(',') ?? undefined,
    exoptions: route.query?.exoptions?.split(',') ?? undefined,
    exregions:
      route.query?.exregions?.split(',').map((el) => el.replace(/_/, ', ')) ??
      undefined,
    night_min: route.query?.night_min ?? undefined,
    night_max: route.query?.night_max ?? undefined,
    price_range_min: route.query?.price_range_min ?? undefined,
    price_range_max: route.query?.price_range_max ?? undefined,
    sort: route.query?.sort ?? 'price_asc',
    page: page.value,
    sub_loc_id: route.query?.sub_loc_id ?? undefined,
    hotelNames: route.query?.hotelNames
      ? route.query?.hotelNames?.split(',')
      : undefined,
    search_mode: route.params.search_mode,
    dmc_list: route.query?.dmc_list?.split(',') ?? [],
    instant_booking: route.query?.instant_booking ?? undefined,
    only_available: route.query?.only_available ?? undefined,
  }
})

const onPaginate = async () => {
  page.value++
  paginationLoading.value = true
  if (store.allTourOffers) store.allTourOffers.status = 'InProgress'
  await store.fetchTourOffers(queryFilter.value, true)
  paginationLoading.value = false
}
const onSearchHotels = async () => {
  page.value = 1
  store.filterLoader = true
  if (store.allTourOffers) store.allTourOffers.status = 'InProgress'
  await store.fetchTourOffers(queryFilter.value, true)
}
const onClearFilter = async () => {
  page.value = 1
  store.filterLoader = true
  const data = { ...queryFilter.value }
  for (const key in data) {
    data[key] = undefined
  }
  data.page = 1
  data.sort = 'none'
  data.search_mode = route.params.search_mode
  await router.replace({ query: { ...route.query, ...data } })
  if (store.allTourOffers) store.allTourOffers.status = 'InProgress'
  await store.fetchTourOffers(data, false)
}
const onCalculateCheckin = async (num: number) => {
  store.filterLoader = true
  const data = {
    ...queryFilter.value,
    ex_late_checkin: num,
  }
  await store.fetchTourOffers(data, true)
}
watch(
  () => route.params.search_mode,
  () => {
    if (route.params.search_mode === 'dmc') {
      document.title = t('346')
    } else {
      document.title = 'GDS ' + t('346')
    }
  },
)
onMounted(() => {
  isSearch.value = true
})
useSeoMeta({
  title: t('346'),
})
</script>
