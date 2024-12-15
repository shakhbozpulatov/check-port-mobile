<template>
  <div class="search-inputs flex md:flex-row flex-col mt-6">
    <div class="md:w-[40%] w-full flex relative flex-col md:flex-row">
      <div class="relative mb-3 md:w-[50%] w-full">
        <UInputMenu
          v-model="store.searchData.directions[0].departure_code"
          v-model:query="form.departure"
          :popper="{ arrow: false }"
          :placeholder="t('400')"
          value-attribute="code"
          option-attribute="name"
          :ui="{
            base: '!shadow-0 focus:!ring-0 focus:border',
          }"
          :search="remoteMethod"
          :debounce="500"
          input-class="!h-12"
          :options="airportOptions"
          class="!w-full transition-200 focus:!shadow-0 focus:!outline-0 focus:ring-0 search-select"
          :disabled="dashboardStore.loading"
          @change="handleSelect"
        >
          <template #option-empty="{ query }">
            <q>{{ query }}</q> {{ $t('768') }}
          </template>
          <template #empty> {{ $t('768') }} </template>
          <template #option="item">
            <div class="flex items-center justify-between w-full">
              <div class="flex items-center gap-2 py-1" style="float: left">
                <i
                  v-if="item.option.type !== 'city'"
                  class="fa-regular fa-plane-departure text-[#0073FF]"
                ></i>
                <div v-if="item.option.type === 'city'" class="">
                  <strong style="line-height: 24px">{{
                    item.option.name
                  }}</strong
                  >,
                  <span style="line-height: 20px" class="text-[#444] italic">{{
                    item.option.country_name
                  }}</span>
                </div>
                <div v-if="item.option.type === 'airport'">
                  <span style="line-height: 20px; color: #444">{{
                    item.option.name
                  }}</span>
                </div>
              </div>

              <span>{{ item.option.code }}</span>
            </div>
          </template>
        </UInputMenu>
        <i
          class="fa-regular fa-plane-departure absolute right-6 md:top-[50%] top-[50%] translate-y-[-50%] text-[#0073FF]"
        ></i>
        <div
          class="change-btn absolute rotate-90 right-[5%] top-[90%] md:right-[5%] md:top-[70%] md:translate-x-[93%] z-10 md:translate-y-[-100%] cursor-pointer"
          @click="changeDirections"
        >
          <img src="/images/icons/change_reverse.svg" alt="" />
        </div>
      </div>
      <div class="relative md:w-[50%] w-full">
        <UInputMenu
          v-model="store.searchData.directions[0].arrival_code"
          v-model:query="form.arrival"
          :placeholder="$t('430')"
          value-attribute="code"
          :popper="{ arrow: false }"
          input-class="!h-12"
          option-attribute="name"
          :ui="{
            base: '!shadow-0 focus:!ring-0 focus:border',
          }"
          :search="remoteMethodSecond"
          :debounce="500"
          :options="airportOptionsSecond"
          class="!w-full transition-200 search-select"
          :disabled="dashboardStore.loading"
          @change="handleSelectSecond"
        >
          <template #option-empty="{ query }">
            <q>{{ query }}</q> {{ $t('768') }}
          </template>
          <template #empty> {{ $t('768') }} </template>
          <template #option="item">
            <div class="flex items-center justify-between w-full">
              <div class="flex items-center gap-2 py-1" style="float: left">
                <i
                  v-if="item.option.type !== 'city'"
                  class="fa-regular fa-plane-departure text-[#0073FF]"
                ></i>
                <div v-if="item.option.type === 'city'" class="">
                  <strong class="" style="line-height: 24px">{{
                    item.option.name
                  }}</strong
                  >,
                  <span style="line-height: 20px" class="text-[#444] italic">{{
                    item.option.country_name
                  }}</span>
                </div>
                <div v-if="item.option.type === 'airport'">
                  <span class="text-[#444]" style="line-height: 20px">{{
                    item.option.name
                  }}</span>
                </div>
              </div>

              <span>{{ item.option.code }}</span>
            </div>
          </template>
        </UInputMenu>
        <i
          class="fa-regular fa-plane-arrival absolute md:top-[40%] top-[50%] right-5 translate-y-[-50%] text-[#0073FF]"
        ></i>
      </div>
    </div>
    <div class="over-height mb-3 mt-3 md:m-0 h-[50px] md:w-[25%]">
      <MbscDatepicker
        v-model="form.date"
        :input-props="{
          class: 'w-full h-12 rounded-md px-6 placeholder:text-sm',
          placeholder: $t('94') + ' - ' + $t('95'),
        }"
        input-component="input"
        calendar-type="month"
        select="range"
        :locale="calendarLocales[locale]"
        date-format="DD.MM.YYYY"
        calendar-scroll="vertical"
        :show-outer-days="false"
        :min="new Date()"
        :first-day="1"
        :theme-variant="mode.value"
        theme="ios"
      />
    </div>
    <div class="over-height mb-3 h-[50px] md:w-[20%] group">
      <UIDropdown class="passanger-dd">
        <template #header>
          <UButton
            variant="solid"
            color="white"
            class="rounded-[1rem] h-12 w-full justify-center"
          >
            <i
              class="fa-light fa-user text-blue mr-1 transition duration-150"
            ></i>
            <span class="font-semibold mr-1">{{
              store.searchData.adult_qnt +
              store.searchData.child_qnt +
              store.searchData.infant_qnt
            }}</span>
            <span class="lg:inline hidden">{{ t('240') }}</span
            >,
            {{
              options.find((el) => store.searchData.class === el.value).label
            }}
          </UButton>
        </template>
        <template #content>
          <UIPassengerCountError v-if="totalPassengers >= 9" :count="9" />
          <div class="content-dropdown md:px-3 md:py-2 md:w-[272px]">
            <div class="flex items-center justify-between mb-2">
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
                  v-model="store.searchData.adult_qnt"
                  :min="1"
                  :max="8"
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
                  v-model="store.searchData.child_qnt"
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
                  v-model="store.searchData.infant_qnt"
                  :min="0"
                  :max="8"
                  :disabled="totalPassengers >= 9"
                />
              </div>
            </div>
            <div class="mt-3">
              <URadioGroup
                v-model="store.searchData.class"
                class="direction"
                :legend="$t('143')"
                :options="options"
                option-attribute="label"
              />
            </div>
          </div>
        </template>
      </UIDropdown>
    </div>
    <div class="md:w-[15%] md:block">
      <UButton
        color="primary"
        :loading="dashboardStore.loading"
        class="rounded-[1rem] w-full h-12 justify-center"
        @click="searchTickets"
      >
        {{ $t('253') }}
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import '@mobiscroll/datepicker-vue/dist/css/mobiscroll.min.css'

