<template>
  <div>
    <UTabs :items="items" @change="onChange" />
    <div v-if="display === 'results'" class="">
      <div v-if="!store.loading">
        <div
          v-if="hotels?.length"
          class="rounded-[1rem] flex items-center bg-white py-2.5 px-2 shadow md:mb-3 mb-4 w-full gap-2 md:flex-nowrap flex-wrap transition-200"
        >
          <LazyUIHotelSearchByName
            v-if="hotelResponse?.hotels_filter?.hotel_name_list?.length"
            v-model="namesHotel"
            class="grow"
            :list="hotelResponse?.hotels_filter?.hotel_name_list"
            @on-search="searchHotelsByName"
          />
          <UButton class="rounded-[1rem]" @click="filterDialog = true"
            ><i class="fa-sharp fa-light fa-filter-list"></i
          ></UButton>
        </div>
      </div>
      <template v-if="store.loading">
        <LazyUIHotelCardPreloader v-for="item in 10" :key="item" />
      </template>
      <template v-else>
        <LazyHotelOffersCard
          v-for="(item, index) in hotels"
          :key="'hotel' + index"
          :hotel="item"
          :loading="store.loading"
          :hotel-response="hotelResponse"
          class="mb-6 last:mb-0 max-h-auto"
        />
      </template>
      <div v-if="hotels?.length">
        <div ref="targetDiv" class="flex justify-center py-2"></div>
      </div>
      <div
        v-if="
          !dashboardStore.loading &&
          hotelResponse &&
          !hotelResponse?.hotels?.length
        "
        class="bg-amber-300 rounded-lg text-white py-5 text-center"
        role="alert"
      >
        {{ $t('449') }}
      </div>
    </div>
    <LazyUIGMaps
      v-if="display === 'map'"
      :locations="hotelLocations"
      :center="{
        longitude: hotelLocations?.[0]?.geolocation?.longitude,
        latitude: hotelLocations?.[0]?.geolocation?.latitude,
      }"
    />
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
          class="rounded-[1rem]"
          @click="filterDialog = false"
        >
          <i class="fa-solid fa-xmark text-[16px]"></i>
        </UButton>
      </div>
      <hr class="mb-5" />
      <LazyHotelOffersFilter
        :hotel-response="hotelResponse"
        :loading="store.loading"
        @on-filter="page = 1"
      />
    </MbscPopup>
  </div>
</template>
<script setup lang="ts">
import { MbscPopup } from '@mobiscroll/datepicker-vue'
import { useIntersectionObserver } from '@vueuse/core'
import type { Ref } from 'vue'

interface Props {
  pageLoader: boolean
}
defineProps<Props>()

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const store = useHotelStore()
const dashboardStore = useDashboardStore()

const filterDialog = ref(false)

interface ListItem {
  code: string
  name: string
}
const emits = defineEmits<{
  (e: 'on-clear-filter'): void
  (e: 'on-page-change'): void
  (e: 'on-search'): void
}>()
const items = [
  {
    label: t('854'),
    icon: '',
  },
  {
    label: t('855'),
    icon: '',
  },
]
const targetDiv = ref(null)
const page = ref(1)

const namesHotel = ref<ListItem[]>([])
const display: Ref<'results' | 'map'> = ref('results')
const hotels = computed(() => store.hotels)
const hotelLocations = computed(() =>
  store.hotels?.map((hotel) => {
    return {
      geolocation: hotel?.content?.geolocation,
      id: hotel?.code,
      image: hotel?.images?.[0],
      name: hotel?.content?.name,
      stars: hotel?.content?.stars,
      address: hotel?.content?.address,
      price: hotel?.rooms[0].price,
      currency: hotel?.rooms[0].currency,
    }
  }),
)
const hotelResponse = computed(() => store.hotelsResponse)
const searchData = computed(() => {
  return {
    adult: route.query?.adult ? Number(route.query?.adult) : 1,
    child_age: route.query?.child_age ? route.query.child_age?.split(',') : [],
    begin_date: route.query?.begin_date ?? '',
    end_date: route.query?.end_date ?? '',
    currency: localStorage.getItem('currency') ?? 'USD',
    lang: localStorage.getItem('locale') ?? 'en',
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
    hotelNames: route.query?.hotelNames
      ? route.query?.hotelNames?.split(',')
      : undefined,
  }
})
const searchHotelsByName = async () => {
  store.loading = true
  page.value = 1
  const name = {
    hotelNames:
      namesHotel.value.length > 0
        ? namesHotel.value.map((el) => el?.code).join(',')
        : undefined,
  }
  await updateQuery(name)
  await store.getHotelOffers(searchData.value, queryFilter.value)
}
async function updateQuery(query) {
  await router.replace({ query: { ...route.query, ...query } })
}

const onClearFilter = async () => {
  if (!namesHotel.value?.length) {
    await updateQuery({ hotelNames: undefined })
    page.value = 1
    store.loading = true
    await store.getHotelOffers(searchData.value, queryFilter.value)
  }
}

const removeHotelName = (index: number) => {
  namesHotel.value.splice(index, 1)
  onClearFilter()
}
useIntersectionObserver(targetDiv, ([{ isIntersecting }]) => {
  if (
    isIntersecting &&
    hotelResponse.value?.hotels_count > hotels.value?.length
  ) {
    page.value++
    emits('on-page-change', page.value)
  }
})
watch(
  () => hotelResponse.value,
  () => {
    const codes = route.query?.hotelNames
      ? String(route.query?.hotelNames)?.split(',')
      : []
    if (codes?.length && hotelResponse.value) {
      namesHotel.value =
        hotelResponse.value?.hotels_filter?.hotel_name_list?.filter((el) =>
          codes?.includes(el?.code),
        )
    }
  },
  {
    deep: true,
    immediate: true,
  },
)
const onChange = (e: number) => {
  display.value = e === 0 ? 'results' : 'map'
}
// onMounted(async () => {
//   namesHotel.value = route.query?.hotelNames?.split(',')
// })
</script>
