<template>
  <div>
    <div class="filter-card flex flex-col gap-3 transition-200">
      <h5
        v-if="allTourOffers?.hotels_count"
        class="filter-title font-bolder text-[17px] transition-200"
      >
        {{ t('171') }}: {{ formatNumber(allTourOffers?.hotels_count) }}
        {{ t('201') }}
      </h5>
      <div v-if="filterData?.hotels_filter.hotel.instant_booking" class="my-3">
        <div class="flex items-center justify-between mb-3">
          <p class="font-semibold text-[15px]">{{ $t('508') }}</p>
          <UICustomSwitch
            v-model="filter.instant_booking"
            @change="fetchTourOffers"
          />
        </div>
        <p class="text-[12px] text-[#777]">
          {{ $t('767') }}
        </p>
      </div>
      <div v-if="filterData?.hotels_filter.hotel.only_available" class="my-3">
        <div class="flex items-center justify-between mb-3">
          <p class="font-semibold text-[15px]">{{ $t('508') }}</p>
          <UICustomSwitch
            v-model="filter.only_available"
            @change="fetchTourOffers"
          />
        </div>
      </div>
      <USelectMenu
        v-model="filter.sort"
        :options="hotelsSort(t)"
        option-attribute="label"
        size="lg"
        value-attribute="value"
        class="alt_select"
        @change="fetchTourOffers"
      />
      <div v-if="filterData?.hotels_filter?.dmc_list">
        <USelectMenu
          v-model="filter.dmc_list"
          :options="filterData?.hotels_filter?.dmc_list"
          multiple
          size="lg"
          class="alt_select"
          placeholder="DMC"
          @change="fetchTourOffers"
        />
      </div>
      <div v-if="filterData?.hotels_filter?.region?.sub_regions?.length">
        <p class="mb-2 text-[16px] font-bolder">{{ $t('284') }}</p>
        <USelectMenu
          v-model="filter.sub_loc_id"
          :options="filterData?.hotels_filter?.region?.sub_regions"
          option-attribute="name"
          value-attribute="id"
          :placeholder="t('73')"
          class="alt_select"
          @change="fetchTourOffers"
        />
      </div>
      <UICustomCollapse
        v-if="filterData?.hotels_filter?.hotel?.ex_region?.length"
        selected
        :title="$t('15')"
      >
        <div
          class="moreinfo flex flex-col max-h-[200px] overflow-y-auto d-scroll"
        >
          <FormCheckboxGroup
            v-model="filter.exregions"
            class="flex flex-col"
            :options="filterData?.hotels_filter?.hotel?.ex_region"
            label-key="name"
            value-key="name"
            @update:model-value="fetchTourOffers"
          />
        </div>
      </UICustomCollapse>

      <div v-if="filterData?.hotels_filter?.hotel?.ex_options?.length">
        <HotelFilterExOptions
          v-model="filter.exoptions"
          :options="filterData?.hotels_filter?.hotel?.ex_options"
          @update:model-value="fetchTourOffers"
        />
      </div>
      <div
        v-if="
          filterData?.price_filter?.by_night_price?.min ||
          filterData?.price_filter?.by_night_price?.max
        "
        class="mt-1"
      >
        <p class="categ-name mb-2 text-[16px] font-bolder transition-200">
          {{ t('54') }}, {{ filterData?.price_filter?.currency || '$' }}
        </p>
        <div class="mt-1">
          <div class="flex items-center justify-between mb-4">
            <UButton class="rounded-[1rem] text" color="white">
              {{ formatNumber(Math.round(filter.nightPrice[0])) }}
            </UButton>
            <UButton class="rounded-[1rem] text" color="white">
              {{ formatNumber(Math.round(filter.nightPrice[1])) }}
            </UButton>
          </div>
          <FormRangeSlider
            v-model:min-value="filter.nightPrice[0]"
            v-model:max-value="filter.nightPrice[1]"
            :min="filterData?.price_filter?.by_night_price?.min"
            :max="filterData?.price_filter?.by_night_price?.max"
            @change="fetchTourOffers"
          />
        </div>
        <div class="flex items-center justify-between">
          <p class="text transition-200">
            {{ formatNumber(filterData?.price_filter?.by_night_price?.min) }}
          </p>
          <p class="text transition-200">
            {{ formatNumber(filterData?.price_filter?.by_night_price?.max) }}
          </p>
        </div>
      </div>

      <UICustomCollapse
        v-if="filterData?.hotels_filter?.hotel?.category?.length"
        selected
        :title="$t('332')"
      >
        <div
          class="moreinfo flex flex-col max-h-[200px] overflow-x-auto d-scroll"
        >
          <FormCheckboxGroup
            v-model="filter.types"
            class="flex flex-col"
            :options="filterData?.hotels_filter?.hotel?.category"
            label-key="name"
            value-key="name"
            @update:model-value="fetchTourOffers"
          />
        </div>
      </UICustomCollapse>
      <UICustomCollapse
        v-if="filterData?.hotels_filter?.hotel?.rating?.length"
        selected
        :title="$t('142')"
      >
        <div class="moreinfo flex flex-col">
          <HotelFilterCategory
            v-model="filter.category"
            class="flex flex-col"
            :options="filterData?.hotels_filter?.hotel?.rating"
            @update:model-value="fetchTourOffers"
          />
        </div>
      </UICustomCollapse>
      <UICustomCollapse
        v-if="allTourOffers?.hotels_filter?.hotel?.boards_hotel?.length"
        selected
        :title="$t('246')"
      >
        <div
          class="moreinfo flex flex-col max-h-[200px] overflow-y-auto d-scroll"
        >
          <FormCheckboxGroup
            v-model="filter.board"
            class="flex flex-col"
            :options="allTourOffers?.hotels_filter?.hotel?.boards_hotel"
            label-key="name"
            value-key="name"
            @update:model-value="fetchTourOffers"
          />
        </div>
      </UICustomCollapse>
      <UICustomCollapse
        v-if="filterData?.hotels_filter?.hotel?.hotel_themes?.length"
        selected
        :title="$t('219')"
      >
        <div
          class="moreinfo flex flex-col max-h-[200px] overflow-y-auto d-scroll"
        >
          <FormCheckboxGroup
            v-model="filter.themes"
            class="flex flex-col"
            :options="filterData?.hotels_filter?.hotel?.hotel_themes"
            label-key="name"
            value-key="name"
            @update:model-value="fetchTourOffers"
          />
        </div>
      </UICustomCollapse>
    </div>
  </div>
