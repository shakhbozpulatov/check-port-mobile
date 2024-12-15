<template>
  <div>
    <UIHeader without-image> {{ $t('224') }} </UIHeader>
    <div class="mt-24">
      <Transition name="slide-up" mode="out-in">
        <div
          v-if="isSearch"
          class="py-4 flex flex-col items-center transition-200 container"
        >
          <div class="bg-white w-full rounded-lg p-3 shadow-lg">
            <h6 class="mb-4 flex items-center">
              <i
                class="fa-duotone fa-hotel text-[20px] text-[#0073ff] me-2"
              ></i>
              {{ $t('829') }}
            </h6>
            <LazyHotelSearch />
          </div>
        </div>
      </Transition>
      <div class="mb-16 container">
        <LazyHotelOffersMain
          v-if="$route.query.searched"
          :page-loader="loading"
          @on-page-change="onPageChange"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const route = useRoute()
const { locale, t } = useI18n()
const store = useHotelStore()
const isSearch = ref(false)

const page = ref(1)
const loading = ref(false)
const searchData = computed(() => {
  return {
    adult: route.query?.adult ? Number(route.query?.adult) : 1,
    child_age: route.query?.child_age ? route.query?.child_age?.split(',') : [],
    begin_date: route.query?.begin_date ?? '',
    end_date: route.query?.end_date ?? '',
    currency: useCookie('currency').value ?? 'USD',
    lang: locale.value ?? 'en',
    location_id: route.query?.location_id ?? '',
    product_id: 2,
    referal_loc_type: route.query?.loc_type ?? '',
    transfer: route.query.transfer ?? 'gr',
    type: route.query?.loc_type ?? '',
  }
})
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
    page: page.value,
    instant_booking: route.query?.instant_booking ?? undefined,
    only_available: route.query?.only_available ?? undefined,
    hotelNames: route.query?.hotelNames
      ? route.query?.hotelNames?.split(',')
      : undefined,
    discount: route.query?.discount,
    friday: route.query?.friday ?? undefined,
  }
})

const onPageChange = async (e: number) => {
  page.value = e
  try {
    loading.value = true
    await store.getHotelOffers(searchData.value, queryFilter.value)
  } catch (err) {
    console.log(err)
  } finally {
    loading.value = false
  }
}
onMounted(() => {
  isSearch.value = true
})
useSeoMeta({
  title: t('224'),
})
</script>