import { MbscDatepicker } from '@mobiscroll/datepicker-vue'
import { calendarLocales } from 'assets/data'
import dayjs from 'dayjs'
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
const $emit = defineEmits<{
  (e: 'on-search'): void
}>()
const { t, locale } = useI18n()
const dashboardStore = useDashboardStore()
const mode = useColorMode()
const store = useAviaStore()
const route = useRoute()
const router = useRouter()
const input = ref(null)
const { width } = useWindowSize()
const { myToast } = useCustomToast()

const form = reactive({
  departure: '',
  arrival: '',
  date: [],
})
const airportOptions = ref([])
const airportOptionsSecond = ref([])
const loading = ref(false)
const loadingSecond = ref(false)
const totalPassengers = computed(
  () =>
    store.searchData.adult_qnt +
    store.searchData.child_qnt +
    store.searchData.infant_qnt,
)
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

const searchQuery = computed(() => {
  return {
    dep: form.departure.split(',')?.[0],
    dep_type: store.searchData.directions[0].dep_type,
    dep_code: store.searchData.directions[0].departure_code,
    arr: form.arrival.split(',')?.[0],
    arr_type: store.searchData.directions[0].arr_type,
    arr_code: store.searchData.directions[0].arrival_code,
    dep_date: store.searchData.directions[0].date,
    back_date: store.searchData.directions[1].date,
    adult: store.searchData.adult_qnt,
    child: store.searchData.child_qnt,
    inf: store.searchData.infant_qnt,
    class: store.searchData.class,
    searched: true,
  }
})
const searchTickets = async () => {
  store.searchData.directions[0].date = dayjs(form.date[0]).format('YYYY-MM-DD')
  store.searchData.directions[1].date = dayjs(form.date[1]).format('YYYY-MM-DD')
  store.searchData.directions[1].dep_type =
    store.searchData.directions[0].arr_type
  store.searchData.directions[1].arr_type =
    store.searchData.directions[0].dep_type
  store.searchData.directions[1].arrival_code =
    store.searchData.directions[0].departure_code
  store.searchData.directions[1].departure_code =
    store.searchData.directions[0].arrival_code
  if (
    store.searchData.directions[0].departure_code &&
    store.searchData.directions[0].arrival_code &&
    store.searchData.directions[0].date &&
    store.searchData.directions[1].date
  ) {
    dashboardStore.loading = true
    await router.replace({
      query: {
        route: 'round-trip',
        ...searchQuery.value,
      },
    })
    store.routeChange = false
    $emit('on-search')
  } else {
    myToast('error', t('263'))
  }
}
const handleSelect = (code: string) => {
  const item = airportOptions.value?.find((el) => el.code === code)
  store.searchData.directions[0].departure_code = item?.code
  store.searchData.directions[0].dep_type = item?.type
  if (item.type !== 'city') {
    form.departure = `${item?.name}, ${item?.city_name}`
  } else {
    form.departure = `${item?.name}, ${item?.country_name}`
  }
  getCalendarDates()
}
const handleSelectSecond = (code: string) => {
  const item = airportOptionsSecond.value?.find((el) => el.code === code)
  store.searchData.directions[0].arrival_code = item?.code
  store.searchData.directions[0].arr_type = item?.type
  if (item.type !== 'city') {
    form.arrival = `${item?.name}, ${item?.city_name}`
  } else {
    form.arrival = `${item?.name}, ${item?.country_name}`
  }
  getCalendarDates()
}

