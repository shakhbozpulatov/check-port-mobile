<template>
  <div>
    <LazyTourOffersCollapse
      v-if="!dashboardStore.loading"
      @on-change-ticket="emits('on-change-ticket')"
    />
    <div class="mt-6">
      <div
        v-if="tourHotels?.length"
        class="rounded-md bg-white py-2.5 px-2 shadow md:mb-3 mb-10 w-full gap-2 md:flex-nowrap flex-wrap transition-200 flex items-center"
      >
        <LazyUIHotelSearchByName
          v-if="allTourOffers?.hotels_filter?.hotel_name_list?.length"
          v-model="namesHotel"
          :list="allTourOffers?.hotels_filter?.hotel_name_list"
          class="grow"
          @on-search="searchHotelsByName"
        />
        <UButton
          class="rounded-[1rem] my-3 ms-auto"
          @click="filterDialog = true"
          ><i class="fa-sharp fa-light fa-filter-list"></i
        ></UButton>
      </div>
      <template v-if="store.filterLoader || dashboardStore.loading">
        <LazyUIHotelCardPreloader v-for="item in 10" :key="item" />
      </template>
      <template v-else>
        <LazyTourOffersCard
          v-for="(item, index) in tourHotels"
          :key="'hotel' + index"
          class="mb-6"
          :data="item"
          @on-calculate_late_checkin="
            (num) => emits('on-calculate_late_checkin', num)
          "
        />
      </template>
      <div v-if="tourHotels?.length">
        <div ref="targetDiv" class="flex justify-center py-2"></div>
      </div>
      <div
        v-if="
          allTourOffers &&
          !tourHotels?.length &&
          !store.filterLoader &&
          !dashboardStore.loading
        "
        class="bg-amber-300 rounded-lg text-white py-5 text-center"
        role="alert"
      >
        {{ allTourOffers?.empty_status === 'flight' ? $t('437') : $t('449') }}
      </div>
    </div>
    <MbscPopup
      :is-open="filterDialog"
      display="bottom"
      theme-variant="light"
      theme="material"
      :full-screen="true"
      css-class="small-popup"
      :scroll-lock="false"
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
          class="rounded-[1rem]"
          variant="ghost"
          @click="filterDialog = false"
        >
          <i class="fa-solid fa-xmark text-[16px]"></i>
        </UButton>
      </div>
      <hr class="mb-5" />
      <LazyTourOffersFilter
        v-if="filterData && !dashboardStore.loading"
        @on-set-page="emits('on-reset-page')"
      />
    </MbscPopup>
  </div>
</template>
<script setup lang="ts">
import { MbscPopup } from '@mobiscroll/datepicker-vue'
import { useIntersectionObserver } from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface Props {
  paginationLoading: boolean
}
defineProps<Props>()
const emits = defineEmits<{
  (e: 'on-paginate'): void
  (e: 'on-clear-filter'): void
  (e: 'on-reset-page'): void
  (e: 'on-search'): void
  (e: 'on-change-ticket'): void
  (e: 'on-calculate_late_checkin', val: number): void
}>()

const route = useRoute()
const router = useRouter()
const store = useTourStore()
const dashboardStore = useDashboardStore()

const targetDiv = ref(null)
const filterDialog = ref(false)
// Computed values
const allTourOffers = computed(() => store.allTourOffers)
const filterData = computed(() => store.filterData)
const tourHotels = computed(() => store.tourHotels)

useIntersectionObserver(targetDiv, ([{ isIntersecting }]) => {
  if (
    isIntersecting &&
    allTourOffers.value?.hotels_count > tourHotels.value?.length
  )
    emits('on-paginate')
})

interface ListItem {
  code: string
  name: string
}

const options = ref<ListItem[]>([])
const namesHotel = ref<string[]>([])

const remoteMethod = (query: string) => {
  if (query) {
    if (!allTourOffers.value) return
    options.value = allTourOffers.value?.hotels_filter?.hotel_name_list.filter(
      (item) => {
        return item.name.toLowerCase().includes(query.toLowerCase())
      },
    )
    return options.value
  } else {
    return []
  }
}

const searchHotelsByName = () => {
  store.filterLoader = true
  const name = {
    hotelNames:
      namesHotel.value.length > 0
        ? namesHotel.value.map((el) => el.code).join(',')
        : undefined,
  }
  updateQuery(name)
  setTimeout(() => {
    emits('on-search')
  }, 200)
}
function updateQuery(query) {
  router.replace({ query: { ...route.query, ...query } })
}
const onClearFilter = () => {
  if (!namesHotel.value?.length) {
    updateQuery({ hotelNames: undefined })
    setTimeout(() => {
      emits('on-search')
    }, 200)
  }
}
const removeHotelName = (index: number) => {
  namesHotel.value.splice(index, 1)
  onClearFilter()
}
const onClearFilterData = () => {
  namesHotel.value = []
  emits('on-clear-filter')
}

watch(
  () => allTourOffers.value,
  () => {
    const codes = route.query?.hotelNames
      ? String(route.query?.hotelNames)?.split(',')
      : []
    if (codes?.length && allTourOffers.value) {
      namesHotel.value =
        allTourOffers.value?.hotels_filter?.hotel_name_list?.filter((el) =>
          codes?.includes(el?.code),
        ) || []
    }
  },
  {
    deep: true,
    once: true,
  },
)
watch(
  () => route.query?.hotelNames,
  (val) => {
    if (!val) {
      namesHotel.value = []
    }
  },
  {
    deep: true,
    once: true,
  },
)
</script>