</template>

<script setup lang="ts">
import 'vue-simple-range-slider/css'

import VueSimpleRangeSlider from 'vue-simple-range-slider'

import { hotelsSort } from '@/assets/data'
import { formatNumber } from '@/utils'

const emits = defineEmits<{
  (e: 'on-set-page'): void
}>()
const { t } = useI18n()

const dashboardStore = useDashboardStore()
const store = useTourStore()
const route = useRoute()
const router = useRouter()

const allTourOffers = computed(() => store.allTourOffers)
const filterData = computed(() => store.filterData)

const filter = reactive({
  types: route.query?.type?.split(',') ?? [],
  category: route.query?.category?.split(',') ?? [],
  themes: route.query?.hotel_themes?.split(',') ?? [],
  board: route.query?.boards_hotel?.split(',') ?? [],
  exoptions: route.query?.exoptions?.split(',')?.map((el) => Number(el)) ?? [],
  exregions:
    route.query?.exregions?.split(',')?.map((el) => el.replace(/_/, ', ')) ??
    [],
  nightPrice: [
    route.query?.night_min
      ? Number(route.query?.night_min)
      : allTourOffers.value?.price_filter?.by_night_price?.min,
    route.query?.night_max
      ? Number(route.query?.night_max)
      : allTourOffers.value?.price_filter?.by_night_price?.max,
  ],
  hotelPrice: [
    route.query?.price_range_min
      ? Number(route.query?.price_range_min)
      : allTourOffers.value?.price_filter?.by_price?.min,
    route.query?.price_range_max
      ? Number(route.query?.price_range_max)
      : allTourOffers.value?.price_filter?.by_price?.max,
  ],
  sort: 'price_asc',
  sub_loc_id: '',
  dmc_list: route.query?.dmc_list?.split(',') ?? [],
  instant_booking: route.query?.instant_booking === '1',
  only_available: route.query?.only_available === '1',
})
const queryFilter = computed(() => {
  return {
    category: filter.category?.length ? filter.category?.join(',') : undefined,
    type: filter.types?.length ? filter.types?.join(',') : undefined,
    board: filter.board?.length ? filter.board?.join(',') : undefined,
    hotel_themes: filter.themes?.length ? filter.themes?.join(',') : undefined,
    exoptions: filter.exoptions?.length
      ? filter.exoptions?.join(',')
      : undefined,
    exregions: filter.exregions?.length
      ? filter.exregions?.map((el) => el.replace(/, /g, '_')).join(',')
      : undefined,
    sort: filter.sort,
    night_min: filter.nightPrice[0] ?? undefined,
    night_max: filter.nightPrice[1] ?? undefined,
    // price_range_min: filter.hotelPrice[0] ?? undefined,
    // price_range_max: filter.hotelPrice[1] ?? undefined,
    dmc_list: filter.dmc_list?.length ? filter.dmc_list?.join(',') : undefined,
    page: 1,
    search_mode: route.params.search_mode,
    sub_loc_id: route.params.sub_loc_id || filter.sub_loc_id,
    instant_booking: filter.instant_booking ? 1 : 0,
    only_available: filter.only_available ? 1 : 0,
  }
})

async function fetchTourOffers() {
  try {
    store.filterLoader = true
    await router.replace({ query: { ...route.query, ...queryFilter.value } })
    if (allTourOffers.value) allTourOffers.value.status = 'InProgress'
    emits('on-set-page')
    const data = { ...queryFilter.value }
    data.category = filter.category
    data.type = filter.types
    data.board = filter.board.map((el) => el.split(' ').join('+'))
    data.hotel_themes = filter.themes
    data.exoptions = filter.exoptions
    data.exregions = filter.exregions
    data.dmc_list = filter.dmc_list
    data.instant_booking = filter.instant_booking ? 1 : 0
    data.only_available = filter.only_available ? 1 : 0
    data.hotelNames = route.query?.hotelNames
      ? route.query?.hotelNames?.split(',')
      : undefined
    await store.fetchTourOffers(data, true)
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  if (!dashboardStore.loading) {
    filter.hotelPrice = [
      route.query?.price_range_min
        ? Number(route.query?.price_range_min)
        : filterData.value?.price_filter?.by_price?.min,
      route.query?.price_range_max
        ? Number(route.query?.price_range_max)
        : filterData.value?.price_filter?.by_price?.max,
    ]
  }
})
</script>
