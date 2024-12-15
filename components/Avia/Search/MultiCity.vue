<template>
  <div class="mt-6">
    <div
      v-for="(elem, index) in store.searchData.directions"
      :key="index"
      class="search-inputs flex-wrap mb-1 md:mb-0 flex relative w-full"
    >
      <div
        v-if="form[index]"
        class="input-item mb-1 md:mb-0 gap-2 md:gap-0 grid grid-cols-1 md:grid-cols-3 w-full"
      >
        <div class="relative h-full">
          <UInputMenu
            v-model="store.searchData.directions[index].departure_code"
            v-model:query="form[index].departure"
            :popper="{ arrow: false }"
            :placeholder="t('400')"
            value-attribute="code"
            option-attribute="name"
            :ui="{
              base: '!shadow-0 focus:!ring-0 focus:border',
            }"
            :search="(e) => remoteMethod(e, index)"
            :disabled="dashboardStore.loading"
            :debounce="500"
            input-class="!h-12"
            :options="form[index]?.airportOptions"
            class="!w-full transition-200 focus:!shadow-0 focus:!outline-0 focus:ring-0 search-select"
            @change="(e) => handleSelect(e, index)"
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
                    <span
                      style="line-height: 20px"
                      class="text-[#444] italic"
                      >{{ item.option.country_name }}</span
                    >
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
            class="fa-regular fa-plane-departure absolute right-6 top-[50%] translate-y-[-50%] text-[#0073FF]"
          ></i>
        </div>
        <div class="relative h-full">
          <UInputMenu
            v-model="store.searchData.directions[index].arrival_code"
            v-model:query="form[index].arrival"
            :popper="{ arrow: false }"
            :placeholder="t('400')"
            value-attribute="code"
            option-attribute="name"
            :ui="{
              base: '!shadow-0 focus:!ring-0 focus:border',
            }"
            :search="(e) => remoteMethodSecond(e, index)"
            :disabled="dashboardStore.loading"
            :debounce="500"
            input-class="!h-12"
            :options="form[index]?.airportOptionsSecond"
            class="!w-full transition-200 focus:!shadow-0 focus:!outline-0 focus:ring-0 search-select"
            @change="(e) => handleSelectSecond(e, index)"
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
                    <span
                      style="line-height: 20px"
                      class="text-[#444] italic"
                      >{{ item.option.country_name }}</span
                    >
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
            class="fa-regular fa-plane-arrival absolute top-[50%] right-5 translate-y-[-50%] text-[#0073FF]"
          ></i>
        </div>
        <div v-if="form[index]" class="input-item">
          <MbscDatepicker
            v-model="elem.date"
            :input-props="{
              class: 'w-full h-12 rounded-md px-2',
              placeholder: $t('75'),
            }"
            input-component="input"
            calendar-type="month"
            date-format="DD.MM.YYYY"
            :show-outer-days="false"
            select="date"
            :locale="calendarLocales[locale]"
            :theme-variant="mode.value"
            :min="new Date()"
            :first-day="1"
            theme="ios"
          />
        </div>
        <div
          v-if="store.searchData.directions.length > 1"
          class="cursor-pointer absolute top-[-4px] right-[-4px]"
          @click="subtractRouteBtn(index)"
        >
          <i class="fa-sharp fa-solid fa-circle-xmark text-red-600"></i>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 md:gap-0 gap-3 md:grid-cols-3 mb-0">
      <UButton
        class="rounded-[1rem] w-full h-12 justify-center"
        color="primary"
        @click="addRouteBtn"
      >
        <i class="fa-solid fa-circle-plus mr-2"></i>
        {{ $t('428') }}
      </UButton>
      <div class="input-item !mb-0 flex items-start group">
        <UIDropdown class="passanger-dd w-full">
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
      <div class="md:block">
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
  </div>
</template>

<script setup lang="ts">
import '@mobiscroll/datepicker-vue/dist/css/mobiscroll.min.css'

import { MbscDatepicker } from '@mobiscroll/datepicker-vue'
import { calendarLocales } from 'assets/data'
import dayjs from 'dayjs'
import { computed } from 'vue'

