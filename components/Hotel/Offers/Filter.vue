<template>
  <div
    v-if="hotelResponse"
    class="filter-card flex mb-3 flex-col gap-3 h-fit transition-200"
  >
    <h5 class="filter-title transition-200">
      {{ t('171') }}: {{ formatNumber(hotelResponse?.hotels_count) }}
      {{ t('201') }}
    </h5>
    <div v-if="hotelResponse.hotels_filter.hotel.friday_discount" class="my-1">
      <div class="flex items-center gap-3 mb-3">
        <p class="font-semibold text-[15px]">Black Friday</p>
        <UICustomSwitch
          v-model="filter.friday"
          class="ms-auto"
          @change="filterHotels"
        />
      </div>
      <!--      <p class="text-[12px] text-[#777]">{{ $t('767') }}</p>-->
    </div>
    <div v-if="hotelResponse.hotels_filter.hotel.instant_booking" class="my-1">
      <div class="flex items-center gap-3 mb-3">
        <p class="font-semibold text-[15px]">{{ $t('508') }}</p>
        <UICustomSwitch
          v-model="filter.instant_booking"
          class="ms-auto"
          @change="filterHotels"
        />
      </div>
      <p class="text-[12px] text-[#777]">{{ $t('767') }}</p>
    </div>
    <div v-if="hotelResponse.hotels_filter.hotel.only_available" class="my-1">
      <div class="flex items-center gap-3 mb-3">
        <p class="font-semibold text-[15px]">{{ $t('841') }}</p>
        <UICustomSwitch
          v-model="filter.only_available"
          class="ms-auto"
          @change="filterHotels"
        />
      </div>
      <p class="text-[12px] text-[#777]">{{ $t('842') }}</p>
    </div>
    <div v-if="hotelResponse.hotels_filter.hotel.discount" class="my-1">
      <div class="flex items-center gap-3 mb-3">
        <p class="font-semibold text-[15px]">{{ $t('857') }}</p>
        <UICustomSwitch
          v-model="filter.discount"
          class="ms-auto"
          @change="filterHotels"
        />
      </div>
    </div>
    <!--      EX OPTIONS    -->
    <div v-if="hotelResponse?.hotels_filter?.dmc_list">
      <USelectMenu
        v-model="filter.dmc_list"
        :options="hotelResponse?.hotels_filter?.dmc_list"
        multiple
        size="lg"
        placeholder="DMC"
        class="alt_select"
        @change="filterHotels"
      />
    </div>

    <USelectMenu
      v-model="filter.sort"
      :options="sortHotels"
      option-attribute="label"
      value-attribute="value"
      size="lg"
      class="alt_select"
      @change="filterHotels"
    />
    <UICustomCollapse
      v-if="hotelResponse?.hotels_filter?.hotel?.ex_region?.length"
      selected
      :title="$t('15')"
    >
      <div
        class="moreinfo flex flex-col max-h-[200px] overflow-x-auto d-scroll"
      >
        <FormCheckboxGroup
          v-model="filter.exregions"
          class="flex flex-col"
          :options="hotelResponse?.hotels_filter?.hotel?.ex_region"
          label-key="name"
          value-key="name"
          @update:model-value="filterHotels"
        />
      </div>
    </UICustomCollapse>
    <div v-if="regions?.length">
      <p class="categ-name mb-2 transition-200">
        {{ t('284') }}
      </p>
      <USelectMenu
        v-model="filter.sub_loc_id"
        class="w-full alt_select"
        :placeholder="$t('73')"
        :options="regions"
        option-attribute="name"
        size="lg"
        value-attribute="id"
        @change="onRegionChange"
      >
      </USelectMenu>
    </div>
    <div
      v-if="hotelResponse?.hotels_filter?.hotel?.ex_options?.length"
      class="moreinfo"
    >
      <HotelFilterExOptions
        v-model="filter.exoptions"
        :options="hotelResponse?.hotels_filter?.hotel?.ex_options"
        @update:model-value="filterHotels"
      />
    </div>
    <div class="mt-1">
      <p class="categ-name mb-2 transition-200">
        {{ t('54') }},
        <span class="">{{ hotelResponse?.price_filter?.currency || '$' }}</span>
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
          :min="
            hotelResponse.price_filter.by_night_price?.min > 0
              ? hotelResponse.price_filter.by_night_price?.min
              : 0
          "
          :max="hotelResponse.price_filter.by_night_price?.max"
          @change="filterHotels"
        />
      </div>
      <div class="flex items-center justify-between">
        <p class="text transition-200">
          {{
            formatNumber(
              hotelResponse.price_filter.by_night_price?.min?.toFixed(0),
            )
          }}
        </p>
        <p class="text transition-200">
          {{
            formatNumber(
              hotelResponse.price_filter.by_night_price?.max?.toFixed(0),
            )
          }}
        </p>
      </div>
    </div>
    <UICustomCollapse
      v-if="hotelResponse?.hotels_filter?.hotel?.category?.length"
      selected
      :title="$t('332')"
    >
      <div
        class="moreinfo flex flex-col max-h-[200px] overflow-x-auto d-scroll"
      >
        <FormCheckboxGroup
          v-model="filter.types"
          class="flex flex-col"
          :options="hotelResponse?.hotels_filter?.hotel?.category"
          label-key="name"
          value-key="name"
          @update:model-value="filterHotels"
        />
      </div>
    </UICustomCollapse>
    <UICustomCollapse
      v-if="hotelResponse?.hotels_filter?.hotel?.rating?.length"
      selected
      :title="$t('142')"
    >
      <div class="moreinfo flex flex-col">
        <HotelFilterCategory
          v-model="filter.category"
          class="flex flex-col"
          :options="hotelResponse?.hotels_filter?.hotel?.rating"
          @update:model-value="filterHotels"
        />
      </div>
    </UICustomCollapse>
    <UICustomCollapse
      v-if="hotelResponse.hotels_filter?.hotel?.boards_hotel?.length"
      selected
      :title="$t('246')"
    >
      <div
        class="moreinfo flex flex-col max-h-[200px] overflow-x-auto d-scroll"
      >
        <FormCheckboxGroup
          v-model="filter.board"
          class="flex flex-col"
          :options="hotelResponse.hotels_filter?.hotel?.boards_hotel"
          label-key="name"
          value-key="name"
          @update:model-value="filterHotels"
        />
      </div>
    </UICustomCollapse>
    <UICustomCollapse
      v-if="hotelResponse.hotels_filter?.hotel?.hotel_themes?.length"
      selected
      :title="$t('219')"
    >
      <div
        class="moreinfo flex flex-col max-h-[200px] overflow-x-auto d-scroll"
      >
        <FormCheckboxGroup
          v-model="filter.themes"
          class="flex flex-col"
          :options="hotelResponse.hotels_filter?.hotel?.hotel_themes"
          label-key="name"
          value-key="name"
          @update:model-value="filterHotels"
        />
      </div>
    </UICustomCollapse>
  </div>