const changeDirections = () => {
  const departure_code = store.searchData.directions[0].departure_code
  const query = form.departure
  store.searchData.directions[0].departure_code =
    store.searchData.directions[0].arrival_code
  store.searchData.directions[0].arrival_code = departure_code
  form.departure = form.arrival
  form.arrival = query
  getCalendarDates()
}

const remoteMethod = async (query: string) => {
  if (form.departure?.length >= 2) {
    loading.value = true
    await dashboardStore.getAirports(query)
    airportOptions.value = dashboardStore.airports
    loading.value = false
    return airportOptions.value
  } else {
    return []
  }
}
const remoteMethodSecond = async (query: string) => {
  if (form.arrival?.length >= 2) {
    loading.value = true
    await dashboardStore.getAirports(query)
    airportOptionsSecond.value = dashboardStore.airports
    loading.value = false
    return airportOptionsSecond.value
  } else {
    return []
  }
}
function getCalendarDates() {
  if (
    store.searchData.directions[0].arrival_code &&
    store.searchData.directions[0].departure_code
  ) {
    dashboardStore.getTourCalendarData(
      store.searchData.directions[0].departure_code,
      store.searchData.directions[0].arrival_code,
      1,
    )
  }
}
const disableDate = function (date) {
  return date < new Date(Date.now() - 86400000)
}

const initiator = async () => {
  form.departure = route.query?.dep ?? ''
  form.arrival = route.query.arr ?? ''
  form.date = [route.query?.dep_date ?? '', route.query?.back_date ?? '']
  store.searchData.directions[0].dep_type = route.query?.dep_type ?? null
  store.searchData.directions[0].departure_code = route.query?.dep_code ?? null
  store.searchData.directions[0].arr_type = route.query?.arr_type ?? null
  store.searchData.directions[0].arrival_code = route.query?.arr_code ?? null
  store.searchData.directions[0].date = route.query?.dep_date ?? ''
  store.searchData.adult_qnt = route.query?.adult
    ? Number(route.query?.adult)
    : 1
  store.searchData.child_qnt = route.query?.child
    ? Number(route.query?.child)
    : 0
  store.searchData.infant_qnt = route.query?.inf ? Number(route.query?.inf) : 0
  store.searchData.class = route.query?.class ?? 'E'
  if (route.query.searched) {
    await searchTickets()
  }
}
onMounted(() => {
  if (store.searchData.directions?.length < 2) {
    store.searchData.directions.push({
      dep_type: '',
      arr_type: '',
      departure_code: '',
      arrival_code: '',
      date: '',
    })
  }
  initiator()
})
onUnmounted(() => {
  store.$reset()
  store.searchData.directions = [
    {
      dep_type: '',
      arr_type: '',
      departure_code: '',
      arrival_code: '',
      date: '',
    },
  ]
  dashboardStore.$reset()
  store.routeChange = true
})
onMounted(() => {
  const calendarInput = document.querySelectorAll(
    '.el-date-editor .el-range-input',
  )
  calendarInput.forEach((el) => {
    el.setAttribute('readonly', 'true')
  })
})
watch(
  [
    () => store.searchData.directions[0].departure_code,
    () => store.searchData.directions[0].arrival_code,
  ],
  () => {
    form.date = []
    store.searchData.directions[0].date = ''
    store.searchData.directions[1].date = ''
  },
)
</script>

<style lang="scss" scoped>
@media only screen and (max-width: 576px) {
  .search-inputs {
    flex-direction: column;
    .input-item {
      width: 100%;
      display: block !important;
      .input-wrap {
        width: 100% !important;
      }
      .input-wrap {
        margin-bottom: 14px;
        > div {
          width: 100%;
        }
      }
      .change-btn {
        top: 44%;
        img {
          width: 35px;
          height: 35px;
        }
      }
    }
    .input-item:last-child {
      margin-top: 30px;
      > div {
        margin-bottom: 12px;
      }
    }
  }
}
</style>