const route = useRoute()
const router = useRouter()
const $emit = defineEmits(['on-search'])
const { t, locale } = useI18n()
const dashboardStore = useDashboardStore()
const store = useAviaStore()
const mode = useColorMode()

const form = ref([
  {
    departure: '',
    arrival: '',
    dates: null,
    airportOptions: [],
    airportOptionsSecond: [],
    loading: false,
    loadingSecond: false,
  },
])
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
const totalPassengers = computed(
  () =>
    store.searchData.adult_qnt +
    store.searchData.child_qnt +
    store.searchData.infant_qnt,
)
const searchTickets = async () => {
  const query = {
    dep_types: store.searchData.directions.map((el) => el.dep_type)?.join(','),
    arr_types: store.searchData.directions.map((el) => el.arr_type)?.join(','),
    dep_code: store.searchData.directions
      .map((el) => el.departure_code)
      ?.join(','),
    arr_code: store.searchData.directions
      .map((el) => el.arrival_code)
      ?.join(','),
    dates: store.searchData.directions
      .map((el) => dayjs(el.date).format('YYYY-MM-DD'))
      ?.join(','),
    deps: form.value.map((el) => el.departure.split(',')?.[0])?.join(','),
    arrs: form.value.map((el) => el.arrival.split(',')?.[0])?.join(','),
    adult: store.searchData.adult_qnt || undefined,
    child: store.searchData.child_qnt || undefined,
    inf: store.searchData.infant_qnt || undefined,
    searched: true,
  }
  await router.replace({
    query: {
      route: 'multi-city',
      ...query,
    },
  })
  dashboardStore.loading = true
  $emit('on-search')
}
const handleSelect = async (code: string, index) => {
  const item = form.value[index]?.airportOptions?.find(
    (el) => el?.code === code,
  )
  store.searchData.directions[index].departure_code = item?.code
  store.searchData.directions[index].dep_type = item?.type
  if (item.type !== 'city') {
    form.value[index].departure = `${item?.name}, ${item?.city_name}`
  } else {
    form.value[index].departure = `${item?.name}, ${item?.country_name}`
  }
  if (
    store.searchData.directions[index].departure_code &&
    store.searchData.directions[index].arrival_code
  ) {
    form.value[index].dates = await dashboardStore.getTourCalendarData(
      store.searchData.directions[index].departure_code,
      store.searchData.directions[index].arrival_code,
      1,
    )
  }
}
const handleSelectSecond = async (code: string, index) => {
  const item = form.value[index]?.airportOptionsSecond?.find(
    (el) => el?.code === code,
  )
  store.searchData.directions[index].arrival_code = item?.code
  store.searchData.directions[index].arr_type = item?.type
  if (store.searchData.directions[index + 1]) {
    store.searchData.directions[index + 1].dep_type =
      store.searchData.directions[index].arr_type
    store.searchData.directions[index + 1].departure_code =
      store.searchData.directions[index].arrival_code
    form.value[index + 1].departure = form.value[index].arrival
  }
  if (item.type !== 'city') {
    form.value[index].arrival = `${item?.name}, ${item?.city_name}`
  } else {
    form.value[index].arrival = `${item?.name}, ${item?.country_name}`
  }
  if (
    store.searchData.directions[index].departure_code &&
    store.searchData.directions[index].arrival_code
  ) {
    form.value[index].dates = await dashboardStore.getTourCalendarData(
      store.searchData.directions[index].departure_code,
      store.searchData.directions[index].arrival_code,
      1,
    )
  }
  if (store.searchData.directions[index + 1]) {
    store.searchData.directions[index + 1].dep_type =
      store.searchData.directions[index].arr_type
    store.searchData.directions[index + 1].departure_code =
      store.searchData.directions[index].arrival_code
  }
}
const addRouteBtn = function () {
  const index = store.searchData.directions?.length - 1
  if (store.searchData.directions?.length < 4) {
    store.searchData.directions.push({
      dep_type: store.searchData.directions[index].arr_type,
      arr_type: null,
      departure_code: store.searchData.directions[index].arrival_code,
      arrival_code: null,
      date: null,
    })
    form.value.push({
      departure: form.value[index].arrival,
      arrival: '',
      dates: null,
      airportOptions: [],
      airportOptionsSecond: [],
      loading: false,
      loadingSecond: false,
    })
  }
}
const subtractRouteBtn = function (index) {
  store.searchData.directions.splice(index, 1)
  form.value.splice(index, 1)
}
const remoteMethod = async (query, index) => {
  if (form.value[index].departure?.length >= 2) {
    form.value[index].loading = true
    await dashboardStore.getAirports(form.value[index].departure)
    form.value[index].airportOptions = dashboardStore.airports
    form.value[index].loading = false
    return form.value[index].airportOptions
  } else {
    return []
  }
}
const remoteMethodSecond = async (query, index) => {
  if (form.value[index].arrival?.length >= 2) {
    form.value[index].loadingSecond = true
    await dashboardStore.getAirports(form.value[index].arrival)
    form.value[index].airportOptionsSecond = dashboardStore.airports
    form.value[index].loadingSecond = false
    return form.value[index]?.airportOptionsSecond
  } else {
    return []
  }
}
const disableDate = function (date) {
  return date < new Date(Date.now() - 86400000)
}
// const isCharter = (calendarDates, { dayjs }) => {
//   return calendarDates?.on?.includes(dayjs.format('YYYY-MM-DD'))
// }
const initiator = () => {
  if (route.query?.searched) {
    const dep_types = route.query?.dep_types?.split(',') || []
    const arr_types = route.query?.arr_types?.split(',') || []
    const dep_code = route.query?.dep_code?.split(',') || []
    const arr_code = route.query?.arr_code?.split(',') || []
    const dates = route.query?.dates?.split(',') || []
    const deps = route.query?.deps?.split(',') || []
    const arrs = route.query?.arrs?.split(',') || []
    const directions = []
    const forms = []
    dep_types?.forEach((el, index) => {
      directions.push({
        dep_type: dep_types[index],
        arr_type: arr_types[index],
        departure_code: dep_code[index],
        arrival_code: arr_code[index],
        date: dates[index],
      })
      forms.push({
        arrival: arrs[index],
        departure: deps[index],
      })
    })
    store.searchData.directions = directions
    form.value = forms
    dashboardStore.loading = true
    store.routeChange = false
    $emit('on-search')
    store.searchData.directions.forEach(async (elem, index) => {
      if (
        store.searchData.directions[index].departure_code &&
        store.searchData.directions[index].arrival_code
      ) {
        form.value[index].dates = await dashboardStore.getTourCalendarData(
          store.searchData.directions[index].departure_code,
          store.searchData.directions[index].arrival_code,
          1,
        )
      }
    })
  }
}
onMounted(() => {
  if (store.searchData.directions?.length > 1) {
    store.searchData.directions.length = 1
  }
  initiator()
})
onUnmounted(() => {
  store.$reset()
  dashboardStore.$reset()
  store.routeChange = true
})
</script>

<style lang="scss" scoped>
.pas-menu-btn,
.search-btn {
  padding: 24px 10px;
  font-size: 14px;
  font-weight: 400;
  span {
    text-align: center;
  }
}
.over-height {
  margin-bottom: 18px;
}
.passanger-menu {
  .content-dropdown {
    max-width: 240px;
    width: 100%;
    .person-type {
      .title {
        font-size: 20px;
      }
      .subtitle {
        font-size: 12px;
        color: #aaa;
      }
    }
  }
}
.add-route {
  font-size: 14px;
  font-weight: 600;
  color: #3392ff;
  padding: 24px 0;
}

@media only screen and (max-width: 576px) {
  .extra-info {
    > div {
      margin-bottom: 10px;
    }
  }
  .search-input {
    flex-direction: column;
    margin-bottom: 12px !important;
    .over-height {
      margin-bottom: 14px;
    }
    .input-item {
      width: 100%;
      display: block !important;
      .change-btn {
        z-index: 12;
        top: 155%;
        img {
          width: 35px;
          height: 35px;
        }
      }
    }
    .input-item:last-child {
      > div {
        margin-bottom: 12px;
      }
      .pas-menu-btn {
        font-size: 14px;
      }
    }
  }
}
</style>