</template>

<script setup lang="ts">
import type { IHotelResponse } from '@/types/hotel'
import { formatNumber } from '@/utils'

interface Props {
  hotelResponse: IHotelResponse
  loading: boolean
}
const emits = defineEmits<{
  (e: 'on-filter'): void
}>()

const route = useRoute()
const router = useRouter()
const store = useHotelStore()

const { t, locale } = useI18n()
const props = defineProps<Props>()

const sortHotels = [
  {
    label: t('289'),
    value: 'none',
  },
  {
    label: t('265'),
    value: 'popular',
  },
  {
    label: t('247'),
    value: 'rating',
  },
  {
    label: t('104'),
    value: 'price_asc',
  },
  {
    label: t('113'),
    value: 'price_desc',
  },
]
const searchData = reactive({
  adult: route.query?.adult || 1,
  child_age: route.query?.child_age
    ? String(route.query?.child_age).split(',')
    : ([] as string[]),
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
const filter = reactive({
  types: route.query?.type?.split(',') ?? [],
  category: route.query?.category?.split(',') ?? [],
  themes: route.query?.hotel_themes?.split(',') ?? [],
  board: route.query?.boards_hotel?.split(',') ?? [],
  dmc_list: route.query?.dmc_list?.split(',') ?? [],
  exoptions: route.query?.exoptions?.split(',')?.map((el) => Number(el)) ?? [],
  exregions:
    route.query?.exregions?.split(',')?.map((el) => el.replace(/_/, ', ')) ??
    [],
  nightPrice: [
    props.hotelResponse.price_filter.by_night_price.min || 0,
    props.hotelResponse.price_filter.by_night_price.max || 10000,
  ],
  hotelPrice: [
    route.query?.price_range_min
      ? Number(route.query?.price_range_min)
      : props.hotelResponse.price_filter.by_price.min || 0,
    route.query?.price_range_max
      ? Number(route.query?.price_range_max)
      : props.hotelResponse.price_filter.by_price.max || 1000,
  ],
  sort: route.query?.sort ?? 'price_asc',
  sub_loc_id: route.query?.sub_loc_id ?? null,
  instant_booking: route.query?.instant_booking === '1',
  only_available: route.query?.only_available === '1',
  discount: route.query?.discount === '1',
  friday: route.query?.friday === '1',
})
const regionChange = ref(false)
const regions = computed(() => {
  if (props.hotelResponse?.hotels_filter?.region?.sub_regions?.length) {
    return [
      ...props.hotelResponse.hotels_filter.region.sub_regions,
      {
        status: 'empty',
        name: t('446'),
        id: '',
      },
    ]
  } else {
    return [
      {
        status: 'empty',
        name: t('446'),
        id: '',
      },
    ]
  }
})
const queryFilter = computed(() => {
  return {
    category: filter.category?.length ? filter.category?.join(',') : undefined,
    type: filter.types?.length ? filter.types?.join(',') : undefined,
    hotel_themes: filter.themes?.length ? filter.themes?.join(',') : undefined,
    board: filter.board?.length ? filter.board?.join(',') : undefined,
    dmc_list: filter.dmc_list?.length ? filter.dmc_list?.join(',') : undefined,
    exoptions: filter.exoptions?.length
      ? filter.exoptions?.join(',')
      : undefined,
    exregions: filter.exregions?.length
      ? filter.exregions?.map((el) => el.replace(/, /g, '_'))
      : undefined,
    night_min: filter.nightPrice[0] ?? undefined,
    night_max: filter.nightPrice[1] ?? undefined,
    // price_range_min: filter.hotelPrice[0] ?? undefined,
    // price_range_max: filter.hotelPrice[1] ?? undefined,
    sort: filter.sort,
    page: 1,
    sub_loc_id: filter.sub_loc_id ?? undefined,
    instant_booking: filter.instant_booking ? 1 : 0,
    only_available: filter.only_available ? 1 : 0,
    discount: filter.discount ? 1 : 0,
    friday: filter.friday ? 1 : 0,
  }
})
const filterHotels = async () => {
  try {
    emits('on-filter')
    store.loading = true
    await store.getHotelOffers(searchData, {
      ...queryFilter.value,
      hotelNames: route.query?.hotelNames
        ? route.query?.hotelNames.split(',')
        : undefined,
    })
    updateQuery({
      ...queryFilter.value,
      exregions: queryFilter.value.exregions?.join(','),
    })
    // if (regionChange.value) {
    //   filter.nightPrice = [
    //     props.hotelResponse.price_filter.by_night_price.min,
    //     props.hotelResponse.price_filter.by_night_price.max,
    //   ]
    //   filter.hotelPrice = [
    //     props.hotelResponse.price_filter.by_price.min,
    //     props.hotelResponse.price_filter.by_price.max,
    //   ]
    //   regionChange.value = false
    // }
  } catch (err) {
    console.log(err)
  } finally {
    store.loading = false
  }
}

const onRegionChange = () => {
  filter.hotelPrice = []
  filter.nightPrice = []
  regionChange.value = true
  filterHotels()
}
watch(
  () => filter.sub_loc_id,
  () => {
    const price = {
      night_min: undefined,
      night_max: undefined,
      price_range_min: undefined,
      price_range_max: undefined,
      sub_loc_id: filter.sub_loc_id,
    }
    updateQuery(price)
  },
)
function updateQuery(query) {
  router.replace({ query: { ...route.query, ...query } })
}
onMounted(async () => {
  if (props.hotelResponse && !props.loading) {
    // filter.nightPrice = [
    //   route.query?.night_min ??
    //     props.hotelResponse.price_filter.by_night_price.min,
    //   route.query?.night_max ??
    //     props.hotelResponse.price_filter.by_night_price.max,
    // ]
    // filter.hotelPrice = [
    //   route.query?.price_range_min ||
    //     props.hotelResponse.price_filter.by_price.min,
    //   route.query?.price_range_max ||
    //     props.hotelResponse.price_filter.by_price.max,
    // ]
  }
  if (!props.hotelResponse?.hotels_filter?.region?.sub_regions?.length) {
    filter.sub_loc_id = null
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/style/scss/style.scss';

.filter-card {
  background: #fff;

  .wrap-categ {
    max-height: 210px;
    height: auto;
    overflow-y: auto;
  }
  .wrap-categ::-webkit-scrollbar-track {
    -webkit-box-shadow: #3392ff;
    background-color: #f5f5f5;
  }

  .wrap-categ::-webkit-scrollbar {
    width: 2px;
    height: 2px;
    background-color: #f5f5f5;
  }

  .wrap-categ::-webkit-scrollbar-thumb {
    background-color: #3392ff;
    border: 2px solid #3392ff;
  }
  .filter-title {
    @include common-text-style(17px, 700, normal);
  }
  .categ-name {
    @include common-text-style(16px, 600, normal);
  }
  .price {
    border-radius: 4px;
    background: #0073ff90;
    padding: 10px;
  }

  .checkbox {
    @include common-text-style(14px, 600, normal);
  }
  .el-collapse {
    border: 0;
  }
  .letter-spacing {
    letter-spacing: 0.001px;
  }
}
</style>
